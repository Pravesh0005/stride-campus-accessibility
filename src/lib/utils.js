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

  const specificMap = {
    "block-1": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80", // Admin Colonnade
    "block-2": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // Examination / Records
    "block-3": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80", // Uni-Hospital Medical Wing
    "block-4": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80", // Mechanical / Robotics
    "block-13": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80", // Central Workshops
    "block-14": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80", // Aerospace / Automobile
    "block-25": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80", // Pharmaceutical Sciences
    "block-26": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80", // Bioengineering / Biosciences
    "block-27": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80", // Agricultural Polyhouses
    "block-28": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80", // School of Agriculture
    "block-29": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", // Chemical & Physics
    "block-30": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80", // Mathematics & Basic Sciences
    "block-31": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80", // Polytechnic & Diploma
    "block-32": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80", // DSW & Mittal School of Business
    "block-33": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80", // Computer Applications Studios
    "block-34": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80", // School of CSE Tower
    "block-35": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", // Architecture & Design Studios
    "block-36": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80", // School of Law & Moot Court
    "block-37": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80", // Central Library (Iconic Atrium)
    "block-38": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", // Computer Applications & Research Labs
    "block-55": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // AI & Computing Innovation Hub
    "block-56": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80", // Liberal Arts & Foreign Languages
    "unimall": "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80", // UniMall Multi-Level Commercial Atrium
    "unipolis": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80", // Baldev Raj Mittal Unipolis
    "shanti-devi-auditorium": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80", // Shanti Devi Mittal Auditorium
    "uni-hospital": "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80", // University Health Hospital
    "indoor-stadium": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80", // Indoor Sports Complex & Pool
    "outdoor-stadium": "https://images.unsplash.com/photo-1520645521318-f03a712f0e67?auto=format&fit=crop&w=1200&q=80", // Athletics Stadium Track
    "sunken-garden": "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80", // Sunken Garden Green Lawn
    "open-air-theatre": "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1200&q=80", // Open Air Theatre (OAT)
    "student-food-court": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80", // Student Food Plaza
    "robopark": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80", // Robopark Innovation Hub
    "gate-1": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80", // Main Gate 1 GT Road
    "gate-2": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", // Law Gate Hub
    "gate-3": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", // Hostel & Sports Gate
    "gate-4": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80", // East Perimeter Gate
    "shuttle-terminal": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80", // Central E-Shuttle Station
    "bh-1": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 1
    "bh-2": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 2
    "bh-3": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 3
    "bh-4": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 4
    "bh-5": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 5
    "bh-6": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 6
    "bh-7": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 7
    "bh-8": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Boys Hostel 8
    "gh-1": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", // Girls Hostel 1
    "gh-2": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", // Girls Hostel 2
    "gh-3": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", // Girls Hostel 3
    "gh-4": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", // Girls Hostel 4
    "gh-5": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", // Girls Hostel 5
    "gh-6": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", // Girls Hostel 6
    "faculty-apt-a": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" // Faculty Tower
  }

  if (building?.id && specificMap[building.id]) {
    return specificMap[building.id]
  }

  const categoryFallbacks = {
    academic: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    administrative: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    medical: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    residential: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    dining: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80",
    recreation: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
  }

  return categoryFallbacks[building?.type] || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
}
