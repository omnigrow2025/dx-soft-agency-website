import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, MessageSquare, Shield, LogOut, LayoutDashboard, Columns2 } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/teachers", label: "Teachers", icon: Users },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/users", label: "Subscribers", icon: Shield },

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-foreground text-background flex flex-col">
        <div className="p-6 border-b border-background/10">
          <h2 className="text-lg font-bold">OMNIDX Admin</h2>
          <p className="text-xs text-background/60 mt-1">{user?.email}</p>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-background/70 hover:text-background hover:bg-background/10"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-background/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-background/70 hover:text-background hover:bg-background/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 bg-muted/20 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
