import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const Section = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.9 }}
  >
    {children}
  </motion.div>
);
