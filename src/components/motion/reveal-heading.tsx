"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type RevealHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function RevealHeading({ children, className }: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
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
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        },
      );
    });
  }, { scope: ref });

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
