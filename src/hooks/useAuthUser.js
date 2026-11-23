"use client"

import { useState, useEffect, useCallback } from "react"
import { getCurrentUser, signOut as authSignOut } from "@/lib/auth"

export function useAuthUser() {
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openAuthModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleSignOut = useCallback(() => {
    const guest = authSignOut()
    setUser(guest)
  }, [])

  useEffect(() => {
    setUser(getCurrentUser())

    const handleAuthChange = (e) => {
      setUser(e.detail || getCurrentUser())
    }

    window.addEventListener("stride:auth_state_changed", handleAuthChange)
    return () => {
      window.removeEventListener("stride:auth_state_changed", handleAuthChange)
    }
  }, [])

  return {
    user,
    isModalOpen,
    openAuthModal,
    closeAuthModal,
    handleSignOut,
  }
}
