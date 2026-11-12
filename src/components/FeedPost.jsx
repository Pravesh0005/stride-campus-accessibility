"use client"

import { useState } from "react"
import { Heart, MapPin, CheckCircle2, ShieldAlert, Lightbulb } from "lucide-react"
import { timeAgo } from "@/lib/utils"

export default function FeedPost({ post }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)

  const toggleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const initial = post.author ? post.author.charAt(0).toUpperCase() : "U"

  let typeBadge = (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-800">
      <Lightbulb className="w-3 h-3 text-violet-600" /> Tip
    </span>
  )

  if (post.type === "report") {
    typeBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
        <ShieldAlert className="w-3 h-3 text-red-600" /> Barrier Report
      </span>
    )
  } else if (post.type === "update") {
    typeBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resolution
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 hover:border-slate-300 transition-all">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
          {initial}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{post.author}</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-400">{timeAgo(post.timestamp)}</span>
            </div>
            {typeBadge}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
            {post.content}
          </p>

          <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100">
            {post.building ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                <MapPin className="w-3 h-3 text-violet-600" />
                {post.building}
              </span>
            ) : <span />}

            <button
              onClick={toggleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                liked
                  ? "bg-rose-50 text-rose-600"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
