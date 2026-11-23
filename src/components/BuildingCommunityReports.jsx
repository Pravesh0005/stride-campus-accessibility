"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { getReportsForBuilding } from "@/lib/reportsStorage"
import { ShieldAlert, Camera, MapPin, AlertTriangle, ZoomIn, X, Clock } from "lucide-react"
import { timeAgo } from "@/lib/utils"

export default function BuildingCommunityReports({ buildingId, buildingName }) {
  const [reports, setReports] = useState([])
  const [lightboxPhoto, setLightboxPhoto] = useState(null)

  useEffect(() => {
    const load = () => {
      const list = getReportsForBuilding(buildingId)
      setReports(list)
    }

    load()
    window.addEventListener("stride:report_added", load)
    return () => window.removeEventListener("stride:report_added", load)
  }, [buildingId])

  const openPhoto = useCallback((photoUrl, title) => {
    if (!photoUrl) return
    setLightboxPhoto({ url: photoUrl, title })
  }, [])

  const closePhoto = useCallback(() => {
    setLightboxPhoto(null)
  }, [])

  const reportCount = useMemo(() => reports.length, [reports])

  if (reports.length === 0) return null

  return (
    <div className="bg-rose-50/80 rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-sm space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-rose-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-black text-rose-950">
              Student Crowdsourced Field Alerts ({reportCount})
            </h2>
            <p className="text-xs text-rose-800">
              Real-time obstacle reports with photo proof submitted by campus students:
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
          Active Live Alert
        </span>
      </div>

      <div className="space-y-3.5">
        {reports.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-rose-200 p-4 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{r.author || "Student Contributor"}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {timeAgo(r.timestamp)}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                r.severity === "high"
                  ? "bg-rose-100 text-rose-700"
                  : r.severity === "medium"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-700"
              }`}>
                {r.severityLabel || r.severity}
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{r.barrierLabel}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.description}</p>
                {r.locationDetails && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    <span className="font-semibold text-slate-500">Specific spot:</span> {r.locationDetails}
                  </p>
                )}
              </div>
            </div>

            {r.photo && (
              <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
                <div
                  onClick={() => openPhoto(r.photo, `${buildingName || "Building"} — ${r.barrierLabel}`)}
                  className="relative group rounded-xl overflow-hidden border border-rose-200 cursor-pointer w-24 h-16 bg-slate-900 shrink-0"
                >
                  <img
                    src={r.photo}
                    alt={r.barrierLabel}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-black/70 text-[8px] font-bold text-white flex items-center gap-0.5">
                    <Camera className="w-2.5 h-2.5" /> Photo
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openPhoto(r.photo, `${buildingName || "Building"} — ${r.barrierLabel}`)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Inspect Photo Proof</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closePhoto}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-100 block">{lightboxPhoto.title}</span>
                <span className="text-[10px] text-slate-400">Photo Proof uploaded by reporting student</span>
              </div>
              <button
                onClick={closePhoto}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={lightboxPhoto.url}
                alt="Obstacle photographic proof"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
