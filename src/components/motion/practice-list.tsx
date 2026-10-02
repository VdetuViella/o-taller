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
      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          { y: 28 + index * 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "restart none none reverse",
            },
          },
        );
      });
    });

    mm.add(FINE_POINTER, () => {
      const cleanups: Array<() => void> = [];

      rows.forEach((row) => {
        const rule = row.querySelector<HTMLElement>("[data-rule]");
        const name = row.querySelector<HTMLElement>("[data-name]");
        if (!rule || !name) return;

        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

        const xTo = gsap.quickTo(name, "x", {
          duration: 0.35,
          ease: "power3.out",
        });

        const onEnter = () => {
          gsap.to(rule, { scaleX: 1, duration: 0.35, ease: "power2.out" });
        };
        const onMove = (event: PointerEvent) => {
          const rect = row.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          xTo(gsap.utils.clamp(-6, 6, dx));
        };
        const onLeave = () => {
          xTo(0);
          gsap.to(rule, {
            scaleX: 0,
            duration: 0.25,
            ease: "power2.inOut",
          });
        };

        row.addEventListener("pointerenter", onEnter);
        row.addEventListener("pointermove", onMove);
        row.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          row.removeEventListener("pointerenter", onEnter);
          row.removeEventListener("pointermove", onMove);
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
          <h3
            data-name
            className="font-display text-4xl uppercase leading-[0.9] tracking-[-0.05em] md:text-6xl"
          >
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
