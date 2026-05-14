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
import { apiFetch, unwrap, type Course } from "@/lib/api";

const emptyForm = {
  title: "",
  level: "",
  type: "",
  currency: "AMD",
  price: "",
  salePrice: "",
  duration: "",
  imageUrl: "",
  certificate: "",
  description: "",
};

const AdminCourses = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => unwrap<Course[]>(await apiFetch("/api/courses")),
  });

  const buildPayload = () => ({
    title: form.title,
    level: form.level || null,
    type: form.type || null,
    currency: form.currency || null,
    price: form.price ? Number(form.price) : null,
    salePrice: form.salePrice ? Number(form.salePrice) : null,
    duration: form.duration ? Number(form.duration) : null,
    imageUrl: form.imageUrl || null,
    certificate: form.certificate || null,
    description: form.description || null,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = buildPayload();
      if (editing) {
        await apiFetch(`/api/courses/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await apiFetch("/api/courses", { method: "POST", body: JSON.stringify(payload) });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
      toast.success(editing ? "Course updated" : "Course created");
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/courses/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
      toast.success("Course deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setOpen(false);
  };

  const openEdit = (c: Course) => {
    setForm({
      title: c.title,
      level: c.level ?? "",
      type: c.type ?? "",
      currency: c.currency ?? "AMD",
      price: c.price?.toString() ?? "",
      salePrice: c.salePrice?.toString() ?? "",
      duration: c.duration?.toString() ?? "",
      imageUrl: c.imageUrl ?? "",
      certificate: c.certificate ?? "",
      description: c.description ?? "",
    });
    setEditing(c.id);
    setOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Course</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Course" : "Add Course"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
                <Input placeholder="Type (Online/Offline)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <Input placeholder="Sale price" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
                <Input placeholder="Currency" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
              </div>
              <Input placeholder="Duration (months)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              <Input placeholder="Image URL / Cloudinary id" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              <Textarea placeholder="Certificate description" rows={3} value={form.certificate} onChange={(e) => setForm({ ...form, certificate: e.target.value })} />
              <Textarea placeholder="Description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : !courses?.length ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No courses yet</TableCell></TableRow>
              ) : (
                courses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell>{c.level}</TableCell>
                    <TableCell>{c.price?.toLocaleString()} {c.currency}</TableCell>
                    <TableCell>{c.duration}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(c.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

export default AdminCourses;
