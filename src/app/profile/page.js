"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { UserCircle, Save, CheckCircle2, Shield, Settings, SlidersHorizontal } from "lucide-react"

const needsOptions = [
  { id: "wheelchair", label: "Wheelchair User (Manual/Electric)", desc: "Avoid all curbs, stairs, narrow doors, steep slopes >1:12", icon: "♿" },
  { id: "visualAid", label: "Visual Impairment / Low Vision", desc: "Require tactile pavers, audio cues, high-contrast signage", icon: "👁️" },
  { id: "hearingAid", label: "Hearing Impaired / Deaf", desc: "Prioritize visual alarm flashers and digital signage", icon: "👂" },
  { id: "reducedMobility", label: "Crutches / Cane / Reduced Mobility", desc: "Minimize walking distances, require handrails and resting benches", icon: "🦽" },
  { id: "sensoryNeeds", label: "Sensory & Neurodiversity Needs", desc: "Flag loud machinery areas, high-echo corridors, heavy crowds", icon: "🧠" },
  { id: "temporary", label: "Temporary Injury / Sprain", desc: "Temporary step-free routing during recovery period", icon: "🩹" },
]

export default function ProfilePage() {
  const [name, setName] = useState("")
  const [needs, setNeeds] = useState([])
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("stride_profile")
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setName(data.name || "")
        setNeeds(data.needs || [])
      } catch (err) {}
    }
    setLoaded(true)
  }, [])

  const toggleNeed = (id) => {
    setNeeds(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    )
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem("stride_profile", JSON.stringify({ name, needs }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!loaded) return null

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Accessibility Preferences & Routing Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Personal Navigation Profile
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
            Customize which barriers the pathfinder should strictly avoid for you. Data is stored safely on this device in your browser.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-md">
                {name ? name[0].toUpperCase() : "S"}
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {name ? `Welcome back, ${name}` : "Student Profile"}
                </h2>
                <p className="text-xs text-slate-500">Your profile guides custom pathway weighting across campus.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Your Preferred Name / Nickname
              </label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setSaved(false) }}
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="pb-4 mb-6 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">Select Your Mobility & Access Needs</h2>
              <p className="text-xs text-slate-500 mt-1">
                Stride will optimize route suggestions to respect these constraints:
              </p>
            </div>

            <div className="space-y-3">
              {needsOptions.map(opt => {
                const isSelected = needs.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleNeed(opt.id)}
                    className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "border-violet-600 bg-violet-50/70 ring-2 ring-violet-500/20"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{opt.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex-1 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save My Preferences
            </button>

            {saved && (
              <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Saved locally</span>
              </div>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
