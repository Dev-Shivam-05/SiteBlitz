import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
}

export function Counter({ from = 0, to }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(from, { damping: 30, stiffness: 100, mass: 1 });
  const display = useTransform(spring, (current) => Math.round(current).toString());

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
