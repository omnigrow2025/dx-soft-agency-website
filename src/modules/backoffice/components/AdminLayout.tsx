import { type FC, type PropsWithChildren } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBell, FaSitemap, FaUsers } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { IoMdSchool } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  { name: "Master Users", path: "/admin", icon: <FaUsers /> },
  { name: "Teachers", path: "/admin/teachers", icon: <IoMdSchool /> },
  { name: "Courses", path: "/admin/courses", icon: <IoLibrary /> },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <BiSolidCategoryAlt />,
  },
  {
    name: "Support Requests",
    path: "/admin/support-requests",
    icon: <MdOutlineSupportAgent />,
  },
  { name: "Subscribers", path: "/admin/subscribers", icon: <FaBell /> },
  { name: "CMS", path: "/admin/content-manager", icon: <FaSitemap /> },
  {
    name: "Enrollments",
    path: "/admin/enrollments",
    icon: <AiOutlineUsergroupAdd />,
  },
];

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ✅ close drawer helper
  const closeDrawer = () => {
    const checkbox = document.getElementById("drawer") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle */}
      <input id="drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 justify-between px-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <GoSidebarCollapse />
            </label>

            <Link className="btn-ghost normal-case text-xl" to="/admin">
              OMNI DX
            </Link>
          </div>

          {/* Avatar dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={Logo} alt="User Avatar" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Page content */}
        <div className="h-full px-4">{children}</div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {sidebarItems.map(({ name, path, icon }) => (
              <li key={path}>
                <button
                  className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    pathname === path ? "text-primary" : "text-neutral"
                  }`}
                  data-tip={name}
                  onClick={() => {
                    navigate(path);
                    closeDrawer(); // ✅ auto close mobile drawer
                  }}
                >
                  {icon}
                  <span className="is-drawer-close:hidden">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
