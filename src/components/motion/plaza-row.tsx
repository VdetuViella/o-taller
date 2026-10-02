"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type PlazaRowProps = {
  title: string;
  children: ReactNode;
};

export function PlazaRow({ title, children }: PlazaRowProps) {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        });

        timeline.fromTo(
          copyRef.current,
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          0.28,
        );
        timeline.fromTo(
          titleRef.current,
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="mx-auto grid max-w-[1400px] items-end gap-8 md:grid-cols-2"
    >
      <h2
        ref={titleRef}
        className="font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl"
      >
        {title}
      </h2>
      <div ref={copyRef} className="flex flex-col items-start gap-8">
        {children}
      </div>
    </div>
  );
}
