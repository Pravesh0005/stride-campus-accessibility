"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeedPost from "@/components/FeedPost"
import { buildings } from "@/lib/campusData"
import { generateId } from "@/lib/utils"
import { MessageSquare, PlusCircle, Send, Users, Sparkles, Filter } from "lucide-react"

const initialPosts = [
  {
    id: "1",
    author: "Priya Singh (Wheelchair User)",
    content: "Science Complex main elevator has been shut down since Monday. There are 2 students in CS who have labs on Floor 4. Security says parts are arriving tomorrow. Use North ramp to Floor 1 only.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    likes: 24,
    building: "Science Complex",
    type: "report",
  },
  {
    id: "2",
    author: "Arjun Mehta (Accessibility Club)",
    content: "Great update! Campus estate team finally resurfaced the ramp leading to Central Library. The bumpy pavers have been replaced with smooth brushed concrete.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likes: 42,
    building: "Central Library",
    type: "update",
  },
  {
    id: "3",
    author: "Neha Sharma (Mobility Support)",
    content: "If you are walking from Hostel A to the Main Academic Block, do NOT take the shortcut by the athletic turf. The kerb cuts are missing and there are 2 open water drains. Take the paved path through SAC instead.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    likes: 19,
    building: "Hostel Block A",
    type: "tip",
  },
  {
    id: "4",
    author: "Rahul Verma (Student Rep)",
    content: "Auditorium stage in SAC still does not have a ramp for tomorrow's orientation ceremony. We have raised a ticket with the Dean of Student Affairs.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 35,
    building: "Student Activity Center",
    type: "report",
  },
  {
    id: "5",
    author: "Tanvi Patel (Occupational Therapy)",
    content: "Health Center is the benchmark for how all campus buildings should be retrofitted. Automatic sliding doors, zero-threshold entries, and tactile guidance tracks on all floor levels.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    likes: 58,
    building: "Campus Health Center",
    type: "tip",
  },
]

export default function FeedPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [content, setContent] = useState("")
  const [building, setBuilding] = useState("")
  const [type, setType] = useState("tip")
  const [posting, setPosting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [filterType, setFilterType] = useState("all")

  const handlePost = (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setPosting(true)

    setTimeout(() => {
      const bObj = buildings.find(b => b.id === building)
      const newPost = {
        id: generateId(),
        author: "You (Student Contributor)",
        content: content.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        building: bObj ? bObj.name : null,
        type,
      }
      setPosts(prev => [newPost, ...prev])
      setContent("")
      setBuilding("")
      setType("tip")
      setPosting(false)
      setShowForm(false)
    }, 400)
  }

  const filtered = filterType === "all"
    ? posts
    : posts.filter(p => p.type === filterType)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Campus Accessibility Community</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Student Live Wire
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
              Real-time updates, obstacle reports, and navigation shortcuts shared by students, faculty, and disability advocates.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs text-white bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-500/20 active:scale-95 transition-all self-start sm:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showForm ? "Cancel Post" : "Share an Update"}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        
        {showForm && (
          <form onSubmit={handlePost} className="bg-white rounded-3xl border-2 border-violet-500/60 shadow-xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-black text-slate-900">Post an Update or Observation</h3>

            <div className="flex gap-2 flex-wrap">
              {[
                { id: "tip", label: "💡 Practical Tip" },
                { id: "report", label: "🚧 Barrier Alert" },
                { id: "update", label: "✅ Repair Resolution" },
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    type === t.id
                      ? "bg-violet-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
              placeholder="What did you observe on campus? (e.g. Ramp angle, locked lift, construction work...)"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all resize-none"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <select
                value={building}
                onChange={e => setBuilding(e.target.value)}
                className="w-full sm:w-auto flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:bg-white cursor-pointer"
              >
                <option value="">Tag a Campus Building (Optional)...</option>
                {buildings.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>

              <button
                type="submit"
                disabled={!content.trim() || posting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{posting ? "Publishing..." : "Publish to Feed"}</span>
              </button>
            </div>
          </form>
        )}

        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: "all", label: "All Updates" },
              { id: "report", label: "🚧 Barrier Reports" },
              { id: "update", label: "✅ Resolutions" },
              { id: "tip", label: "💡 Tips" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterType === f.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {filtered.length} active dispatches
          </span>
        </div>

        <div className="space-y-4">
          {filtered.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-sm">No dispatches in this category</p>
              <p className="text-slate-400 text-xs mt-1">Be the first to share an observation!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
