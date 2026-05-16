import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Row { key: string; values: Record<string, string> }

const AdminUITranslations = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [edits, setEdits] = useState<Record<string, Record<string, string>>>({});

  const { data: languages = [] } = useQuery({
    queryKey: ["langs-active"],
    queryFn: async () => {
      const { data, error } = await supabase.from("languages").select("code,name").eq("is_active", true).order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: translations, isLoading } = useQuery({
    queryKey: ["admin-ui-translations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ui_translations").select("key,locale,value");
      if (error) throw error;
      return data;
    },
  });

  const rows = useMemo<Row[]>(() => {
    const map: Record<string, Row> = {};
    (translations ?? []).forEach((t) => {
      if (!map[t.key]) map[t.key] = { key: t.key, values: {} };
      map[t.key].values[t.locale] = t.value;
    });
    let arr = Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
    if (search) arr = arr.filter((r) => r.key.toLowerCase().includes(search.toLowerCase()));
    return arr;
  }, [translations, search]);

  const upsert = useMutation({
    mutationFn: async (vars: { key: string; locale: string; value: string }) => {
      const { error } = await supabase.from("ui_translations").upsert(vars, { onConflict: "key,locale" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-ui-translations"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const saveRow = async (key: string) => {
    const pending = edits[key] || {};
    await Promise.all(Object.entries(pending).map(([locale, value]) => upsert.mutateAsync({ key, locale, value })));
    setEdits((p) => { const c = { ...p }; delete c[key]; return c; });
    toast.success("Saved");
  };

  const removeKey = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase.from("ui_translations").delete().eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-ui-translations"] }); toast.success("Removed"); },
  });

  const addKey = async () => {
    if (!newKey.trim()) return;
    await Promise.all(languages.map((l) => upsert.mutateAsync({ key: newKey.trim(), locale: l.code, value: "" })));
    setNewKey(""); setOpen(false); toast.success("Key added");
  };

  const cellValue = (key: string, locale: string, original: string | undefined) =>
    edits[key]?.[locale] ?? original ?? "";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold">UI Translations</h1>
        <div className="flex gap-2">
          <Input placeholder="Search keys…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Key</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Translation Key</DialogTitle></DialogHeader>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); addKey(); }}>
                <Input placeholder="key (e.g. hero.title)" value={newKey} onChange={(e) => setNewKey(e.target.value)} required />
                <Button type="submit" className="w-full">Create</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Key</TableHead>
                {languages.map((l) => (
                  <TableHead key={l.code} className="uppercase">{l.code}</TableHead>
                ))}
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={languages.length + 2} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
              ) : !rows.length ? (
                <TableRow><TableCell colSpan={languages.length + 2} className="text-center py-8 text-muted-foreground">No keys yet</TableCell></TableRow>
              ) : rows.map((r) => (
                <TableRow key={r.key}>
                  <TableCell className="font-mono text-xs">{r.key}</TableCell>
                  {languages.map((l) => (
                    <TableCell key={l.code}>
                      <Input
                        value={cellValue(r.key, l.code, r.values[l.code])}
                        onChange={(e) => setEdits((p) => ({ ...p, [r.key]: { ...(p[r.key] || {}), [l.code]: e.target.value } }))}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => saveRow(r.key)} disabled={!edits[r.key]}><Save className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => { if (confirm("Delete key?")) removeKey.mutate(r.key); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUITranslations;
