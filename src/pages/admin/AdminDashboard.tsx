import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiFetch, unwrap, type Course, type Teacher, type SupportRequest, type Subscriber } from "@/lib/api";

const useCount = <T,>(key: string, path: string) =>
  useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        const data = unwrap<T[]>(await apiFetch(path));
        return Array.isArray(data) ? data.length : 0;
      } catch {
        return 0;
      }
    },
  });

const AdminDashboard = () => {
  const { data: teacherCount } = useCount<Teacher>("admin-teachers-count", "/api/teachers");
  const { data: courseCount } = useCount<Course>("admin-courses-count", "/api/courses");
  const { data: supportCount } = useCount<SupportRequest>("admin-support-count", "/api/support-requests");
  const { data: subCount } = useCount<Subscriber>("admin-subs-count", "/api/subscribers");

  const stats = [
    { label: "Teachers", value: teacherCount ?? 0, icon: Users, color: "text-primary" },
    { label: "Courses", value: courseCount ?? 0, icon: BookOpen, color: "text-[hsl(210,90%,55%)]" },
    { label: "Support Requests", value: supportCount ?? 0, icon: MessageSquare, color: "text-[hsl(35,100%,55%)]" },
    { label: "Subscribers", value: subCount ?? 0, icon: Mail, color: "text-[hsl(160,70%,45%)]" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={cn("h-5 w-5", s.color)} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
