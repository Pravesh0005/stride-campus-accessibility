"use client"

import { useState, useRef, useEffect } from "react"
import {
  Compass,
  RotateCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Satellite,
  Eye
} from "lucide-react"

const tourScenes = [
  {
    id: "block-34",
    name: "Block 34 (School of CSE) Central Plaza",
    category: "Academic",
    description: "The primary 8-story computing hub housing computer science lecture complexes, data centers, and the high-traffic central plaza.",
    accent: "#7C3AED",
    heading: 45,
    skyGradient: "from-sky-700 via-indigo-900 to-slate-950",
    groundColor: "#1E293B",
    architectureStyle: "Glass Facade Tower",
    hotspots: [
      { id: "h1", x: 28, y: 55, title: "North Ramp Entrance", desc: "Grade 1:12 certified, step-free access to ground floor", status: "accessible" },
      { id: "h2", x: 48, y: 50, title: "Central Elevator Lobby", desc: "Dual 16-passenger lifts, audible floor announcers", status: "accessible" },
      { id: "h3", x: 74, y: 62, title: "Food Kiosk Pathway", desc: "Wide concrete paved sidewalk connecting to Block 32", status: "accessible" }
    ]
  },
  {
    id: "unimall",
    name: "UniMall Central Atrium & Commercial Plaza",
    category: "Commercial / Dining",
    description: "4-story shopping, grocery, stationery, and food court complex serving 30,000+ students daily.",
    accent: "#0D9488",
    heading: 120,
    skyGradient: "from-teal-800 via-slate-900 to-slate-950",
    groundColor: "#0F172A",
    architectureStyle: "4-Tier Atrium",
    hotspots: [
      { id: "h4", x: 35, y: 48, title: "Main Automatic Sliding Entry", desc: "Zero-threshold flat sliding entrance", status: "accessible" },
      { id: "h5", x: 55, y: 44, title: "Glass Panoramic Elevator", desc: "Priority access for wheelchair users and staff", status: "accessible" },
      { id: "h6", x: 80, y: 58, title: "Basement Ramp Delivery Bay", desc: "Caution: Heavy delivery trollies occasionally block ramp", status: "warning" }
    ]
  },
  {
    id: "block-30",
    name: "Block 30 (Central Library Resource Centre)",
    category: "Library",
    description: "Multi-floor state-of-the-art reference library with 1.5 million volumes, digital research zones, and audio-book facilities.",
    accent: "#2563EB",
    heading: 10,
    skyGradient: "from-blue-800 via-indigo-950 to-slate-950",
    groundColor: "#1E1B4B",
    architectureStyle: "Pillared Classical Portico",
    hotspots: [
      { id: "h7", x: 30, y: 52, title: "Tactile Paver Pathway", desc: "Continuous yellow directional tiles from main walkway", status: "accessible" },
      { id: "h8", x: 50, y: 46, title: "East Barrier-Free Ramp", desc: "Equipped with dual-height stainless steel handrails", status: "accessible" },
      { id: "h9", x: 70, y: 56, title: "Digital Reading Lounge", desc: "Adjustable height computer tables available on Level 1", status: "accessible" }
    ]
  },
  {
    id: "unipolis",
    name: "Baldev Raj Mittal Unipolis",
    category: "Event Arena",
    description: "Iconic covered convocation ground spanning thousands of square meters, hosting youth festivals and presidential addresses.",
    accent: "#D97706",
    heading: 180,
    skyGradient: "from-amber-900 via-slate-900 to-slate-950",
    groundColor: "#18181B",
    architectureStyle: "Tensile Membrane Canopy",
    hotspots: [
      { id: "h10", x: 25, y: 60, title: "Perimeter Accessible Walkway", desc: "Smooth asphalt connection from UniMall to Unipolis", status: "accessible" },
      { id: "h11", x: 50, y: 50, title: "VIP / Wheelchair Seating Bay", desc: "Designated floor area with unobstructed stage sightlines", status: "accessible" }
    ]
  },
  {
    id: "uni-hospital",
    name: "Uni-Hospital (24/7 University Health Centre)",
    category: "Medical",
    description: "Full-service campus hospital with emergency care, physical therapy rehabilitation, pharmacy, and diagnostic imaging.",
    accent: "#059669",
    heading: 90,
    skyGradient: "from-emerald-800 via-teal-950 to-slate-950",
    groundColor: "#064E3B",
    architectureStyle: "Modern Healthcare Complex",
    hotspots: [
      { id: "h12", x: 30, y: 50, title: "Emergency Ambulance Bay", desc: "Zero-step stretcher and gurney transfer zone", status: "accessible" },
      { id: "h13", x: 52, y: 46, title: "Automatic Double-Wide Doors", desc: "36-inch clear door clearance for wheelchairs", status: "accessible" },
      { id: "h14", x: 75, y: 52, title: "Physiotherapy Rehab Suite", desc: "Accessible therapy pool and parallel mobility bars", status: "accessible" }
    ]
  },
  {
    id: "gate-1",
    name: "Main Gate 1 (GT Road National Highway)",
    category: "Entrance",
    description: "The grand ceremonial entrance of LPU on NH-1 facing the Delhi-Amritsar national highway with shuttle terminals.",
    accent: "#DC2626",
    heading: 0,
    skyGradient: "from-red-950 via-slate-900 to-slate-950",
    groundColor: "#0F172A",
    architectureStyle: "Grand Roman Gateway",
    hotspots: [
      { id: "h15", x: 30, y: 56, title: "Pedestrian Security Turnstile", desc: "Wide accessible lane available beside motorized turnstile", status: "accessible" },
      { id: "h16", x: 60, y: 54, title: "E-Rickshaw Fleet Stand", desc: "Low-floor boarding platform for internal campus shuttles", status: "accessible" }
    ]
  },
  {
    id: "indoor-sports",
    name: "Indoor Sports Complex & Olympic Pool",
    category: "Recreation",
    description: "State-of-the-art sports arena featuring multi-court wooden badminton halls, squash courts, gymnastics center, and swimming pool.",
    accent: "#6366F1",
    heading: 270,
    skyGradient: "from-indigo-900 via-slate-900 to-slate-950",
    groundColor: "#1E1B4B",
    architectureStyle: "High-Span Sports Arena",
    hotspots: [
      { id: "h17", x: 35, y: 52, title: "Main Concourse Ramp", desc: "Broad ramp leading from parking to spectator stands", status: "accessible" },
      { id: "h18", x: 70, y: 58, title: "Pool Hoist Transfer Point", desc: "Notice: Aquatic lift currently awaiting hydraulic seal service", status: "warning" }
    ]
  },
  {
    id: "bh-1",
    name: "Boys Hostel 1 (BH-1) Quadrangle",
    category: "Residential",
    description: "One of LPU's foundational residential complexes housing undergraduate engineering and sciences scholars.",
    accent: "#4F46E5",
    heading: 210,
    skyGradient: "from-violet-950 via-slate-900 to-slate-950",
    groundColor: "#18181B",
    architectureStyle: "Courtyard Residence",
    hotspots: [
      { id: "h19", x: 40, y: 54, title: "Ground Floor Accessible Rooms", desc: "Lowered light switches and roll-in private shower", status: "accessible" },
      { id: "h20", x: 65, y: 52, title: "Mess Hall Entrance", desc: "Step-free ramped doorway into dining quad", status: "accessible" }
    ]
  }
]

