import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

type Test = { id: string; name: string; duration_minutes: number; is_active: boolean };
type Question = { id: string; question: string; options: string[]; correct_option: number };

const startSchema = z.object({
  first_name: z.string().trim().min(1, "Required").max(80),
  last_name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
});

const TakeTest = () => {
  const { id } = useParams();
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "" });
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data: t } = await supabase.from("tests").select("*").eq("id", id).maybeSingle();
      setTest(t as Test);
      const { data: q } = await supabase
        .from("test_questions")
        .select("*")
        .eq("test_id", id)
        .order("sort_order");
      setQuestions(
        ((q as any[]) || []).map((x) => ({
          ...x,
          options: Array.isArray(x.options) ? x.options : [],
        }))
      );
    })();
  }, [id]);

  useEffect(() => {
    if (!started || result) return;
    const i = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(i);
          handleSubmit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const start = () => {
    const r = startSchema.safeParse(form);
    if (!r.success) return toast({ title: r.error.errors[0].message, variant: "destructive" });
    if (!test) return;
    setSecondsLeft(test.duration_minutes * 60);
    setStarted(true);
  };

  const handleSubmit = async () => {
    if (!test || submitting || result) return;
    setSubmitting(true);
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) score++;
    });
    const total = questions.length;
    const { error } = await supabase.from("test_attempts").insert({
      test_id: test.id,
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      score,
      total,
      answers: questions.map((q) => ({ question_id: q.id, selected: answers[q.id] ?? null })),
      completed_at: new Date().toISOString(),
    });
    setSubmitting(false);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setResult({ score, total });
  };

  const mm = useMemo(() => String(Math.floor(secondsLeft / 60)).padStart(2, "0"), [secondsLeft]);
  const ss = useMemo(() => String(secondsLeft % 60).padStart(2, "0"), [secondsLeft]);

  if (!test) return <div className="p-8">Loading...</div>;

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Test complete</h1>
          <p className="text-4xl font-bold">
            {result.score} / {result.total}
          </p>
          <p className="text-muted-foreground">Thank you, {form.first_name}!</p>
          <Button asChild>
            <Link to="/">Back home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 max-w-md w-full space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{test.name}</h1>
            <p className="text-sm text-muted-foreground">
              {questions.length} questions · {test.duration_minutes} minutes
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <Label>First name</Label>
              <Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
            </div>
            <div>
              <Label>Last name</Label>
              <Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <Button className="w-full" onClick={start} disabled={questions.length === 0}>
            Start test
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between sticky top-0 bg-background py-3 border-b z-10">
        <h1 className="text-xl font-bold">{test.name}</h1>
        <div className="font-mono text-lg">
          {mm}:{ss}
        </div>
      </div>
      {questions.map((q, i) => (
        <Card key={q.id} className="p-5 space-y-3">
          <p className="font-medium">
            {i + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => (
              <label key={oi} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === oi}
                  onChange={() => setAnswers({ ...answers, [q.id]: oi })}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </Card>
      ))}
      <Button onClick={handleSubmit} disabled={submitting} size="lg" className="w-full">
        {submitting ? "Submitting..." : "Submit test"}
      </Button>
    </div>
  );
};

export default TakeTest;
