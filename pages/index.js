"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Circle, BarChart3, ListTodo, Award, RefreshCw, Flame, Zap, Target, TrendingUp } from "lucide-react";

const INITIAL_PHASES = [
  {
    id: 1,
    title: "JS Foundations",
    color: "phase-1",
    accent: "#f97316",
    bg: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/30",
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    tasks: [
      { id: "p1_1", text: "Variables, Scope, Hoisting & Memory Allocation", done: false },
      { id: "p1_2", text: "ES6+ Features (Destructuring, Spread/Rest, Nullish Coalescing)", done: false },
      { id: "p1_3", text: "Closures, Currying & Pure Functions", done: false },
      { id: "p1_4", text: "Array Methods (map, filter, reduce, sort) & Polyfills", done: false },
      { id: "p1_5", text: "Async JS (Promises, async/await, Event Loop, Queues)", done: false },
    ],
  },
  {
    id: 2,
    title: "React & Hooks",
    color: "phase-2",
    accent: "#06b6d4",
    bg: "from-cyan-500/20 to-sky-500/10",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    tasks: [
      { id: "p2_1", text: "JSX Compilation, Virtual DOM & Reconciliation", done: false },
      { id: "p2_2", text: "State Management, Batching & Controlled Components", done: false },
      { id: "p2_3", text: "Hooks Matrix: useState & useEffect Deep Dive", done: false },
      { id: "p2_4", text: "Performance Hooks: useMemo & useCallback", done: false },
      { id: "p2_5", text: "Custom Hooks Pattern (useFetch, useLocalStorage)", done: false },
    ],
  },
  {
    id: 3,
    title: "Advanced & Next.js",
    color: "phase-3",
    accent: "#a855f7",
    bg: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/30",
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    tasks: [
      { id: "p3_1", text: "Context API Optimization & Error Boundaries", done: false },
      { id: "p3_2", text: "Next.js App Router, Layouts & Dynamic Routing", done: false },
      { id: "p3_3", text: "Server vs Client Components (RSC Architecture)", done: false },
      { id: "p3_4", text: "Data Fetching Strategies (SSR, SSG, ISR, Caching)", done: false },
      { id: "p3_5", text: "Middleware, Authentication Flow & Advanced SEO", done: false },
    ],
  },
  {
    id: 4,
    title: "Real-World Patterns",
    color: "phase-4",
    accent: "#10b981",
    bg: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    tasks: [
      { id: "p4_1", text: "System Design: Infinite Scroll, Debouncing, RBAC", done: false },
      { id: "p4_2", text: "Coding Practice: Array Flattening & Deep Clones", done: false },
      { id: "p4_3", text: "STAR Framework preparation for 3 Production Projects", done: false },
      { id: "p4_4", text: "Mock Interviews: JS, React, and Next.js Rounds", done: false },
    ],
  },
];

const INITIAL_DAILY = [
  { id: "d1", text: "Theory Deep Dive", sub: "45 mins", icon: "📚", done: false },
  { id: "d2", text: "Coding Practice / Polyfills", sub: "90 mins", icon: "⚡", done: false },
  { id: "d3", text: "Interview Question Verbalization", sub: "30 mins", icon: "🎤", done: false },
  { id: "d4", text: "Spaced Repetition Revision", sub: "15 mins", icon: "🔁", done: false },
];

