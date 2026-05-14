import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";

const AdminGuard = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminLayout />;
};

export default AdminGuard;
