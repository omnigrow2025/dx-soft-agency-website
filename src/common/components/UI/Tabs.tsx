import { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TabProps } from "./Tab";

interface TabsProps {
  children: ReactElement<TabProps>[];
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full">
      {/* TAB HEADERS */}
      <div className="flex flex-col md:flex-row border-b border-gray-100 mb-6">
        {children.map((tab, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={tab.props.label + index}
              onClick={() => setActiveIndex(index)}
              className={`relative text-left md:text-center px-4 md:px-6 py-3 md:pb-4 text-sm md:text-base font-medium transition-colors
                ${isActive ? "text-[#1F3530]" : "text-gray-400 hover:text-gray-600"}
              `}
            >
              {tab.props.label}

              {isActive && (
                <>
                  <div className="hidden md:block absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  <div className="md:hidden absolute left-0 top-0 h-full w-0.5 bg-primary" />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT (SMOOTH SWITCH) */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            {children[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
