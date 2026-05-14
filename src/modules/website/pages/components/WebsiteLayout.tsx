import { type FC, type PropsWithChildren, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import NavbarLogo from "../../../../assets/navbar-logo.png";
import { ScrollToTopButton } from "../../../../common/components/ScrollToTopButton";
import { FaqSection } from "./FaqSection";
import { Footer } from "./Footer";
import { Subscribe } from "./Subscribe";
import { SupportRequest } from "./SupportRequest";
import { TeamCarousel } from "./TeamCarousel";

const links = [
  { label: "Մեր մասին", to: "/#aboutUs" },
  { label: "Դասընթացներ", to: "/#courses" },
  { label: "Մասնագետներ", to: "/#masters" },
  { label: "Q&A", to: "/#Q&A" },
  { label: "Կապ", to: "/#supportRequest" },
];

export const WebsiteLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="drawer">
        {/* Controlled drawer */}
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          readOnly
        />

        {/* Drawer Content */}
        <div className="drawer-content flex flex-col pt-16">
          {/* Navbar */}
          <div className="navbar w-full flex justify-between fixed top-0 left-0 z-50 bg-white shadow-md">
            {/* Logo */}
            <div className="px-5 flex-1">
              <Link className="btn-ghost normal-case text-xl" to="/">
                <img
                  src={NavbarLogo}
                  alt="Logo"
                  className="w-28 h-12 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex px-5">
              <ul className="menu  menu-horizontal gap-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <HashLink smooth to={link.to}>
                      {link.label}
                    </HashLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Toggle */}
            <div className="flex-none lg:hidden px-5">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
              >
                <HiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {children}
        </div>

        {/* Drawer Side */}
        <div
          className={`drawer-side z-100 ${
            isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <label className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-64 p-4 z-1000">
            {links.map((link) => (
              <li key={link.to}>
                <HashLink
                  smooth
                  to={link.to}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ScrollToTopButton />
      {/* Page Sections */}
      <Subscribe />
      <TeamCarousel />
      <FaqSection />
      <SupportRequest />
      <Footer />
    </>
  );
};
