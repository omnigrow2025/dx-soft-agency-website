import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch, unwrap, type SupportRequest } from "@/lib/api";

const AdminSupport = () => {
  const qc = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-support"],
    queryFn: async () => unwrap<SupportRequest[]>(await apiFetch("/api/support-requests")),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      await apiFetch(`/api/support-requests/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-support"] });
      toast.success("Request deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Support Requests</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : !requests?.length ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No requests yet</TableCell></TableRow>
              ) : (
                requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{r.message}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(r.id); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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

export default AdminSupport;
