"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { entrancePoint, usePageMotion } from "@/components/motion/entrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type RevealHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function RevealHeading({ children, className }: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const released = usePageMotion();

  useGSAP(() => {
    if (!released) return;

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ref.current,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: ref.current,
            start: entrancePoint(ref.current, "top 85%"),
            end: entrancePoint(ref.current, "bottom top"),
            toggleActions: "restart none none reverse",
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }, { scope: ref, dependencies: [released] });

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
