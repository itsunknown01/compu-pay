import {
  Brain,
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

export default function FloatingElements() {
  const elements = [
    { Icon: Brain, delay: 0, duration: 3000, x: 10, y: 20 },
    { Icon: Calculator, delay: 0.5, duration: 4000, x: 80, y: 60 },
    { Icon: Shield, delay: 1, duration: 3500, x: 20, y: 80 },
    { Icon: Users, delay: 1.5, duration: 4500, x: 90, y: 30 },
    { Icon: TrendingUp, delay: 2, duration: 3800, x: 60, y: 10 },
    { Icon: Zap, delay: 2.5, duration: 4200, x: 40, y: 70 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => {
        const { Icon, duration, x, y } = element;
        return (
          <motion.div
            key={index}
            animate={{
              y: [0, -20, -10, -30, 0],
              rotate: [0, 5, -5, 3, 0],
              opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
              transition: {
                duration: duration / 1000,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              },
            }}
            className="absolute text-primary opacity-10"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon className="h-8 w-8 lg:h-12 lg:w-12" />
          </motion.div>
        );
      })}
    </div>
  );
}
