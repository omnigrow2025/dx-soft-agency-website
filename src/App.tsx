import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { I18nProvider } from "@/hooks/useI18n";
import Index from "./pages/Index.tsx";
import TeacherDetail from "./pages/TeacherDetail.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminGuard from "./pages/admin/AdminGuard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminDesignSync from "./pages/admin/AdminDesignSync";
import AdminLanguages from "./pages/admin/AdminLanguages";
import AdminUITranslations from "./pages/admin/AdminUITranslations";
import AdminContentTranslations from "./pages/admin/AdminContentTranslations";
import AdminTests from "./pages/admin/AdminTests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/admin" element={<AdminGuard />}>
              <Route index element={<AdminDashboard />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="design-sync" element={<AdminDesignSync />} />
              <Route path="languages" element={<AdminLanguages />} />
              <Route path="ui-translations" element={<AdminUITranslations />} />
              <Route path="content-translations" element={<AdminContentTranslations />} />
              <Route path="tests" element={<AdminTests />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
