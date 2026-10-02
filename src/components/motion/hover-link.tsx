"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

type HoverLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function HoverLink({ href, className, children }: HoverLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const link = ref.current;
      if (!link) return;

      const rule = link.querySelector<HTMLElement>("[data-rule]");
      if (!rule) return;

      const mm = gsap.matchMedia();

      mm.add(FINE_POINTER, () => {
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

        const onEnter = () => {
          gsap.to(rule, { scaleX: 1, duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(rule, { scaleX: 0, duration: 0.25, ease: "power2.inOut" });
        };

        link.addEventListener("pointerenter", onEnter);
        link.addEventListener("pointerleave", onLeave);

        return () => {
          link.removeEventListener("pointerenter", onEnter);
          link.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref },
  );

  return (
    <a ref={ref} href={href} className={cn("relative inline-block", className)}>
      {children}
      <span
        data-rule
        aria-hidden="true"
        className="pointer-events-none absolute top-full left-0 mt-0.5 block h-0.5 w-full origin-left scale-x-0 bg-primary"
      />
    </a>
  );
}
