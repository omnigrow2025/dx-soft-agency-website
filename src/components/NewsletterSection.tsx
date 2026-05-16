import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const candidates = ["/api/subscribers", "/api/newsletter", "/api/subscribe"];
    let ok = false;
    let lastErr: unknown = null;
    for (const path of candidates) {
      try {
        await apiFetch(path, { method: "POST", auth: false, body: JSON.stringify({ email }) });
        ok = true;
        break;
      } catch (err) {
        lastErr = err;
        if ((err as { status?: number }).status && (err as { status?: number }).status !== 404) break;
      }
    }
    setLoading(false);
    if (ok) {
      toast.success("Շնորհակալություն բաժանորդագրվելու համար");
      setEmail("");
    } else {
      toast.error((lastErr as Error)?.message || "Չհաջողվեց բաժանորդագրվել");
    }
  };

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bento-card bg-gradient-to-br from-secondary to-card p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Newsletter</p>
            <h3 className="font-serif-display text-3xl md:text-4xl text-foreground leading-tight">
              Ստացեք <em className="text-accent">նորություններ</em> և առաջարկներ ուղիղ ձեր փոստին։
            </h3>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              type="email"
              required
              placeholder="Էլ. փոստ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full bg-background h-12 md:w-72"
            />
            <Button type="submit" disabled={loading} className="rounded-full h-12 px-6 whitespace-nowrap">
              {loading ? "..." : "Բաժանորդագրվել"}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
