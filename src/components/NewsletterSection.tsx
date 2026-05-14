import { useState } from "react";
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
    // Try a couple of likely subscribe paths.
    const candidates = ["/api/subscribers", "/api/newsletter", "/api/subscribe"];
    let ok = false;
    let lastErr: unknown = null;
    for (const path of candidates) {
      try {
        await apiFetch(path, {
          method: "POST",
          auth: false,
          body: JSON.stringify({ email }),
        });
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
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submit}
          className="bg-secondary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2">
              Ստացեք նորություններ և առաջարկներ
            </h3>
            <p className="text-sm text-muted-foreground">
              Մուտքագրեք Ձեր <span className="text-primary font-semibold">էլ. փոստը</span>
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              type="email"
              required
              placeholder="Էլ. փոստ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full bg-background max-w-xs"
            />
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            >
              {loading ? "..." : "Բաժանորդագրվել"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
