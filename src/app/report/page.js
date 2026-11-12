"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { buildings, barrierTypes, severityLevels } from "@/lib/campusData"
import { AlertTriangle, CheckCircle, Loader2, Send, ShieldAlert, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ReportPage() {
  const [form, setForm] = useState({
    buildingId: "",
    barrierType: "",
    severity: "",
    description: "",
    locationDetails: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.buildingId) e.buildingId = "Please select a building"
    if (!form.barrierType) e.barrierType = "Please select a barrier type"
    if (!form.severity) e.severity = "Please select severity level"
    if (!form.description.trim()) e.description = "Please describe the barrier"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) {
      setErrors(v)
      return
    }
    setErrors({})
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setSuccess(true)
      setForm({ buildingId: "", barrierType: "", severity: "", description: "", locationDetails: "" })
    } catch {
      setError("Network or submission error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const update = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Community Crowdsource Alert</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Report an Accessibility Barrier
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
            Spotted a broken ramp, locked lift, or blocked pathway? Submit this quick report to warn fellow students and update real-time navigation paths.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        {success ? (
          <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Barrier Report Logged</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for contributing! Your report has been dispatched to the campus audit queue and live routing will mark this pathway.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                Submit Another Report
              </button>
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-violet-600 hover:bg-violet-700 shadow-md transition-all"
              >
                Return to Campus Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                1. Affected Campus Building <span className="text-red-500">*</span>
              </label>
              <select
                value={form.buildingId}
                onChange={e => update("buildingId", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all cursor-pointer ${
                  errors.buildingId ? "border-red-500" : "border-slate-200 focus:border-violet-600"
                }`}
              >
                <option value="">Select the facility where the barrier exists...</option>
                {buildings.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.type})</option>
                ))}
              </select>
              {errors.buildingId && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.buildingId}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                2. Nature of Barrier <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {barrierTypes.map(bt => (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => update("barrierType", bt.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                      form.barrierType === bt.id
                        ? "border-violet-600 bg-violet-50 text-violet-900 ring-2 ring-violet-500/20"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-base">{bt.icon}</span>
                    <span className="truncate">{bt.label}</span>
                  </button>
                ))}
              </div>
              {errors.barrierType && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.barrierType}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                3. Severity Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {severityLevels.map(sl => {
                  const isSelected = form.severity === sl.id
                  return (
                    <button
                      key={sl.id}
                      type="button"
                      onClick={() => update("severity", sl.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full inline-block mx-auto mb-1" style={{ backgroundColor: sl.color }} />
                      <div className="text-xs font-bold leading-tight">{sl.label}</div>
                    </button>
                  )
                })}
              </div>
              {errors.severity && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.severity}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                4. Description of Obstacle <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={e => update("description", e.target.value)}
                rows={3}
                placeholder="e.g. Lift is shut down with an out-of-order sign. Wheelchair users cannot reach the 3rd floor lab."
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none ${
                  errors.description ? "border-red-500" : "border-slate-200 focus:border-violet-600"
                }`}
              />
              {errors.description && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                5. Exact Location / Landmark <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                value={form.locationDetails}
                onChange={e => update("locationDetails", e.target.value)}
                placeholder="e.g. Ground floor west entrance, next to faculty parking"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-md shadow-red-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting Report...</>
              ) : (
                <><Send className="w-4 h-4" /> Publish Barrier Report</>
              )}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
