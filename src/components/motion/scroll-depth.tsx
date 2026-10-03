"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { entrancePoint, usePageMotion } from "@/components/motion/entrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type ScrollDepthProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function ScrollDepth({ children, className, y = 0 }: ScrollDepthProps) {
  const ref = useRef<HTMLDivElement>(null);
  const released = usePageMotion();

  useGSAP(
    () => {
      if (!released) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.to(ref.current, {
          y,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: entrancePoint(ref.current, "top bottom"),
            end: entrancePoint(ref.current, "bottom top"),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: ref, dependencies: [y, released] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
