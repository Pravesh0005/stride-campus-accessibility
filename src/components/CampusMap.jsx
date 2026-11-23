"use client"

import { useState, useCallback, useMemo } from "react"
import { buildings, routes } from "@/lib/campusData"
import { ShieldCheck, AlertTriangle, Layers, Navigation, ZoomIn, ZoomOut, RotateCcw, Satellite, MapPin } from "lucide-react"

export default function CampusMap({ selectedBuilding, onBuildingSelect, highlightedPath }) {
  const [hoveredBuilding, setHoveredBuilding] = useState(null)
  const [filterType, setFilterType] = useState("all")
  const [mapMode, setMapMode] = useState("network")

  const isOnPath = useCallback((buildingId) => {
    if (!highlightedPath || !highlightedPath.path) return false
    return highlightedPath.path.includes(buildingId)
  }, [highlightedPath])

  const isRouteOnPath = useCallback((fromId, toId) => {
    if (!highlightedPath || !highlightedPath.path) return false
    const path = highlightedPath.path
    for (let i = 0; i < path.length - 1; i++) {
      if ((path[i] === fromId && path[i + 1] === toId) ||
          (path[i] === toId && path[i + 1] === fromId)) {
        return true
      }
    }
    return false
  }, [highlightedPath])

  const hovered = useMemo(() => {
    if (!hoveredBuilding) return null
    return buildings.find(b => b.id === hoveredBuilding) || null
  }, [hoveredBuilding])

  const getBuildingLabel = useCallback((b) => {
    if (b.id.startsWith("block-")) return `B${b.id.replace("block-", "")}`
    if (b.id.startsWith("bh-")) return b.id.toUpperCase()
    if (b.id.startsWith("gh-")) return b.id.toUpperCase()
    if (b.id === "unimall") return "MALL"
    if (b.id === "unipolis") return "UNIP"
    if (b.id === "shanti-devi-auditorium") return "AUD"
    if (b.id === "uni-hospital") return "HOSP"
    if (b.id === "indoor-stadium") return "STAD"
    if (b.id === "outdoor-stadium") return "TURF"
    if (b.id === "sunken-garden") return "GARD"
    if (b.id === "open-air-theatre") return "OAT"
    if (b.id === "student-food-court") return "FOOD"
    if (b.id === "robopark") return "ROBO"
    if (b.id === "gate-1") return "G-1"
    if (b.id === "gate-2") return "G-2"
    if (b.id === "gate-3") return "G-3"
    if (b.id === "gate-4") return "G-4"
    if (b.id === "shuttle-terminal") return "E-BUS"
    if (b.id === "faculty-apt-a") return "FAC"
    return b.shortName.substring(0, 4).toUpperCase()
  }, [])

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl">
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white text-xs font-bold flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-violet-400" />
          <span>Interactive Campus Canvas</span>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 p-1 rounded-xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMapMode("network")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              mapMode === "network" ? "bg-violet-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Network View
          </button>
          <button
            type="button"
            onClick={() => setMapMode("blueprint")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              mapMode === "blueprint" ? "bg-teal-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Blueprint Grid
          </button>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-300 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-semibold">Accessible Corridor</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 ml-2" />
          <span className="text-[11px] font-semibold">Steep / Steps</span>
        </div>
      </div>

      <div className="w-full h-[520px] sm:h-[620px] relative bg-slate-950 overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 650"
          className="w-full h-full object-cover"
          style={{
            backgroundImage: mapMode === "blueprint"
              ? "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        >
          <defs>
            <linearGradient id="activeRouteGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {routes.map((r, idx) => {
            const b1 = buildings.find(b => b.id === r.from)
            const b2 = buildings.find(b => b.id === r.to)
            if (!b1 || !b2) return null

            const onActive = isRouteOnPath(r.from, r.to)
            let strokeColor = r.accessible ? "#10b981" : "#f59e0b"
            let strokeWidth = r.accessible ? 2.5 : 2
            let strokeDash = r.accessible ? "none" : "4 4"
            let opacity = 0.35

            if (onActive) {
              strokeColor = "#8b5cf6"
              strokeWidth = 6
              strokeDash = "none"
              opacity = 1
            }

            return (
              <g key={`route-${idx}`}>
                {onActive && (
                  <line
                    x1={b1.coordinates.x * 9.5 + 25}
                    y1={b1.coordinates.y * 6.0 + 25}
                    x2={b2.coordinates.x * 9.5 + 25}
                    y2={b2.coordinates.y * 6.0 + 25}
                    stroke="url(#activeRouteGlow)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.6"
                    filter="url(#glowEffect)"
                  />
                )}
                <line
                  x1={b1.coordinates.x * 9.5 + 25}
                  y1={b1.coordinates.y * 6.0 + 25}
                  x2={b2.coordinates.x * 9.5 + 25}
                  y2={b2.coordinates.y * 6.0 + 25}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  strokeLinecap="round"
                  opacity={opacity}
                />
              </g>
            )
          })}

          {buildings.map((b) => {
            const cx = b.coordinates.x * 9.5 + 25
            const cy = b.coordinates.y * 6.0 + 25
            const isSelected = selectedBuilding === b.id
            const isHovered = hoveredBuilding === b.id
            const onActivePath = isOnPath(b.id)
            const label = getBuildingLabel(b)

            let fillColor = "#1e293b"
            let strokeColor = "#475569"
            let ringColor = "#6366f1"
            let radius = 13

            if (b.type === "academic") {
              fillColor = "#312e81"
              strokeColor = "#6366f1"
            } else if (b.type === "residential") {
              fillColor = "#064e3b"
              strokeColor = "#10b981"
            } else if (b.type === "amenity" || b.type === "sports") {
              fillColor = "#831843"
              strokeColor = "#ec4899"
            }

            if (onActivePath) {
              strokeColor = "#06b6d4"
              fillColor = "#0e7490"
              radius = 16
            }

            if (isSelected) {
              strokeColor = "#ffffff"
              fillColor = "#7c3aed"
              radius = 18
            }

            return (
              <g
                key={b.id}
                className="cursor-pointer transition-transform"
                onClick={() => onBuildingSelect && onBuildingSelect(b.id)}
                onMouseEnter={() => setHoveredBuilding(b.id)}
                onMouseLeave={() => setHoveredBuilding(null)}
              >
                {(isSelected || isHovered || onActivePath) && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius + 7}
                    fill="none"
                    stroke={isSelected ? "#a855f7" : onActivePath ? "#22d3ee" : "#94a3b8"}
                    strokeWidth="2"
                    strokeDasharray={isSelected ? "none" : "3 3"}
                    className="animate-pulse"
                  />
                )}

                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200"
                />

                <text
                  x={cx}
                  y={cy + 3.5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="900"
                  fontFamily="Inter, sans-serif"
                  className="pointer-events-none select-none"
                >
                  {label}
                </text>
              </g>
            )
          })}
        </svg>

        {hovered && (
          <div className="absolute bottom-4 left-4 z-30 max-w-xs bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-2xl text-white pointer-events-none transition-all">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-black text-violet-300">{hovered.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                hovered.accessibility.score >= 80 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {hovered.accessibility.score}% Access
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
              {hovered.description}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Ramp: {hovered.accessibility.ramp ? "✓ Verified" : "✗ Missing"}</span>
              <span>Lift: {hovered.accessibility.elevator ? "✓ 2 Operational" : "✗ None"}</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-1 text-[11px] font-semibold text-slate-400 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>Academic Towers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Residential Hostels</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>Amenities & Sports</span>
          </div>
        </div>
      </div>
    </div>
  )
}
