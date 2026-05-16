import { motion } from "framer-motion";
import logo from "@/assets/vision-logo.png";

const LoadingScreen = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-background"
          : "flex items-center justify-center py-24"
      }
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Rotating ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-2 rounded-full border border-accent/20 border-b-accent/70"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          {/* Pulsing logo */}
          <motion.img
            src={logo}
            alt="Vision"
            className="w-14 h-14 object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.45)]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
