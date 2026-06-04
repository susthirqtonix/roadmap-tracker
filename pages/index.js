"use client";
import React, { useState, useEffect } from "react";
// We use basic text arrows or simpler icons to avoid any potential icon resolution bugs on standard Pages Router compilation
import {
  CheckCircle,
  Circle,
  BarChart3,
  ListTodo,
  Award,
  RefreshCw,
  Flame,
} from "lucide-react";

const INITIAL_PHASES = [
  {
    id: 1,
    title: "PHASE 1 — JavaScript Foundations",
    tasks: [
      {
        id: "p1_1",
        text: "Variables, Scope, Hoisting & Memory Allocation",
        done: false,
      },
      {
        id: "p1_2",
        text: "ES6+ Features (Destructuring, Spread/Rest, Nullish Coalescing)",
        done: false,
      },
      { id: "p1_3", text: "Closures, Currying & Pure Functions", done: false },
      {
        id: "p1_4",
        text: "Array Methods (map, filter, reduce, sort) & Polyfills",
        done: false,
      },
      {
        id: "p1_5",
        text: "Async JS (Promises, async/await, Event Loop, Queues)",
        done: false,
      },
    ],
  },
  {
    id: 2,
    title: "PHASE 2 & 3 — React Fundamentals & Hooks",
    tasks: [
      {
        id: "p2_1",
        text: "JSX Compilation, Virtual DOM & Reconciliation",
        done: false,
      },
      {
        id: "p2_2",
        text: "State Management, Batching & Controlled Components",
        done: false,
      },
      {
        id: "p2_3",
        text: "Hooks Matrix: useState & useEffect Deep Dive",
        done: false,
      },
      {
        id: "p2_4",
        text: "Performance Hooks: useMemo & useCallback",
        done: false,
      },
      {
        id: "p2_5",
        text: "Custom Hooks Pattern (useFetch, useLocalStorage)",
        done: false,
      },
    ],
  },
  {
    id: 3,
    title: "PHASE 4 & 5 — Advanced React & Next.js Architecture",
    tasks: [
      {
        id: "p3_1",
        text: "Context API Optimization & Error Boundaries",
        done: false,
      },
      {
        id: "p3_2",
        text: "Next.js App Router, Layouts & Dynamic Routing",
        done: false,
      },
      {
        id: "p3_3",
        text: "Server vs Client Components (RSC Architecture)",
        done: false,
      },
      {
        id: "p3_4",
        text: "Data Fetching Strategies (SSR, SSG, ISR, Caching)",
        done: false,
      },
      {
        id: "p3_5",
        text: "Middleware, Authentication Flow & Advanced SEO",
        done: false,
      },
    ],
  },
  {
    id: 4,
    title: "PHASE 6 & 7 — Real Project Patterns & Practice",
    tasks: [
      {
        id: "p4_1",
        text: "System Design: Infinite Scroll, Debouncing, RBAC",
        done: false,
      },
      {
        id: "p4_2",
        text: "Coding Practice: Intermediate/Advanced Array Flattening & Clones",
        done: false,
      },
      {
        id: "p4_3",
        text: "STAR Framework preparation for 3 Production Projects",
        done: false,
      },
      {
        id: "p4_4",
        text: "Mock Interviews: JS, React, and Next.js Rounds",
        done: false,
      },
    ],
  },
];

const INITIAL_DAILY = [
  { id: "d1", text: "Theory Deep Dive (45 mins)", done: false },
  {
    id: "d2",
    text: "Coding Practice / Polyfills from scratch (90 mins)",
    done: false,
  },
  { id: "d3", text: "Interview Question Verbalization (30 mins)", done: false },
  { id: "d4", text: "Spaced Repetition Revision (15 mins)", done: false },
];

export default function Dashboard() {
  const [phases, setPhases] = useState(INITIAL_PHASES);
  const [dailyTasks, setDailyTasks] = useState(INITIAL_DAILY);
  const [activeTab, setActiveTab] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedPhases = localStorage.getItem("roadmap_phases");
    const savedDaily = localStorage.getItem("roadmap_daily");
    if (savedPhases) setPhases(JSON.parse(savedPhases));
    if (savedDaily) setDailyTasks(JSON.parse(savedDaily));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("roadmap_phases", JSON.stringify(phases));
    }
  }, [phases, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("roadmap_daily", JSON.stringify(dailyTasks));
    }
  }, [dailyTasks, mounted]);

  if (!mounted)
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-slate-400">
        Loading Architecture...
      </div>
    );

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.done).length,
    0,
  );
  const overallPercentage =
    Math.round((completedTasks / totalTasks) * 100) || 0;

  const toggleTask = (phaseId, taskId) => {
    setPhases(
      phases.map((p) =>
        p.id === phaseId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, done: !t.done } : t,
              ),
            }
          : p,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f1f5f9] antialiased">
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="border-b border-slate-800 pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20 w-fit mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />{" "}
              Target: MNC Switch
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Susthir Nahak
            </h1>
            <p className="text-slate-400 mt-1 font-medium">
              Software Engineer &bull; React & Next.js Prep
            </p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 min-w-[200px]">
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold">
              Overall Complete
            </span>
            <span className="text-3xl font-extrabold text-blue-400 mt-1 block">
              {overallPercentage}%
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111827] rounded-xl border border-slate-800/60 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="text-blue-400 w-5 h-5" />
                <h2 className="text-xl font-bold text-white">
                  Milestone Phases
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-6">
                {phases.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all uppercase ${
                      activeTab === p.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}
                  >
                    Phase {p.id}
                  </button>
                ))}
              </div>

              {phases
                .filter((p) => p.id === activeTab)
                .map((phase) => (
                  <div key={phase.id} className="space-y-4">
                    <div className="space-y-2">
                      {phase.tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(phase.id, task.id)}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                            task.done
                              ? "bg-slate-900/30 border-emerald-500/20 text-slate-400"
                              : "bg-slate-900/70 border-slate-800 text-slate-200"
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {task.done ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600" />
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${task.done ? "line-through text-slate-500" : ""}`}
                          >
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-xl border border-slate-800/60 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ListTodo className="text-indigo-400 w-5 h-5" />
                  <h2 className="text-xl font-bold text-white">Daily Engine</h2>
                </div>
                <button
                  onClick={() =>
                    setDailyTasks(
                      dailyTasks.map((t) => ({ ...t, done: false })),
                    )
                  }
                  className="p-1.5 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-400"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {dailyTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() =>
                      setDailyTasks(
                        dailyTasks.map((item) =>
                          item.id === t.id
                            ? { ...item, done: !item.done }
                            : item,
                        ),
                      )
                    }
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                      t.done
                        ? "bg-emerald-950/10 border-emerald-500/20 text-slate-400"
                        : "bg-slate-900/50 border-slate-800 text-slate-200"
                    }`}
                  >
                    {t.done ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${t.done ? "line-through text-slate-500" : ""}`}
                    >
                      {t.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-blue-950/40 border border-slate-800/80 rounded-xl p-6 text-center shadow-xl">
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-bold text-base">
                Consistency &gt; Intensity
              </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
