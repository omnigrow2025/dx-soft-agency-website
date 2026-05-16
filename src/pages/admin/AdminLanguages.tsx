import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const empty = { code: "", name: "", native_name: "", sort_order: 0 };

const AdminLanguages = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  const { data: languages, isLoading } = useQuery({
    queryKey: ["admin-languages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("languages").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("languages").insert({
        code: form.code.toLowerCase().trim(),
        name: form.name,
        native_name: form.native_name || null,
        sort_order: Number(form.sort_order) || 0,
      });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-languages"] }); toast.success("Language added"); setForm(empty); setOpen(false); },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async (vars: { code: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase.from("languages").update(vars.patch).eq("code", vars.code);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-languages"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (code: string) => {
      const { error } = await supabase.from("languages").delete().eq("code", code);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-languages"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const setDefault = async (code: string) => {
    await supabase.from("languages").update({ is_default: false }).neq("code", code);
    await supabase.from("languages").update({ is_default: true }).eq("code", code);
    qc.invalidateQueries({ queryKey: ["admin-languages"] });
    toast.success("Default updated");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Languages</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Language</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Language</DialogTitle></DialogHeader>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); create.mutate(); }}>
              <Input placeholder="Code (e.g. it)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required maxLength={8} />
              <Input placeholder="Name (English)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input placeholder="Native name" value={form.native_name} onChange={(e) => setForm({ ...form, native_name: e.target.value })} />
              <Input type="number" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              <Button type="submit" className="w-full" disabled={create.isPending}>Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Native</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
              ) : !languages?.length ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No languages</TableCell></TableRow>
              ) : languages.map((l) => (
                <TableRow key={l.code}>
                  <TableCell className="font-mono uppercase">{l.code}</TableCell>
                  <TableCell>{l.name}</TableCell>
                  <TableCell className="text-muted-foreground">{l.native_name}</TableCell>
                  <TableCell>
                    <Switch checked={l.is_active} onCheckedChange={(v) => update.mutate({ code: l.code, patch: { is_active: v } })} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={l.is_default} onCheckedChange={() => !l.is_default && setDefault(l.code)} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete language and all its translations?")) remove.mutate(l.code); }}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
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

export default AdminLanguages;
