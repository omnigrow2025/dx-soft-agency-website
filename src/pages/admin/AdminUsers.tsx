import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiFetch, unwrap, type Subscriber } from "@/lib/api";

const AdminUsers = () => {
  const { data: subs, isLoading } = useQuery({
    queryKey: ["admin-subscribers"],
    queryFn: async () => unwrap<Subscriber[]>(await apiFetch("/api/subscribers")),
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Subscribers</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Subscribed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : !subs?.length ? (
                <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">No subscribers yet</TableCell></TableRow>
              ) : (
                subs.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.email}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
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

export default AdminUsers;
