"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  MapPin,
  ShieldAlert,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Compass,
  Footprints,
  ChevronRight,
  ShieldCheck,
  Building,
  Route as RouteIcon,
  Eye
} from "lucide-react"

const stats = [
  { label: "Buildings Mapped", value: "52", sub: "Complete LPU campus blocks" },
  { label: "Accessible Corridors", value: "70+", sub: "Verified step-free paths" },
  { label: "Campus Access Score", value: "72%", sub: "Audited across 600+ acres" },
  { label: "Live Barrier Alerts", value: "24/7", sub: "Crowdsourced by students" },
]

const features = [
  {
    icon: RouteIcon,
    title: "Barrier-Free Route Finder",
    desc: "Calculates the smoothest paths across 600+ acres using Dijkstra's algorithm, automatically avoiding steep steps, broken elevators, and locked gates.",
    gradient: "from-violet-600 to-indigo-600",
    badge: "Dijkstra Engine"
  },
  {
    icon: ShieldAlert,
    title: "Instant Barrier Reporting",
    desc: "Encountered a sudden construction ditch, broken elevator in Block 34, or unramped kerb? Report it in seconds so fellow students get rerouted.",
    gradient: "from-red-500 to-rose-600",
    badge: "Student Network"
  },
  {
    icon: BarChart3,
    title: "Building Accessibility Index",
    desc: "Comprehensive scorecards for every block detailing working elevators, tactile ground indicators, ramp angles, and accessible washrooms.",
    gradient: "from-teal-500 to-emerald-600",
    badge: "52 Blocks Audited"
  },
]

const steps = [
  {
    step: "01",
    title: "Choose Origin & Destination",
    desc: "Select your current location and target lecture hall or lab from the 52 mapped campus blocks."
  },
  {
    step: "02",
    title: "Review Verified Route",
    desc: "View step-by-step navigation with gradient slope warnings, distance meters, and elevator status."
  },
  {
    step: "03",
    title: "Contribute Live Updates",
    desc: "Flag temporary obstacles to protect fellow students with mobility, vision, or sensory constraints."
  }
]

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("accessible")

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  const currentSimulation = useMemo(() => {
    if (activeTab === "accessible") {
      return {
        distance: "180m",
        time: "3 mins",
        barriers: "0 Blocks",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        pathText: "Central Plaza Pathway past Block 55 (180m)",
        pathDesc: "100% wide concrete sidewalk, zero kerbs, tactile indicators installed",
        destNote: "North Ramp Entrance • Automatic sliding doors",
        destGrade: "Grade 1:12 OK"
      }
    }
    return {
      distance: "120m",
      time: "2 mins",
      barriers: "2 Steep Steps",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      pathText: "Sunken Garden Staircase Cut (120m)",
      pathDesc: "14 outdoor concrete steps without wheelchair handrail",
      destNote: "East Stepped Entrance • High 6-inch threshold",
      destGrade: "Inaccessible"
    }
  }, [activeTab])

  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-50">
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-violet-100/50 via-teal-50/30 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/80 border border-violet-200 text-violet-800 text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot shrink-0" />
                  <span>Lovely Professional University • Campus Accessibility Network</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]"
              >
                The Ramp Shouldn't End at a <span className="gradient-text">Step.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-600 leading-relaxed max-w-2xl"
              >
                On a sprawling 600-acre university campus, accessible routes often fail due to sudden kerbs, locked elevators, and unramped bridges.
                <strong className="text-slate-800 font-semibold"> Stride</strong> maps 50+ academic blocks, hostels, and amenities at Lovely Professional University to guarantee barrier-free mobility for everyone.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3.5 pt-2"
              >
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore 52 Campus Blocks</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/tour"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100/80 text-teal-800 font-bold text-sm border border-teal-200 transition-all duration-200"
                >
                  <Eye className="w-4 h-4 text-teal-600" />
                  <span>360° VR Tour</span>
                </Link>

                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>Report a Barrier</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-2"
              >
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 hover:text-violet-800 hover:underline"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Building Audit Scores</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>52 Blocks Mapped</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Dijkstra Shortest Path</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>BH & GH Hostels Connected</span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                <div className="relative rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Live Route Simulation
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => handleTabChange("accessible")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeTab === "accessible"
                            ? "bg-white text-violet-700 shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Accessible
                      </button>
                      <button
                        onClick={() => handleTabChange("shortcut")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeTab === "shortcut"
                            ? "bg-white text-amber-700 shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Shortcut
                      </button>
                    </div>
                  </div>

                  <div className="py-5 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        B34
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">Block 34 (School of CSE)</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${currentSimulation.color}`}>
                            {currentSimulation.destGrade}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {currentSimulation.destNote}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-4 ml-4 border-l-2 border-dashed border-teal-300 py-1 space-y-2">
                      <div className="text-xs font-semibold text-teal-800 flex items-center gap-1.5">
                        <Footprints className="w-3.5 h-3.5 text-teal-600" />
                        <span>{currentSimulation.pathText}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {currentSimulation.pathDesc}
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        MALL
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">UniMall (Student Hub)</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Lift Working ✓
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Ground floor atrium • Central elevator working
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400">Distance</div>
                      <div className="text-sm font-black text-slate-900">{currentSimulation.distance}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400">Est. Time</div>
                      <div className="text-sm font-black text-slate-900">{currentSimulation.time}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400">Barriers</div>
                      <div className="text-sm font-black text-emerald-600">{currentSimulation.barriers}</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-900 leading-snug">
                      <strong>LPU Campus Alert:</strong> Block 4 mechanical lab elevator is undergoing scheduled maintenance. Wheelchair users redirected to Block 32 connector.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Designed for LPU's 600-Acre Campus <span className="gradient-text">Movement</span>
            </h2>
            <p className="text-sm text-slate-500">
              From Gate 1 (GT Road) all the way to BH-8, GH-6, and UniMall, Stride calculates step-free routes that respect real-world campus constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.gradient} text-white flex items-center justify-center shadow-md`}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>

                <Link
                  href="/explore"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-800 group"
                >
                  <span>View in interactive map</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">User Journey</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Students Navigate with Stride
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, idx) => (
              <div key={idx} className="relative rounded-3xl p-8 border border-slate-100 bg-slate-50/50 space-y-4">
                <span className="text-4xl font-black text-slate-200 tracking-tighter block">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold">
            <span>LPU Campus Accessibility Initiative</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
            Help Us Build a Campus Where Every Student Can Move Freely.
          </h2>

          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Stride is fully open and powered by real student audits. Explore current building scores, calculate safe routes between classes, or report a barrier you encountered today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/explore"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all"
            >
              Start Navigating Campus
            </Link>
            <Link
              href="/report"
              className="px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all"
            >
              Report a Barrier
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
