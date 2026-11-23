"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Accessibility, AlertTriangle, UserCircle, LogIn, CheckCircle2 } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import GoogleSignInModal from "@/components/GoogleSignInModal"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Campus Map" },
  { href: "/tour", label: "360° Tour" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/feed", label: "Community" },
  { href: "/profile", label: "My Profile" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setUser(getCurrentUser())

    const handleAuthChange = (e) => {
      setUser(e.detail || getCurrentUser())
    }

    window.addEventListener("stride:auth_state_changed", handleAuthChange)
    return () => window.removeEventListener("stride:auth_state_changed", handleAuthChange)
  }, [])

  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  const openAuthModal = useCallback(() => {
    setShowGoogleModal(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setShowGoogleModal(false)
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 bg-white/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900">Stride</span>
                <span className="text-[10px] font-semibold text-teal-600 -mt-1 tracking-wider uppercase">Accessible Campus</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              {navLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-violet-700 shadow-sm border border-slate-200/60"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user && user.isLoggedIn ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-bold text-slate-800 group"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-violet-400"
                  />
                  <span className="truncate max-w-[100px]">{user.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-violet-600" />
                  <span>Google Login</span>
                </button>
              )}

              <Link
                href="/report"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report Barrier</span>
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/report"
                className="p-2 rounded-xl bg-red-600 text-white shadow-xs"
              >
                <AlertTriangle className="w-4 h-4" />
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-violet-50 text-violet-700 border border-violet-200"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {user && user.isLoggedIn ? (
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-xs font-bold text-slate-800"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-violet-400"
                  />
                  <span>{user.name} (Student Profile)</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu()
                    openAuthModal()
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-violet-700"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Google Student Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <GoogleSignInModal
        isOpen={showGoogleModal}
        onClose={closeAuthModal}
        onLoginSuccess={(u) => setUser(u)}
      />
    </>
  )
}
