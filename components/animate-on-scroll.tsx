"use client";

import { ReactNode, ElementType, CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade"
  | "scale-up"
  | "slide-left"
  | "slide-right";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: ElementType;
}

const getAnimationStyles = (
  animation: AnimationType,
  isInView: boolean,
  delay: number
): CSSProperties => {
  const baseTransition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
  const delayStyle = delay ? `${delay}ms` : "0ms";

  const animations: Record<
    AnimationType,
    { initial: CSSProperties; animated: CSSProperties }
  > = {
    "fade-up": {
      initial: { opacity: 0, transform: "translateY(30px)" },
      animated: { opacity: 1, transform: "translateY(0)" },
    },
    fade: {
      initial: { opacity: 0 },
      animated: { opacity: 1 },
    },
    "scale-up": {
      initial: { opacity: 0, transform: "scale(0.95)" },
      animated: { opacity: 1, transform: "scale(1)" },
    },
    "slide-left": {
      initial: { opacity: 0, transform: "translateX(-30px)" },
      animated: { opacity: 1, transform: "translateX(0)" },
    },
    "slide-right": {
      initial: { opacity: 0, transform: "translateX(30px)" },
      animated: { opacity: 1, transform: "translateX(0)" },
    },
  };

  const { initial, animated } = animations[animation];

  return {
    transition: baseTransition,
    transitionDelay: delayStyle,
    ...(isInView ? animated : initial),
  };
};

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  as: Component = "div",
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold, triggerOnce });

  return (
    <Component
      ref={ref as unknown}
      className={className}
      style={getAnimationStyles(animation, isInView, delay)}
    >
      {children}
    </Component>
  );
}
