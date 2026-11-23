"use client"

import { useState, useCallback, useMemo } from "react"
import { Heart, MapPin, CheckCircle2, ShieldAlert, Lightbulb, AlertTriangle, Eye, X, ZoomIn } from "lucide-react"
import { timeAgo } from "@/lib/utils"

export default function FeedPost({ post }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const toggleLike = useCallback(() => {
    setLiked(prevLiked => {
      setLikeCount(prevCount => prevLiked ? prevCount - 1 : prevCount + 1)
      return !prevLiked
    })
  }, [])

  const openLightbox = useCallback(() => {
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const initial = useMemo(() => {
    return post.author ? post.author.charAt(0).toUpperCase() : "U"
  }, [post.author])

  const typeBadge = useMemo(() => {
    if (post.type === "report" || post.barrierType) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
          <ShieldAlert className="w-3 h-3 text-red-600" /> Barrier Report
        </span>
      )
    }
    if (post.type === "update" || post.status === "resolved") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resolution
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-800">
        <Lightbulb className="w-3 h-3 text-violet-600" /> Tip
      </span>
    )
  }, [post.type, post.barrierType, post.status])

  const postImage = post.photo || post.image

  return (
    <>
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
              <div className="flex items-center gap-1.5">
                {post.severity && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                    post.severity === "high" || post.severity === "critical"
                      ? "bg-rose-100 text-rose-700"
                      : post.severity === "medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {post.severity}
                  </span>
                )}
                {typeBadge}
              </div>
            </div>

            {post.barrierLabel && (
              <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{post.barrierLabel}</span>
              </div>
            )}

            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              {post.content}
            </p>

            {postImage && (
              <div className="mb-3 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative group max-w-md">
                <img
                  src={postImage}
                  alt={post.barrierLabel || "Field report obstacle"}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={openLightbox}
                />
                <button
                  type="button"
                  onClick={openLightbox}
                  className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect Proof</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span>{post.building}</span>
              </span>

              <button
                type="button"
                onClick={toggleLike}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  liked
                    ? "bg-rose-50 text-rose-600 font-bold"
                    : "hover:bg-slate-100 text-slate-500"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-600 text-rose-600" : ""}`} />
                <span>{likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && postImage && (
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
                <span className="text-xs font-bold text-slate-100 block">
                  {post.barrierLabel || post.building || "Photographic Evidence"}
                </span>
                <span className="text-[10px] text-slate-400">
                  Uploaded by {post.author} • {timeAgo(post.timestamp)}
                </span>
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
                src={postImage}
                alt="Obstacle proof full view"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
