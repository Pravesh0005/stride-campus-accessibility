export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function getScoreColor(score) {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-danger"
}

export function getScoreBg(score) {
  if (score >= 80) return "bg-emerald-50 border-emerald-200"
  if (score >= 60) return "bg-amber-50 border-amber-200"
  return "bg-red-50 border-red-200"
}

export function getScoreLabel(score) {
  if (score >= 80) return "Good"
  if (score >= 60) return "Moderate"
  if (score >= 40) return "Poor"
  return "Critical"
}

export function formatDistance(meters) {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`
  return `${meters}m`
}

export function formatTime(minutes) {
  if (minutes < 1) return "< 1 min"
  if (minutes === 1) return "1 min"
  return `${minutes} mins`
}

export function getBuildingTypeIcon(type) {
  const icons = {
    academic: "🎓",
    library: "📚",
    recreation: "🎯",
    residential: "🏠",
    administrative: "🏛️",
    dining: "🍽️",
    medical: "🏥"
  }
  return icons[type] || "🏢"
}

export function getBuildingTypeLabel(type) {
  const labels = {
    academic: "Academic",
    library: "Library",
    recreation: "Recreation",
    residential: "Residential",
    administrative: "Administrative",
    dining: "Dining",
    medical: "Medical"
  }
  return labels[type] || "Other"
}

export function timeAgo(date) {
  if (typeof window === "undefined") return ""
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(date).toLocaleDateString()
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}

