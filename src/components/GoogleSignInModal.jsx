"use client"

import { useState, useCallback } from "react"
import { signInWithGoogle, sampleGoogleAccounts } from "@/lib/auth"
import { X, CheckCircle, Shield, Loader2, Plus, ArrowRight } from "lucide-react"

export default function GoogleSignInModal({ isOpen, onClose, onLoginSuccess }) {
  const [loadingAccount, setLoadingAccount] = useState(null)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customName, setCustomName] = useState("")
  const [customEmail, setCustomEmail] = useState("")
  const [customRegNo, setCustomRegNo] = useState("")

  const handleSelectAccount = useCallback((account) => {
    setLoadingAccount(account.email)
    setTimeout(() => {
      const user = signInWithGoogle(account)
      setLoadingAccount(null)
      if (onLoginSuccess) onLoginSuccess(user)
      onClose()
    }, 600)
  }, [onLoginSuccess, onClose])

  const handleCustomSubmit = useCallback((e) => {
    e.preventDefault()
    if (!customName.trim() || !customEmail.trim()) return
    const customAccount = {
      name: customName.trim(),
      email: customEmail.trim(),
      regNo: customRegNo.trim() || "12419500",
      department: "School of Computer Science & Engineering",
      role: "Student Contributor",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customName)}`,
      hostel: "Campus Hostel",
    }
    handleSelectAccount(customAccount)
  }, [customName, customEmail, customRegNo, handleSelectAccount])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Sign in with Google
              </h3>
              <p className="text-xs text-slate-500">
                Choose an account to continue to <span className="font-semibold text-violet-700">Stride LPU</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2.5">
            {sampleGoogleAccounts.map((account) => {
              const isLoading = loadingAccount === account.email
              return (
                <button
                  key={account.email}
                  disabled={isLoading}
                  onClick={() => handleSelectAccount(account)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-violet-400 hover:bg-violet-50/40 transition-all text-left group cursor-pointer disabled:opacity-60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm truncate group-hover:text-violet-700">
                          {account.name}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          ({account.regNo})
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {account.email}
                      </div>
                      <div className="text-[10px] font-semibold text-violet-600 mt-0.5">
                        {account.role}
                      </div>
                    </div>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-violet-600 animate-spin shrink-0" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showCustomInput ? "Use standard campus profile" : "Use another LPU student account"}</span>
            </button>
          </div>

          {showCustomInput && (
            <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registration No</label>
                  <input
                    type="text"
                    placeholder="e.g. 12419500"
                    value={customRegNo}
                    onChange={e => setCustomRegNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Email</label>
                  <input
                    type="email"
                    required
                    placeholder="student@lpu.in"
                    value={customEmail}
                    onChange={e => setCustomEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Sign In with this Identity
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" /> Secure OAuth 2.0
            </span>
            <span>Lovely Professional University</span>
          </div>
        </div>
      </div>
    </div>
  )
}
