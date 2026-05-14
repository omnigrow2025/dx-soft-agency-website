import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedComponent } from "./common/components/ProtectedComponent";
import { PublicComponent } from "./common/components/PublicComponent";
import { Backoffice } from "./modules/backoffice/Backoffice";
import { Categories } from "./modules/backoffice/pages/admin/items/categories/Categories";
import { CmsContentManager } from "./modules/backoffice/pages/admin/items/cms/CmsContentManager";
import { Courses } from "./modules/backoffice/pages/admin/items/courses/Courses";
import { CreateCourse } from "./modules/backoffice/pages/admin/items/courses/components/CreateCourse";
import { UpdateCourse } from "./modules/backoffice/pages/admin/items/courses/components/UpdateCourse";
import { MasterUser } from "./modules/backoffice/pages/admin/items/master-users/MasterUser";
import { Subscribers } from "./modules/backoffice/pages/admin/items/subscribers/Subscribers";
import { SupportRequests } from "./modules/backoffice/pages/admin/items/support-requests/SupportRequests";
import { Teachers } from "./modules/backoffice/pages/admin/items/teachers/Teachers";
import { CreateTeacher } from "./modules/backoffice/pages/admin/items/teachers/components/CreateTeacher";
import { UpdateTeacher } from "./modules/backoffice/pages/admin/items/teachers/components/UpdateTeacher";
import { Login } from "./modules/backoffice/pages/login/Login";
import { Register } from "./modules/backoffice/pages/register/Register";
import { WebsiteApp } from "./modules/website/WebsiteApp";
import { CoursePage } from "./modules/website/pages/course/CoursePage";
import { Home } from "./modules/website/pages/home/Home";
import { Enrollments } from "./modules/backoffice/pages/admin/items/enrollments/Enrollments";

function App() {
  return (
    <>
      <Routes>
        <Route element={<WebsiteApp />}>
          <Route element={<Home />} index />
          <Route element={<CoursePage />} path="course/:courseId" />
        </Route>

        <Route
          element={
            <ProtectedComponent>
              <Backoffice />
            </ProtectedComponent>
          }
          path="/admin"
        >
          <Route element={<MasterUser />} index />
          <Route element={<Teachers />} path="teachers" />
          <Route element={<CreateTeacher />} path="teachers/create" />
          <Route
            element={<UpdateTeacher />}
            path="teachers/update/:teacherId"
          />
          <Route element={<Courses />} path="courses" />
          <Route element={<CreateCourse />} path="courses/create" />
          <Route element={<UpdateCourse />} path="courses/update/:courseId" />
          <Route element={<Categories />} path="categories" />
          <Route element={<SupportRequests />} path="support-requests" />
          <Route element={<Subscribers />} path="subscribers" />
          <Route element={<CmsContentManager />} path="content-manager" />
          <Route element={<Enrollments />} path="enrollments" />
        </Route>
        <Route
          element={
            <PublicComponent>
              <Login />
            </PublicComponent>
          }
          path="/login"
        />
        <Route
          element={
            <PublicComponent>
              <Register />
            </PublicComponent>
          }
          path="/register"
        />
      </Routes>
    </>
  );
}

export default App;
