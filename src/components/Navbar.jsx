"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Accessibility, AlertTriangle } from "lucide-react"

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
  const pathname = usePathname()

  return (
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
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-sm shadow-red-500/20 active:scale-95 transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Report Barrier
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-violet-50 text-violet-700 border border-violet-100"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2">
              <Link
                href="/report"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 shadow-sm"
              >
                <AlertTriangle className="w-4 h-4" />
                Report a Barrier
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
