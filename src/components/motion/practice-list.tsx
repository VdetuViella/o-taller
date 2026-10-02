"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

type PracticeListProps = {
  names: readonly string[];
};

export function PracticeList({ names }: PracticeListProps) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const list = root.current;
    if (!list) return;

    const mm = gsap.matchMedia();
    const rows = [...list.querySelectorAll<HTMLElement>("[data-practice]")];

    mm.add(MOTION_OK, () => {
      gsap.from(rows, {
        y: 48,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: list,
          start: "top 85%",
          once: true,
        },
      });
    });

    mm.add(FINE_POINTER, () => {
      const cleanups: Array<() => void> = [];

      rows.forEach((row) => {
        const rule = row.querySelector<HTMLElement>("[data-rule]");
        if (!rule) return;

        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

        const onEnter = () => {
          gsap.to(rule, { scaleX: 1, duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(rule, {
            scaleX: 0,
            duration: 0.25,
            ease: "power2.inOut",
          });
        };

        row.addEventListener("pointerenter", onEnter);
        row.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          row.removeEventListener("pointerenter", onEnter);
          row.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    });
  }, { scope: root });

  return (
    <ul ref={root} className="mt-16 flex flex-col items-start gap-6">
      {names.map((nombre) => (
        <li key={nombre} data-practice className="relative">
          <h3 className="font-display text-4xl uppercase leading-[0.9] tracking-[-0.05em] md:text-6xl">
            {nombre}
          </h3>
          <span
            data-rule
            aria-hidden="true"
            className="pointer-events-none absolute top-full left-0 mt-1 block h-0.5 w-full origin-left scale-x-0 bg-primary"
          />
        </li>
      ))}
    </ul>
  );
}