export default function Campus360Viewer({ initialScene = "block-34" }) {
  const [currentSceneId, setCurrentSceneId] = useState(initialScene)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [activeViewMode, setActiveViewMode] = useState("360")
  const viewerRef = useRef(null)

  const scene = tourScenes.find(s => s.id === currentSceneId) || tourScenes[0]

  useEffect(() => {
    if (!autoRotate || isDragging) return
    const interval = setInterval(() => {
      setPanX(prev => (prev + 0.15) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [autoRotate, isDragging])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - panX * 4, y: e.clientY - panY * 4 })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newX = (e.clientX - dragStart.x) / 4
    const newY = Math.max(-25, Math.min(25, (e.clientY - dragStart.y) / 4))
    setPanX(newX)
    setPanY(newY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX - panX * 4, y: e.touches[0].clientY - panY * 4 })
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return
    const newX = (e.touches[0].clientX - dragStart.x) / 4
    const newY = Math.max(-25, Math.min(25, (e.touches[0].clientY - dragStart.y) / 4))
    setPanX(newX)
    setPanY(newY)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const compassHeading = Math.round(((panX % 360) + 360) % 360)

  const nextScene = () => {
    const idx = tourScenes.findIndex(s => s.id === scene.id)
    const next = tourScenes[(idx + 1) % tourScenes.length]
    setCurrentSceneId(next.id)
    setActiveHotspot(null)
  }

  const prevScene = () => {
    const idx = tourScenes.findIndex(s => s.id === scene.id)
    const prev = tourScenes[(idx - 1 + tourScenes.length) % tourScenes.length]
    setCurrentSceneId(prev.id)
    setActiveHotspot(null)
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
      
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-violet-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-white">LPU 360° Virtual Campus Navigator</h2>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-extrabold border border-teal-500/30">
                3D VR Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">Drag to inspect facility ramps, lifts, and barrier-free pathways</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs font-bold">
            <button
              onClick={() => setActiveViewMode("360")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeViewMode === "360"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive 360°</span>
            </button>
            <button
              onClick={() => setActiveViewMode("satellite")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeViewMode === "satellite"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Google 3D Satellite</span>
            </button>
          </div>

          <a
            href="https://www.lpu.in/virtual-tour/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
          >
            <span>Official LPU Tour</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Quick Jump:
        </span>
        {tourScenes.map(sc => (
          <button
            key={sc.id}
            onClick={() => {
              setCurrentSceneId(sc.id)
              setActiveHotspot(null)
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              scene.id === sc.id
                ? "bg-violet-600 text-white shadow-xs"
                : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
            }`}
          >
            {sc.name.split(" ")[0]} {sc.name.split(" ")[1] || ""}
          </button>
        ))}
      </div>

      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-black select-none">
        
        {activeViewMode === "satellite" ? (
          <div className="w-full h-full relative">
            <iframe
              src="https://maps.google.com/maps?q=Lovely%20Professional%20University%2C%20Phagwara&t=k&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              title="LPU 3D Satellite Map"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Google 3D Satellite Imagery • Lovely Professional University, Phagwara</span>
            </div>
          </div>
        ) : (
          <div
            ref={viewerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
            style={{
              perspective: "1000px"
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b ${scene.skyGradient} transition-colors duration-700`}
            />

            <div
              className="absolute inset-x-0 bottom-0 h-1/2 border-t border-slate-700/40"
              style={{ backgroundColor: scene.groundColor }}
            />

            <div
              className="absolute inset-0 transition-transform duration-75 ease-out"
              style={{
                transform: `rotateY(${panX}deg) rotateX(${-panY}deg) scale(${zoom})`,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[180%] h-[120%] opacity-30 blur-sm rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${scene.accent}44 0%, transparent 70%)`
                  }}
                />
              </div>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 120px)"
                }}
              />

              <div className="absolute top-1/3 inset-x-0 h-40 flex items-center justify-around pointer-events-none opacity-20">
                <div className="w-48 h-64 bg-slate-100/10 rounded-2xl border border-white/20" />
                <div className="w-64 h-80 bg-slate-100/10 rounded-2xl border border-white/20" />
                <div className="w-56 h-72 bg-slate-100/10 rounded-2xl border border-white/20" />
                <div className="w-48 h-64 bg-slate-100/10 rounded-2xl border border-white/20" />
              </div>

              <div className="absolute inset-0">
                {scene.hotspots.map(h => {
                  const isActive = activeHotspot === h.id
                  const leftPercent = ((h.x + (panX * 0.4)) % 100 + 100) % 100
                  const topPercent = Math.max(20, Math.min(80, h.y + panY * 0.3))

                  return (
                    <div
                      key={h.id}
                      style={{
                        position: "absolute",
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                        transform: "translate(-50%, -50%)"
                      }}
                      className="pointer-events-auto z-20 group"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveHotspot(isActive ? null : h.id)
                        }}
                        className={`p-2.5 rounded-2xl shadow-xl transition-all duration-300 flex items-center gap-2 ${
                          h.status === "accessible"
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white ring-4 ring-emerald-500/30"
                            : "bg-amber-600 hover:bg-amber-500 text-white ring-4 ring-amber-500/30"
                        } ${isActive ? "scale-110" : "scale-100 hover:scale-105"}`}
                      >
                        {h.status === "accessible" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <span className="text-xs font-bold whitespace-nowrap">{h.title}</span>
                      </button>

                      {isActive && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-2xl text-left z-30">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-white">{h.title}</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                              h.status === "accessible" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                            }`}>
                              {h.status === "accessible" ? "✓ Accessible" : "⚠ Notice"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{h.desc}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

            </div>

            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-3xl border border-slate-800 text-white max-w-sm shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-[10px] font-bold border border-violet-500/30">
                    {scene.category}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-300">{scene.architectureStyle}</span>
                </div>
                <h3 className="text-base font-black text-white leading-tight">{scene.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{scene.description}</p>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <div className="px-3 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xl">
                <Compass className="w-4 h-4 text-teal-400" />
                <span>{compassHeading}° N</span>
              </div>

              <div className="flex bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 p-1 flex-col gap-1 shadow-xl">
                <button
                  onClick={() => setZoom(z => Math.min(1.8, z + 0.15))}
                  title="Zoom In"
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(z => Math.max(0.7, z - 0.15))}
                  title="Zoom Out"
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setAutoRotate(r => !r)}
                  title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
                  className={`p-2 rounded-xl transition-colors ${
                    autoRotate ? "bg-violet-600 text-white" : "hover:bg-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="absolute inset-y-0 left-3 flex items-center z-10">
              <button
                onClick={prevScene}
                aria-label="Previous Facility"
                className="w-10 h-10 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white flex items-center justify-center hover:bg-violet-600 transition-all shadow-xl active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute inset-y-0 right-3 flex items-center z-10">
              <button
                onClick={nextScene}
                aria-label="Next Facility"
                className="w-10 h-10 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white flex items-center justify-center hover:bg-violet-600 transition-all shadow-xl active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Drag to pan 360° • Click green pins to view ramp audit</span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-300">
                  {scene.hotspots.length} Inspected Points
                </span>
              </div>
            </div>

          </div>
        )}

      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Currently Viewing:</span>
          <span className="font-bold text-white">{scene.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevScene}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
          >
            ← Previous Block
          </button>
          <button
            onClick={nextScene}
            className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-sm"
          >
            Next Block →
          </button>
        </div>
      </div>

    </div>
  )
}
