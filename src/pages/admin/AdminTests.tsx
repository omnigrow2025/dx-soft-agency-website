import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, ChevronDown, ChevronRight } from "lucide-react";

type Test = {
  id: string;
  name: string;
  duration_minutes: number;
  is_active: boolean;
};

type Question = {
  id?: string;
  test_id?: string;
  question: string;
  options: string[];
  correct_option: number;
  sort_order: number;
  _new?: boolean;
};

const AdminTests = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [newTest, setNewTest] = useState({ name: "", duration_minutes: 30 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("tests").select("*").order("created_at", { ascending: false });
    setTests((data as Test[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const loadQuestions = async (testId: string) => {
    const { data } = await supabase
      .from("test_questions")
      .select("*")
      .eq("test_id", testId)
      .order("sort_order");
    setQuestions((p) => ({
      ...p,
      [testId]: ((data as any[]) || []).map((q) => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : [],
      })),
    }));
  };

  const toggle = async (id: string) => {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    if (!questions[id]) await loadQuestions(id);
  };

  const createTest = async () => {
    if (!newTest.name.trim()) return;
    const { error } = await supabase.from("tests").insert(newTest);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setNewTest({ name: "", duration_minutes: 30 });
    toast({ title: "Test created" });
    load();
  };

  const deleteTest = async (id: string) => {
    if (!confirm("Delete this test and all its questions?")) return;
    await supabase.from("tests").delete().eq("id", id);
    toast({ title: "Deleted" });
    load();
  };

  const updateTest = async (t: Test) => {
    const { error } = await supabase
      .from("tests")
      .update({ name: t.name, duration_minutes: t.duration_minutes, is_active: t.is_active })
      .eq("id", t.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Saved" });
  };

  const addQuestion = (testId: string) => {
    setQuestions((p) => ({
      ...p,
      [testId]: [
        ...(p[testId] || []),
        {
          test_id: testId,
          question: "",
          options: ["", ""],
          correct_option: 0,
          sort_order: (p[testId]?.length || 0),
          _new: true,
        },
      ],
    }));
  };

  const updateQ = (testId: string, idx: number, patch: Partial<Question>) => {
    setQuestions((p) => ({
      ...p,
      [testId]: p[testId].map((q, i) => (i === idx ? { ...q, ...patch } : q)),
    }));
  };

  const saveQuestion = async (testId: string, idx: number) => {
    const q = questions[testId][idx];
    if (!q.question.trim() || q.options.length < 2) {
      return toast({ title: "Need a question and at least 2 options", variant: "destructive" });
    }
    const payload = {
      test_id: testId,
      question: q.question,
      options: q.options,
      correct_option: q.correct_option,
      sort_order: q.sort_order,
    };
    if (q.id) {
      const { error } = await supabase.from("test_questions").update(payload).eq("id", q.id);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      const { error } = await supabase.from("test_questions").insert(payload);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    toast({ title: "Question saved" });
    loadQuestions(testId);
  };

  const deleteQuestion = async (testId: string, idx: number) => {
    const q = questions[testId][idx];
    if (q.id) await supabase.from("test_questions").delete().eq("id", q.id);
    setQuestions((p) => ({ ...p, [testId]: p[testId].filter((_, i) => i !== idx) }));
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tests</h1>
        <p className="text-muted-foreground">Create tests with questions, options, and correct answers.</p>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold">Create new test</h2>
        <div className="grid md:grid-cols-[1fr_180px_auto] gap-3">
          <div>
            <Label>Name</Label>
            <Input value={newTest.name} onChange={(e) => setNewTest({ ...newTest, name: e.target.value })} />
          </div>
          <div>
            <Label>Duration (min)</Label>
            <Input
              type="number"
              value={newTest.duration_minutes}
              onChange={(e) => setNewTest({ ...newTest, duration_minutes: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={createTest}>
              <Plus className="h-4 w-4 mr-2" /> Create
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {tests.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => toggle(t.id)}>
                  {expanded === t.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <Input
                  className="flex-1"
                  value={t.name}
                  onChange={(e) => setTests((p) => p.map((x) => (x.id === t.id ? { ...x, name: e.target.value } : x)))}
                />
                <Input
                  type="number"
                  className="w-24"
                  value={t.duration_minutes}
                  onChange={(e) =>
                    setTests((p) =>
                      p.map((x) => (x.id === t.id ? { ...x, duration_minutes: parseInt(e.target.value) || 0 } : x))
                    )
                  }
                />
                <Button variant="outline" size="sm" onClick={() => updateTest(t)}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteTest(t.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {expanded === t.id && (
                <div className="mt-4 space-y-3 pl-12">
                  {(questions[t.id] || []).map((q, idx) => (
                    <Card key={q.id || `new-${idx}`} className="p-4 space-y-3 bg-muted/30">
                      <div>
                        <Label>Question</Label>
                        <Textarea
                          value={q.question}
                          onChange={(e) => updateQ(t.id, idx, { question: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Options (select the correct one)</Label>
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={q.correct_option === oi}
                              onChange={() => updateQ(t.id, idx, { correct_option: oi })}
                            />
                            <Input
                              value={opt}
                              onChange={(e) =>
                                updateQ(t.id, idx, {
                                  options: q.options.map((o, i) => (i === oi ? e.target.value : o)),
                                })
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQ(t.id, idx, {
                                  options: q.options.filter((_, i) => i !== oi),
                                  correct_option: q.correct_option >= oi && q.correct_option > 0 ? q.correct_option - 1 : q.correct_option,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQ(t.id, idx, { options: [...q.options, ""] })}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add option
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveQuestion(t.id, idx)}>
                          <Save className="h-4 w-4 mr-1" /> Save question
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteQuestion(t.id, idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => addQuestion(t.id)}>
                    <Plus className="h-4 w-4 mr-2" /> Add question
                  </Button>
                </div>
              )}
            </Card>
          ))}
          {tests.length === 0 && <p className="text-muted-foreground">No tests yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminTests;
