"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { entrancePoint, usePageMotion } from "@/components/motion/entrance";

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
  const released = usePageMotion();

  useGSAP(
    () => {
      if (!released) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: entrancePoint(root.current, "top 85%"),
            end: entrancePoint(root.current, "bottom top"),
            toggleActions: "restart none none reverse",
            invalidateOnRefresh: true,
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
    { scope: root, dependencies: [released] },
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
