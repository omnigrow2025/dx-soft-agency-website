import type { FC } from "react";
import { motion } from "framer-motion";

interface TypographyProps {
  text: string;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({ text, className }) => {
  const words = text.trim().split(" ");
  if (words.length === 0) return null;

  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const middleWords = words.slice(1, -1).join(" ");

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${className || ""} leading-snug`}
    >
      <span className="text-primary">{firstWord}</span>{" "}
      {middleWords && <span>{middleWords} </span>}
      <b>{lastWord}</b>
    </motion.p>
  );
};
