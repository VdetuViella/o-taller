"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PageMotionContext = createContext(true);
const HeroDrivenContext = createContext(false);

export function usePageMotion() {
  return useContext(PageMotionContext);
}

export function useHeroDriven() {
  return useContext(HeroDrivenContext);
}

let entranceTrigger: ScrollTrigger | null = null;

export function entrancePin() {
  const site = document.querySelector<HTMLElement>("[data-entrance-pin]");
  if (!site?.parentElement?.classList.contains("pin-spacer")) return undefined;
  return site;
}

export function entranceTravel() {
  if (!entranceTrigger) return 0;
  return Math.max(0, entranceTrigger.end - entranceTrigger.start);
}

const VIEWPORT_EDGE: Record<string, number> = {
  top: 0,
  center: 0.5,
  bottom: 1,
};

function offsetWithinPage(node: HTMLElement) {
  const site = document.querySelector<HTMLElement>("[data-entrance-pin]");
  let top = 0;
  let current: HTMLElement | null = node;

  while (current && current !== site) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

const GESTURE_GAP = 180;

function wheelDelta(event: WheelEvent) {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

function holdPinEdge(pin: ScrollTrigger) {
  let armed = false;
  let timer = 0;
  let touchY = 0;
  let touchArmed = false;

  const release = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      armed = false;
    }, GESTURE_GAP);
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return;
    const delta = wheelDelta(event);
    if (delta === 0) return;
    release();
    if (delta > 0) return;

    const limit = pin.end;
    if (limit <= 0) return;
    const y = window.scrollY;

    if (y > limit + 0.5) {
      if (y + delta <= limit) {
        event.preventDefault();
        window.scrollTo(0, limit);
        armed = true;
      }
      return;
    }

    if (armed) {
      event.preventDefault();
      if (y < limit) window.scrollTo(0, limit);
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
    touchArmed = false;
  };

  const onTouchMove = (event: TouchEvent) => {
    const point = event.touches[0];
    if (!point) return;
    const dy = point.clientY - touchY;
    touchY = point.clientY;
    if (dy <= 0) return;

    const limit = pin.end;
    if (limit <= 0) return;
    const y = window.scrollY;

    if (y > limit + 0.5) {
      if (dy >= y - limit) {
        event.preventDefault();
        window.scrollTo(0, limit);
        touchArmed = true;
      }
      return;
    }

    if (touchArmed) {
      event.preventDefault();
      if (y < limit) window.scrollTo(0, limit);
    }
  };

  const onTouchEnd = () => {
    window.setTimeout(() => {
      touchArmed = false;
    }, 80);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };
}

export function entrancePoint(node: HTMLElement | null, position: string) {
  return () => {
    const travel = entranceTravel();
    if (!node) return travel;

    const [edge = "top", viewport = "bottom"] = position.split(" ");
    const height = window.innerHeight;
    const viewportY = viewport.endsWith("%")
      ? (parseFloat(viewport) / 100) * height
      : (VIEWPORT_EDGE[viewport] ?? 1) * height;
    const edgeY =
      edge === "bottom" ? node.offsetHeight : edge === "center" ? node.offsetHeight / 2 : 0;
    const value = travel + offsetWithinPage(node) + edgeY - viewportY;
    return value;
  };
}

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const REDUCE = "(prefers-reduced-motion: reduce)";

function lockBox(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  gsap.set(el, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    right: "auto",
    bottom: "auto",
    x: 0,
    y: 0,
    xPercent: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    autoAlpha: 1,
    transformOrigin: "0 0",
  });
  return rect;
}

function typeMove(from: HTMLElement, to: HTMLElement) {
  const start = from.getBoundingClientRect();
  const end = to.getBoundingClientRect();
  const fromStyle = getComputedStyle(from);
  const toSize = parseFloat(getComputedStyle(to).fontSize);
  const fromSize = parseFloat(fromStyle.fontSize);
  if (fromSize < 1 || toSize < 1) return null;

  const scale = toSize / fromSize;
  const padLeft = parseFloat(fromStyle.paddingLeft) || 0;
  const padTop = parseFloat(fromStyle.paddingTop) || 0;

  return {
    x: end.left - start.left - padLeft * scale,
    y: end.top - start.top - padTop * scale,
    scale,
  };
}

type EntranceProps = {
  children: ReactNode;
};

export function Entrance({ children }: EntranceProps) {
  const [released, setReleased] = useState(false);
  const [pass, setPass] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const passRef = useRef(false);

  useEffect(() => {
    if (!released) return;
    ScrollTrigger.refresh();
  }, [released]);

  const setPassThrough = (next: boolean) => {
    if (passRef.current === next) return;
    passRef.current = next;
    setPass(next);
  };

  return (
    <HeroDrivenContext.Provider value={true}>
      <PageMotionContext.Provider value={released}>
        <div ref={siteRef} data-entrance-pin="" inert={pass ? undefined : true}>
          {children}
        </div>
        <Curtain
          rootRef={curtainRef}
          siteRef={siteRef}
          onReady={() => setReleased(true)}
          onPass={setPassThrough}
        />
      </PageMotionContext.Provider>
    </HeroDrivenContext.Provider>
  );
}

type CurtainProps = {
  rootRef: RefObject<HTMLDivElement | null>;
  siteRef: RefObject<HTMLDivElement | null>;
  onReady: () => void;
  onPass: (pass: boolean) => void;
};

