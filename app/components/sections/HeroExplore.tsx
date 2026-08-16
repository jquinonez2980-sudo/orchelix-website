"use client";

import { useEffect, useState } from "react";
import PlusMark from "./PlusMark";

type Focus = "esmi" | "record" | null;

export default function HeroExplore({
  hint,
  hintTouch,
  esmiTitle,
  esmiBody,
  recordTitle,
  recordBody,
  children,
}: {
  hint: string;
  hintTouch: string;
  esmiTitle: string;
  esmiBody: string;
  recordTitle: string;
  recordBody: string;
  children: React.ReactNode;
}) {
  const [focus, setFocus] = useState<Focus>(null);
  const [coarse, setCoarse] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCoarse(touch.matches);
      setReduce(motion.matches);
    };
    sync();
    touch.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      touch.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  const toggle = (next: Exclude<Focus, null>) => {
    setFocus((prev) => (prev === next ? null : next));
  };

  const still = reduce;

  return (
    <div className="lg-explore" data-focus={still ? undefined : focus ?? undefined}>
      <div className="lg-explore__pods">
        <ExplorePod
          title={esmiTitle}
          body={esmiBody}
          hint={hint}
          hintTouch={hintTouch}
          active={still || focus === "esmi"}
          onEnter={() => !coarse && !still && setFocus("esmi")}
          onLeave={() => !coarse && !still && setFocus(null)}
          onToggle={() => toggle("esmi")}
        />
        <ExplorePod
          title={recordTitle}
          body={recordBody}
          hint={hint}
          hintTouch={hintTouch}
          active={still || focus === "record"}
          onEnter={() => !coarse && !still && setFocus("record")}
          onLeave={() => !coarse && !still && setFocus(null)}
          onToggle={() => toggle("record")}
        />
      </div>

      <div className="lg-explore__stage">
        <PlusMark className="lg-plus lg-plus--tl" />
        <PlusMark className="lg-plus lg-plus--tr" />
        <PlusMark className="lg-plus lg-plus--bl" />
        <PlusMark className="lg-plus lg-plus--br" />
        <div className="lg-explore__rings" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

function ExplorePod({
  title,
  body,
  hint,
  hintTouch,
  active,
  onEnter,
  onLeave,
  onToggle,
}: {
  title: string;
  body: string;
  hint: string;
  hintTouch: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="lg-explore__pod"
      data-active={active ? "true" : undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      aria-pressed={active}
    >
      <span className="lg-explore__eye" aria-hidden="true">
        <svg width="22" height="14" viewBox="0 0 30 20" fill="currentColor">
          <path d="M29.91 9.6C29.87 9.5 28.81 7.15 26.46 4.79 23.32 1.66 19.36 0 15 0 10.64 0 6.68 1.66 3.54 4.79 1.19 7.15.12 9.5.09 9.6A1.2 1.2 0 0 0 0 10c0 .14.03.28.09.41.04.1 1.1 2.44 3.45 4.8C6.68 18.34 10.64 20 15 20c4.36 0 8.32-1.66 11.46-4.79 2.35-2.36 3.41-4.7 3.45-4.8.06-.13.09-.27.09-.41 0-.14-.03-.28-.09-.4zM15 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
        </svg>
      </span>
      <span className="lg-explore__hint" data-fine={hint} data-touch={hintTouch} />
      <span className="lg-explore__pod-title">{title}</span>
      <span className="lg-explore__pod-body">{body}</span>
    </button>
  );
}
