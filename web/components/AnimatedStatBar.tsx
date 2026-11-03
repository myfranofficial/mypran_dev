"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ShieldIcon,
  ChatIcon,
  ChevronRight,
  ICON_MAP,
} from "@/components/icons";

type Stat = { icon: string; value: string; label: string };

/* ── parse "100+", "1,000+", "98%" → { num, suffix } ── */
function parseValue(v: string) {
  const cleaned = v.replace(/,/g, "");
  const m = cleaned.match(/^(\d+)(.*)$/);
  if (!m) return { num: 0, suffix: v };
  return { num: parseInt(m[1], 10), suffix: m[2] };
}

function formatNum(n: number, original: string) {
  if (original.includes(",")) return n.toLocaleString();
  return String(n);
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (num === 0) return;

    const duration = 1600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, num]);

  return (
    <>
      {inView ? formatNum(display, value) : "0"}
      {suffix}
    </>
  );
}

export function AnimatedStatBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* PC: horizontal row */}
      <section
        className="hidden md:block"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <div
          ref={ref}
          className="container-mf"
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {stats.map((s, i) => {
            const Icon = ICON_MAP[s.icon] ?? ShieldIcon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingRight: i < stats.length - 1 ? 24 : 0,
                  borderRight:
                    i < stats.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12 + 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Icon size={36} fill="var(--red-500)" />
                </motion.div>
                <div>
                  <b
                    style={{
                      display: "block",
                      font: "900 32px/36px var(--font-sans)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <CountUp value={s.value} inView={inView} />
                  </b>
                  <span
                    style={{
                      font: "500 13px/18px var(--font-sans)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ marginLeft: "auto" }}
          >
            <Link
              href="/consult"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--red-500)",
                color: "var(--on-brand)",
                borderRadius: "var(--radius-lg)",
                padding: "14px 24px",
                font: "700 15px/21px var(--font-sans)",
                textDecoration: "none",
              }}
            >
              <ChatIcon size={30} fill="#ffffff" />
              <span>
                지금 바로
                <br />
                입점 상담을 받아보세요
              </span>
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mobile: 2×2 grid */}
      <section
        className="md:hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            style={{
              padding: "18px 16px",
              borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
              borderBottom: i < 2 ? "1px solid var(--line)" : "none",
              textAlign: "center",
            }}
          >
            <b
              style={{
                display: "block",
                font: "900 26px/30px var(--font-sans)",
                letterSpacing: "-0.02em",
              }}
            >
              <CountUp value={s.value} inView={true} />
            </b>
            <span
              style={{
                font: "500 13px/18px var(--font-sans)",
                color: "var(--ink-muted)",
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </section>
    </>
  );
}
