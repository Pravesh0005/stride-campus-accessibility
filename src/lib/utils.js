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

export function getBuildingImage(building) {
  if (building?.image) return building.image
  const map = {
    "block-34": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "unimall": "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80",
    "block-30": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    "unipolis": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    "shanti-devi-auditorium": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
    "uni-hospital": "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80",
    "indoor-stadium": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    "gate-1": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
  }
  if (building?.id && map[building.id]) return map[building.id]
  if (building?.type === "residential") return "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"
  if (building?.type === "library") return "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
  if (building?.type === "dining") return "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80"
  if (building?.type === "medical") return "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80"
  if (building?.type === "recreation") return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
  return "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
}

