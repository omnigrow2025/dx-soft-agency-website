import { useState } from "react";
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
        await apiFetch(path, {
          method: "POST",
          auth: false,
          body: JSON.stringify(form),
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
      toast.success("Շնորհակալություն, մենք կկապվենք Ձեզ հետ");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error((lastErr as Error)?.message || "Չհաջողվեց ուղարկել հաղորդագրությունը");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Կապ <span className="text-accent-lime">մեզ հետ</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Թողեք Ձեր տվյալները և մենք կկապվենք Ձեզ հետ
          </p>
        </div>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 bg-card border rounded-2xl p-6 md:p-8">
          <Input
            placeholder="Անուն"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Էլ. փոստ"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Հեռախոս"
            className="sm:col-span-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Textarea
            placeholder="Հաղորդագրություն"
            required
            rows={4}
            className="sm:col-span-2"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Button type="submit" disabled={loading} className="sm:col-span-2 rounded-full">
            {loading ? "Ուղարկվում է..." : "Ուղարկել"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
