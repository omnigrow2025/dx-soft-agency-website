import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

type Attempt = {
  id: string;
  test_id: string;
  first_name: string;
  last_name: string;
  email: string;
  score: number;
  total: number;
  completed_at: string | null;
  created_at: string;
};

const AdminTestAttempts = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [tests, setTests] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: a }, { data: t }] = await Promise.all([
      supabase.from("test_attempts").select("*").order("created_at", { ascending: false }),
      supabase.from("tests").select("id,name"),
    ]);
    setAttempts((a as Attempt[]) || []);
    setTests(Object.fromEntries(((t as any[]) || []).map((x) => [x.id, x.name])));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this attempt?")) return;
    const { error } = await supabase.from("test_attempts").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Deleted" });
    load();
  };

  const filtered = filter === "all" ? attempts : attempts.filter((a) => a.test_id === filter);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Test Attempts</h1>
        <p className="text-muted-foreground">People who have taken your tests.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All ({attempts.length})
        </Button>
        {Object.entries(tests).map(([id, name]) => (
          <Button key={id} variant={filter === id ? "default" : "outline"} size="sm" onClick={() => setFilter(id)}>
            {name}
          </Button>
        ))}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Score</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No attempts yet.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="text-xs">{new Date(a.created_at).toLocaleString()}</TableCell>
                  <TableCell>{tests[a.test_id] || "—"}</TableCell>
                  <TableCell>
                    {a.first_name} {a.last_name}
                  </TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell className="font-mono">
                    {a.score} / {a.total}
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(a.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminTestAttempts;