function Curtain({ rootRef, siteRef, onReady, onPass }: CurtainProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const site = siteRef.current;
      if (!root || !site) return;

      const html = document.documentElement;
      const previousOverflow = html.style.overflow;
      const mm = gsap.matchMedia();

      mm.add(REDUCE, () => {
        gsap.set(root, { autoAlpha: 0 });
        onPass(true);
        onReady();
      });

      mm.add(MOTION_OK, () => {
        const left = leftRef.current;
        const right = rightRef.current;
        const word = wordRef.current;
        const hero = site.querySelector<HTMLElement>("[data-entrance-hero]");
        const logo = site.querySelector<HTMLElement>("[data-entrance-logo]");
        const title = site.querySelector<HTMLElement>("[data-entrance-title]");
        const lede = site.querySelector<HTMLElement>("[data-entrance-lede]");
        const cta = site.querySelector<HTMLElement>("[data-entrance-cta]");

        html.style.overflow = "hidden";
        gsap.set([title, lede, cta, hero, logo], { autoAlpha: 0 });

        let intro: ScrollTrigger | null = null;
        let removeEdge: (() => void) | null = null;

        const llegada = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            html.style.overflow = previousOverflow;
            llegada.getChildren().forEach((child) => child.kill());

            gsap.set(left, {
              xPercent: 0,
              x: 0,
              y: 0,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              autoAlpha: 1,
            });
            gsap.set(right, {
              xPercent: 0,
              x: 0,
              y: 0,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              autoAlpha: 1,
            });
            gsap.set(word, { x: 0, y: 0, scale: 1, autoAlpha: 1, transformOrigin: "0 0" });

            const leftBox = left ? lockBox(left) : null;
            const rightBox = right ? lockBox(right) : null;
            const heroBox = hero?.getBoundingClientRect();
            const move = word && logo ? typeMove(word, logo) : null;
            const abrir = gsap.timeline({ defaults: { ease: "none" } });

            if (right && rightBox) {
              abrir.to(
                right,
                { left: rightBox.left + rightBox.width + 32, duration: 1 },
                0,
              );
            }
            abrir.to(
              [fieldRef.current, barRef.current],
              { autoAlpha: 0, duration: 0.4 },
              0.35,
            );

            if (left && leftBox && heroBox && heroBox.width > 1 && heroBox.height > 1) {
              abrir.to(
                left,
                {
                  top: heroBox.top,
                  left: heroBox.left,
                  width: heroBox.width,
                  height: heroBox.height,
                  duration: 1,
                },
                0,
              );
              abrir.set(hero, { autoAlpha: 1 }, 1);
              abrir.set(left, { autoAlpha: 0 }, 1);
            } else if (left) {
              abrir.set(left, { autoAlpha: 0 }, 0.3);
              if (hero) abrir.set(hero, { autoAlpha: 1 }, 0.3);
            }

            if (word && move) {
              abrir.to(
                word,
                { x: move.x, y: move.y, scale: move.scale, duration: 0.94 },
                0,
              );
              abrir.to(word, { autoAlpha: 0, duration: 0.06, immediateRender: false }, 0.94);
              abrir.to(logo, { autoAlpha: 1, duration: 0.06, immediateRender: false }, 0.94);
            } else if (word) {
              abrir.set(word, { autoAlpha: 0 }, 0.4);
              if (logo) abrir.set(logo, { autoAlpha: 1 }, 0.4);
            }

            abrir.fromTo(
              title,
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.14, immediateRender: false },
              0.74,
            );
            abrir.fromTo(
              lede,
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.14, immediateRender: false },
              0.8,
            );
            abrir.fromTo(
              cta,
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.14, immediateRender: false },
              0.84,
            );

            intro = ScrollTrigger.create({
              trigger: site,
              start: "top top",
              end: "+=160%",
              pin: true,
              scrub: true,
              animation: abrir,
              anticipatePin: 1,
              refreshPriority: -1,
              onUpdate: (self) => {
                onPass(self.progress > 0.98);
              },
            });
            entranceTrigger = intro;
            removeEdge?.();
            removeEdge = holdPinEdge(intro);

            onReady();
          },
        });

        llegada.fromTo(
          left,
          { xPercent: -112, rotation: -6 },
          { xPercent: 0, rotation: 0, duration: 1.15, transformOrigin: "50% 50%" },
          0,
        );
        llegada.fromTo(
          right,
          { xPercent: 112, rotation: 6 },
          { xPercent: 0, rotation: 0, duration: 1.15, transformOrigin: "50% 50%" },
          0.08,
        );
        llegada.fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.out" },
          0,
        );
        llegada.fromTo(
          word,
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          0.42,
        );

        return () => {
          removeEdge?.();
          intro?.kill();
          if (entranceTrigger === intro) entranceTrigger = null;
          html.style.overflow = previousOverflow;
        };
      });
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      <div ref={fieldRef} className="absolute inset-0 bg-white" />
      <div
        ref={barRef}
        className="absolute top-0 left-0 z-30 h-2 w-full origin-left bg-primary motion-safe:scale-x-0"
      />
      <figure
        ref={leftRef}
        className="absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden border-r border-black motion-safe:-translate-x-full"
      >
        <div className="absolute -inset-10">
          <Image
            src="/galeria.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </figure>
      <figure
        ref={rightRef}
        className="absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden will-change-transform motion-safe:translate-x-full"
      >
        <Image
          src="/pinceles.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </figure>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <p
          ref={wordRef}
          className="bg-white px-5 py-3 font-display text-6xl uppercase leading-[0.9] tracking-[-0.05em] will-change-transform motion-safe:opacity-0 md:text-8xl"
        >
          O Taller
        </p>
      </div>
    </div>
  );
}
