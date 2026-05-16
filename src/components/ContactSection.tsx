import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const candidates = ["/api/support-requests", "/api/support", "/api/contact"];
    let ok = false;
    let lastErr: unknown = null;
    for (const path of candidates) {
      try {
        await apiFetch(path, { method: "POST", auth: false, body: JSON.stringify(form) });
        ok = true;
        break;
      } catch (err) {
        lastErr = err;
        if ((err as { status?: number }).status && (err as { status?: number }).status !== 404) break;
      }
    }
    setLoading(false);
    if (ok) {
      toast.success("Շնորհակալություն, մենք կկապվենք Ձեզ հետ");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error((lastErr as Error)?.message || "Չհաջողվեց ուղարկել հաղորդագրությունը");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bento-card p-8 md:p-10 bg-primary text-primary-foreground flex flex-col justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] opacity-70 mb-4">Կապ</p>
              <h2 className="font-serif-display text-4xl md:text-5xl leading-tight">
                Կապ <em>մեզ հետ</em>
              </h2>
              <p className="opacity-75 mt-5 leading-relaxed">
                Թողեք Ձեր տվյալները և մենք կկապվենք Ձեզ հետ կարճ ժամկետում։
              </p>
            </div>
            <div className="space-y-3 mt-10 text-sm">
              <a href="mailto:support@omnidx.academy" className="flex items-center gap-3 opacity-85 hover:opacity-100">
                <Mail className="h-4 w-4" /> support@omnidx.academy
              </a>
              <a href="tel:+37494963903" className="flex items-center gap-3 opacity-85 hover:opacity-100">
                <Phone className="h-4 w-4" /> (094) 96 39 03
              </a>
              <p className="flex items-start gap-3 opacity-85">
                <MapPin className="h-4 w-4 mt-0.5" /> Nova Plaza, Sayat Nova 19/1, Yerevan
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bento-card p-8 md:p-10 grid sm:grid-cols-2 gap-4"
          >
            <Input placeholder="Անուն" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input type="email" placeholder="Էլ. փոստ" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Հեռախոս" className="sm:col-span-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Textarea placeholder="Հաղորդագրություն" required rows={5} className="sm:col-span-2" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" disabled={loading} className="sm:col-span-2 rounded-full h-12">
              {loading ? "Ուղարկվում է..." : "Ուղարկել"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
