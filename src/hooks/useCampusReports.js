"use client"

import { useState, useEffect, useCallback } from "react"
import { getStoredReports, getReportsForBuilding } from "@/lib/reportsStorage"

export function useCampusReports(buildingId = null) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  const refreshReports = useCallback(() => {
    const data = buildingId ? getReportsForBuilding(buildingId) : getStoredReports()
    setReports(data)
    setLoading(false)
  }, [buildingId])

  useEffect(() => {
    refreshReports()
    window.addEventListener("stride:report_added", refreshReports)
    return () => {
      window.removeEventListener("stride:report_added", refreshReports)
    }
  }, [refreshReports])

  return { reports, loading, refreshReports }
}