export default function Dashboard() {
  const [phases, setPhases] = useState(INITIAL_PHASES);
  const [dailyTasks, setDailyTasks] = useState(INITIAL_DAILY);
  const [activeTab, setActiveTab] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedPhases = localStorage.getItem("roadmap_phases_v2");
      const savedDaily = localStorage.getItem("roadmap_daily_v2");
      if (savedPhases) setPhases(JSON.parse(savedPhases));
      if (savedDaily) setDailyTasks(JSON.parse(savedDaily));
    } catch (e) {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("roadmap_phases_v2", JSON.stringify(phases));
      } catch (e) {}
    }
  }, [phases, mounted]);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("roadmap_daily_v2", JSON.stringify(dailyTasks));
      } catch (e) {}
    }
  }, [dailyTasks, mounted]);

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = phases.reduce((acc, p) => acc + p.tasks.filter((t) => t.done).length, 0);
  const overallPct = Math.round((completedTasks / totalTasks) * 100) || 0;

  const toggleTask = (phaseId, taskId) => {
    setPhases(phases.map((p) =>
      p.id === phaseId
        ? { ...p, tasks: p.tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t) }
        : p
    ));
  };

  const activePhase = phases.find((p) => p.id === activeTab);
  const phasePct = activePhase
    ? Math.round((activePhase.tasks.filter((t) => t.done).length / activePhase.tasks.length) * 100) || 0
    : 0;

  const dailyDone = dailyTasks.filter((t) => t.done).length;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#080c14", minHeight: "100vh", color: "#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080c14; }
        .dash-root { font-family: 'DM Sans', sans-serif; }
        .heading-font { font-family: 'Syne', sans-serif; }

        .card { background: rgba(15,21,35,0.9); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; backdrop-filter: blur(10px); }
        .card-glow-orange { box-shadow: 0 0 40px rgba(249,115,22,0.08); }
        .card-glow-cyan { box-shadow: 0 0 40px rgba(6,182,212,0.08); }
        .card-glow-purple { box-shadow: 0 0 40px rgba(168,85,247,0.08); }
        .card-glow-green { box-shadow: 0 0 40px rgba(16,185,129,0.08); }

        .tab-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; border-radius: 10px; padding: 8px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s; text-transform: uppercase; font-family: 'DM Sans', sans-serif; }
        .tab-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }

        .task-row { border-radius: 10px; padding: 12px 14px; cursor: pointer; display: flex; align-items: flex-start; gap: 10px; transition: all 0.2s; border: 1px solid transparent; user-select: none; }
        .task-row:hover { transform: translateX(3px); }
        .task-undone { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.07); }
        .task-done { background: rgba(16,185,129,0.06); border-color: rgba(16,185,129,0.2); }

        .daily-row { border-radius: 12px; padding: 12px 14px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.18s; border: 1px solid transparent; user-select: none; }
        .daily-row:hover { transform: scale(1.01); }
        .daily-undone { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.07); }
        .daily-done { background: rgba(16,185,129,0.07); border-color: rgba(16,185,129,0.22); }

        .progress-track { background: rgba(255,255,255,0.07); border-radius: 99px; height: 6px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; transition: width 0.5s ease; }

        .stat-card { border-radius: 14px; padding: 18px 20px; border: 1px solid rgba(255,255,255,0.07); }

        .badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; border: 1px solid; text-transform: uppercase; }

        .top-bar { height: 3px; width: 100%; background: linear-gradient(90deg, #f97316, #f59e0b, #06b6d4, #a855f7, #10b981); }

        .glow-text-orange { color: #fb923c; text-shadow: 0 0 20px rgba(249,115,22,0.4); }
        .glow-text-cyan { color: #22d3ee; text-shadow: 0 0 20px rgba(6,182,212,0.4); }
        .glow-text-purple { color: #c084fc; text-shadow: 0 0 20px rgba(168,85,247,0.4); }
        .glow-text-green { color: #34d399; text-shadow: 0 0 20px rgba(16,185,129,0.4); }

        .phase-num { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; font-family: 'Syne', sans-serif; flex-shrink: 0; }

        @keyframes pulse-ring { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.08)} }
        .pulse { animation: pulse-ring 2s ease-in-out infinite; }

        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .shimmer-bar { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }

        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0; }

        .scroll-area { overflow-y: auto; }
        .scroll-area::-webkit-scrollbar { width: 4px; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        @media (max-width: 768px) {
          .grid-main { grid-template-columns: 1fr !important; }
          .header-row { flex-direction: column !important; align-items: flex-start !important; }
          .stat-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className="top-bar" />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* Header */}
        <div className="header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, gap: 20, flexWrap: "wrap" }}>
          <div>
            <div className="badge" style={{ background: "rgba(249,115,22,0.12)", color: "#fb923c", borderColor: "rgba(249,115,22,0.3)", marginBottom: 12 }}>
              <Flame style={{ width: 11, height: 11 }} className="pulse" /> Target: MNC Switch
            </div>
            <h1 className="heading-font" style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Susthir Nahak
            </h1>
            <p style={{ color: "#64748b", marginTop: 6, fontSize: 14, fontWeight: 500 }}>
              Software Engineer &nbsp;·&nbsp; React & Next.js Interview Prep
            </p>
          </div>

          {/* Overall ring */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 24px" }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6"/>
              <circle cx="32" cy="32" r="26" fill="none"
                stroke="url(#ring-grad)" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - overallPct / 100)}`}
                transform="rotate(-90 32 32)"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06b6d4"/>
                  <stop offset="100%" stopColor="#a855f7"/>
                </linearGradient>
              </defs>
              <text x="32" y="37" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Syne, sans-serif">{overallPct}%</text>
            </svg>
            <div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Overall</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif" }}>{completedTasks}/{totalTasks}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>tasks done</div>
            </div>
          </div>
        </div>

        {/* Stat Row */}
        <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "JS Foundations", val: phases[0].tasks.filter(t=>t.done).length, total: 5, color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
            { label: "React & Hooks", val: phases[1].tasks.filter(t=>t.done).length, total: 5, color: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)" },
            { label: "Next.js", val: phases[2].tasks.filter(t=>t.done).length, total: 5, color: "#a855f7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
            { label: "Real-World", val: phases[3].tasks.filter(t=>t.done).length, total: 4, color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "Syne, sans-serif", lineHeight: 1 }}>{s.val}<span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>/{s.total}</span></div>
              <div className="progress-track" style={{ marginTop: 8 }}>
                <div className="progress-fill" style={{ width: `${Math.round(s.val/s.total*100)}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid-main" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "start" }}>

          {/* Left: Phase Tracker */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "22px 24px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <TrendingUp style={{ width: 18, height: 18, color: "#06b6d4" }} />
                <span className="heading-font" style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Milestone Phases</span>
                {activePhase && (
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                    Phase {activePhase.id} — <span style={{ color: activePhase.accent }}>{phasePct}%</span>
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {phases.map((p) => (
                  <button
                    key={p.id}
                    className="tab-btn"
                    onClick={() => setActiveTab(p.id)}
                    style={activeTab === p.id ? { background: p.accent, borderColor: p.accent, color: "#fff", boxShadow: `0 4px 16px ${p.accent}40` } : {}}
                  >
                    <span style={{ opacity: 0.6, marginRight: 4 }}>0{p.id}</span>{p.title}
                  </button>
                ))}
              </div>

              {/* Phase progress bar */}
              {activePhase && (
                <div className="progress-track" style={{ marginBottom: 0 }}>
                  <div className="progress-fill" style={{ width: `${phasePct}%`, background: `linear-gradient(90deg, ${activePhase.accent}, ${activePhase.accent}aa)` }} />
                </div>
              )}
            </div>

            <div className="divider" style={{ margin: "18px 0 0" }} />

            {/* Tasks */}
            <div className="scroll-area" style={{ padding: "18px 24px 24px", maxHeight: 400 }}>
              {activePhase && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {activePhase.tasks.map((task, i) => (
                    <div
                      key={task.id}
                      className={`task-row ${task.done ? "task-done" : "task-undone"}`}
                      onClick={() => toggleTask(activePhase.id, task.id)}
                    >
                      <div style={{ paddingTop: 2, flexShrink: 0 }}>
                        {task.done
                          ? <CheckCircle style={{ width: 16, height: 16, color: "#34d399" }} />
                          : <Circle style={{ width: 16, height: 16, color: "#334155" }} />
                        }
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, color: "#475569", fontWeight: 700, minWidth: 20 }}>#{String(i+1).padStart(2,"0")}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: task.done ? "#475569" : "#e2e8f0", textDecoration: task.done ? "line-through" : "none", lineHeight: 1.4 }}>
                            {task.text}
                          </span>
                        </div>
                      </div>
                      {task.done && (
                        <span style={{ fontSize: 10, color: "#34d399", background: "rgba(52,211,153,0.12)", padding: "2px 8px", borderRadius: 99, fontWeight: 700, flexShrink: 0 }}>DONE</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Daily Engine */}
            <div className="card" style={{ padding: "20px 20px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Zap style={{ width: 17, height: 17, color: "#fbbf24" }} />
                  <span className="heading-font" style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>Daily Engine</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 700 }}>{dailyDone}/4</span>
                  <button
                    onClick={() => setDailyTasks(dailyTasks.map((t) => ({ ...t, done: false })))}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 7px", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}
                    title="Reset daily tasks"
                  >
                    <RefreshCw style={{ width: 13, height: 13 }} />
                  </button>
                </div>
              </div>

              {/* Daily progress */}
              <div className="progress-track" style={{ marginBottom: 14 }}>
                <div className="progress-fill" style={{ width: `${dailyDone/4*100}%`, background: "linear-gradient(90deg, #fbbf24, #f59e0b)" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {dailyTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`daily-row ${t.done ? "daily-done" : "daily-undone"}`}
                    onClick={() => setDailyTasks(dailyTasks.map((item) => item.id === t.id ? { ...item, done: !item.done } : item))}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{t.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.done ? "#475569" : "#e2e8f0", textDecoration: t.done ? "line-through" : "none" }}>{t.text}</div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{t.sub}</div>
                    </div>
                    {t.done ? <CheckCircle style={{ width: 15, height: 15, color: "#34d399", flexShrink: 0 }} /> : <Circle style={{ width: 15, height: 15, color: "#1e293b", flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Card */}
            <div style={{ borderRadius: 16, padding: "20px", background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(6,182,212,0.15) 100%)", border: "1px solid rgba(168,85,247,0.2)", textAlign: "center" }}>
              <Award style={{ width: 28, height: 28, color: "#fbbf24", margin: "0 auto 10px" }} />
              <div className="heading-font" style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Consistency &gt; Intensity</div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Every task compounds. Keep shipping.</div>
            </div>

            {/* Phase Overview mini list */}
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Phase Overview</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {phases.map((p) => {
                  const done = p.tasks.filter(t => t.done).length;
                  const pct = Math.round(done / p.tasks.length * 100);
                  return (
                    <div key={p.id} style={{ cursor: "pointer" }} onClick={() => setActiveTab(p.id)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="phase-num" style={{ background: `${p.accent}18`, color: p.accent }}>0{p.id}</div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: activeTab === p.id ? "#fff" : "#94a3b8" }}>{p.title}</span>
                        </div>
                        <span style={{ fontSize: 11, color: p.accent, fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${pct}%`, background: p.accent }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
