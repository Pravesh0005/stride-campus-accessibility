"use client"

import { useState, useEffect, useCallback } from "react"
import { getStoredReports } from "@/lib/reportsStorage"
import { ShieldAlert, Camera, MapPin, ZoomIn, X, ArrowRight } from "lucide-react"
import { timeAgo } from "@/lib/utils"
import Link from "next/link"

export default function DashboardRecentAlerts() {
  const [reports, setReports] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const load = () => {
      setReports(getStoredReports().slice(0, 3))
    }
    load()
    window.addEventListener("stride:report_added", load)
    return () => window.removeEventListener("stride:report_added", load)
  }, [])

  const openLightbox = useCallback((photoUrl, title) => {
    if (!photoUrl) return
    setLightbox({ url: photoUrl, title })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  if (reports.length === 0) return null

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Live Field Reports & Photographic Evidence
            </h2>
            <p className="text-xs text-slate-500">
              Recent student-flagged campus hazards requiring administrative remediation
            </p>
          </div>
        </div>
        <Link
          href="/feed"
          className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1"
        >
          View all in Community Wire <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reports.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-1 text-[11px]">
                <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                  <span className="truncate">{r.buildingName}</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 ${
                  r.severity === "high"
                    ? "bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}>
                  {r.severity}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-900 line-clamp-1">{r.barrierLabel}</h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {r.description}
                </p>
              </div>

              {r.photo && (
                <div
                  onClick={() => openLightbox(r.photo, `${r.buildingName} — ${r.barrierLabel}`)}
                  className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer h-28"
                >
                  <img
                    src={r.photo}
                    alt={r.barrierLabel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[9px] font-bold text-white flex items-center gap-1">
                    <Camera className="w-3 h-3 text-violet-400" />
                    <span>Proof Attached</span>
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate font-medium">{r.author}</span>
              <span className="shrink-0">{timeAgo(r.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-100 block">{lightbox.title}</span>
                <span className="text-[10px] text-slate-400">Photographic Evidence uploaded by student</span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={lightbox.url}
                alt="Obstacle full resolution proof"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
