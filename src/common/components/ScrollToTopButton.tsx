import { type FC, useEffect, useState } from "react";
import { scrollUpToTop } from "../utils/scrollUpToTop";
import { IoIosArrowUp } from "react-icons/io";

export const ScrollToTopButton: FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollUpToTop}
      className={`
        fixed bottom-4 right-4 z-50
        w-12 h-12 flex items-center justify-center
        rounded-full shadow-lg
        bg-primary hover:opacity-90 text-white   transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        cursor-pointer
      `}
      aria-label="Scroll to top"
    >
      <IoIosArrowUp className="text-2xl" />
    </button>
  );
};
