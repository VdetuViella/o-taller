"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { entrancePoint, usePageMotion } from "@/components/motion/entrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  upwardExit?: boolean;
};

export function RevealGroup({
  children,
  className,
  delay = 0,
  start = "top 85%",
  upwardExit = false,
}: RevealGroupProps) {
  const root = useRef<HTMLDivElement>(null);
  const released = usePageMotion();

  useGSAP(
    () => {
      if (!released) return;

      const group = root.current;
      if (!group) return;

      const items = [...group.querySelectorAll<HTMLElement>("[data-reveal]")];
      if (items.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (upwardExit) {
          items.forEach((item) => {
            gsap.fromTo(
              item,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
                scrollTrigger: {
                  trigger: item,
                  start: entrancePoint(item, "top 82%"),
                  end: entrancePoint(item, "bottom top"),
                  toggleActions: "restart none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          });
          return;
        }

        gsap.fromTo(
          items,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            delay,
            stagger: 0.12,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: group,
              start: entrancePoint(group, start),
              end: entrancePoint(group, "bottom top"),
              toggleActions: "restart none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: root, dependencies: [delay, start, upwardExit, released] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
