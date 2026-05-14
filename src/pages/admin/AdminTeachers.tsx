import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch, unwrap, type Teacher } from "@/lib/api";

const emptyForm = { name: "", lastName: "", bio: "", description: "", imageUrl: "", email: "", phoneNumber: "" };

const AdminTeachers = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: teachers, isLoading } = useQuery({
    queryKey: ["admin-teachers"],
    queryFn: async () => unwrap<Teacher[]>(await apiFetch("/api/teachers")),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        await apiFetch(`/api/teachers/${editing}`, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await apiFetch("/api/teachers", { method: "POST", body: JSON.stringify(form) });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-teachers"] });
      toast.success(editing ? "Teacher updated" : "Teacher created");
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/teachers/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-teachers"] });
      toast.success("Teacher deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setOpen(false);
  };

  const openEdit = (t: Teacher) => {
    setForm({
      name: t.name,
      lastName: t.lastName ?? "",
      bio: t.bio ?? "",
      description: t.description ?? "",
      imageUrl: t.imageUrl ?? "",
      email: t.email ?? "",
      phoneNumber: t.phoneNumber ?? "",
    });
    setEditing(t.id);
    setOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Teacher</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
              <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Phone" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
              <Input placeholder="Image URL / Cloudinary id" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              <Input placeholder="Short bio (e.g. Business Trainer)" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              <Textarea placeholder="Description" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : !teachers?.length ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No teachers yet</TableCell></TableRow>
              ) : (
                teachers.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name} {t.lastName}</TableCell>
                    <TableCell className="text-muted-foreground">{t.bio}</TableCell>
                    <TableCell>{t.email}</TableCell>
                    <TableCell>{t.phoneNumber}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(t.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTeachers;
