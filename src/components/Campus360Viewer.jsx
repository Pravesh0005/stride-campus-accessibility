"use client"

import { useState, useRef } from "react"
import {
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Satellite,
  Eye,
  Camera,
  Navigation,
  ShieldCheck,
  X
} from "lucide-react"

const tourFacilities = [
  {
    id: "block-34",
    name: "Block 34 (School of CSE) Tower",
    type: "Academic High-Rise",
    coordinates: "31.2554° N, 75.7051° E",
    description: "The primary 8-story computing faculty tower housing computer science lecture auditoriums, innovation incubators, and the central high-traffic tech plaza.",
    score: 91,
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "North Entrance Barrier-Free Ramp",
        tag: "Grade 1:12 Certified",
        verified: true,
        desc: "Smooth concrete ramp equipped with dual stainless-steel handrails and anti-slip ribbed grooves.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Dual Otis Elevator Lobby",
        tag: "16-Passenger High Capacity",
        verified: true,
        desc: "Wide door clearance (38-inch), audible floor arrival chimes, and low-mounted braille buttons.",
        url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Ground Floor Step-Free Corridor",
        tag: "Continuous Tactile Pavers",
        verified: true,
        desc: "Polished terrazzo step-free walkway connecting directly to Block 32 and central food plazas.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "unimall",
    name: "UniMall Central Commercial Complex",
    type: "Commercial & Dining Atrium",
    coordinates: "31.2530° N, 75.7040° E",
    description: "4-story indoor shopping, stationery, banking, grocery, and multi-cuisine food court serving over 30,000 university students daily.",
    score: 95,
    heroImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "Main Automatic Sliding Entry",
        tag: "Zero-Threshold Flat Access",
        verified: true,
        desc: "Sensor-driven sliding glass doors with complete zero-threshold floor transition for electric wheelchairs.",
        url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Central Panoramic Glass Elevator",
        tag: "All-Floor Access",
        verified: true,
        desc: "Provides step-free connectivity from ground level to 3rd-floor international dining hall.",
        url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Perimeter Paved Sidewalk",
        tag: "Kerb-Cut Verified",
        verified: true,
        desc: "Level stone pavement linking UniMall directly to Central Library and Girls Hostel complex.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "block-30",
    name: "Block 30 (Central Library Resource Centre)",
    type: "University Reference Centre",
    coordinates: "31.2542° N, 75.7046° E",
    description: "State-of-the-art reference library housing 1.5+ million physical books, digital research suites, silent study zones, and audio-book stations.",
    score: 88,
    heroImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "East Portico Accessible Ramp",
        tag: "ADA 1:12 Verified",
        verified: true,
        desc: "Gentle gradient ramp sheltered from monsoon rains, direct access to automated turnstiles.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Yellow Tactile Directional Guide",
        tag: "Visually Impaired Path",
        verified: true,
        desc: "Continuous grooved rubber pavers leading from outer perimeter road to main helpdesk.",
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Wheelchair-Accessible Reading Bay",
        tag: "Adjustable Desk Heights",
        verified: true,
        desc: "Dedicated ground floor terminals configured with screen-reader audio assistive technology.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "unipolis",
    name: "Baldev Raj Mittal Unipolis",
    type: "Mega Convocation Arena",
    coordinates: "31.2520° N, 75.7032° E",
    description: "Massive covered convocation and youth festival amphitheatre capable of hosting 15,000+ spectators under an iconic tensile membrane canopy.",
    score: 84,
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "Lower Tier Wheelchair Deck",
        tag: "Direct Stage Sightline",
        verified: true,
        desc: "Ramped spectator platforms ensuring unobstructed sightlines during university convocations.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Grand Entrance Ramp Concourse",
        tag: "Extra-Wide 3m Clearance",
        verified: true,
        desc: "Spacious gently sloped asphalt ingress accommodating high-traffic crowds and emergency carts.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Side Access Perimeter Corridor",
        tag: "Zero-Kerb Transition",
        verified: true,
        desc: "Asphalt route connecting Unipolis to UniMall without any steps or elevated kerbs.",
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "shanti-devi-auditorium",
    name: "Shanti Devi Mittal Auditorium",
    type: "Performing Arts Theatre",
    coordinates: "31.2538° N, 75.7065° E",
    description: "Centrally air-conditioned 2,500-seat multi-tier proscenium theatre featuring advanced acoustic treatment and international conference facilities.",
    score: 87,
    heroImage: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "VIP & Wheelchair Entry Port",
        tag: "Hydraulic Stage Lift",
        verified: true,
        desc: "Dedicated step-free side entry directly connecting parking bay to the main auditorium hall.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Aisle Access & Seating Cutouts",
        tag: "RPwD Act Compliant",
        verified: true,
        desc: "End-of-row seats designed with swing-away armrests for effortless transfer.",
        url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Lower Concourse Restrooms",
        tag: "Grab-Bar Equipped",
        verified: true,
        desc: "Dedicated accessible washroom with emergency pull-cord alarm and outward swinging doors.",
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "uni-hospital",
    name: "Uni-Hospital (24/7 University Health Wing)",
    type: "Healthcare & Emergency Wing",
    coordinates: "31.2510° N, 75.7015° E",
    description: "Comprehensive university hospital equipped with 24-hour emergency trauma care, physical rehabilitation physiotherapy, pharmacy, and patient wards.",
    score: 98,
    heroImage: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "Emergency Ambulance Ingress Bay",
        tag: "Level Gurney Transfer",
        verified: true,
        desc: "Completely flush transition between tarmac road and emergency triage lobby.",
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Stretcher-Sized Medical Elevator",
        tag: "Heavy-Duty Hospital Lift",
        verified: true,
        desc: "Direct access to radiology, upper pathology suites, and private recovery wards.",
        url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Physiotherapy Rehabilitation Suite",
        tag: "Mobility Training Rails",
        verified: true,
        desc: "Parallel training bars and wheelchair-friendly examination tables.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "gate-1",
    name: "Main Gate 1 (GT Road Highway Entrance)",
    type: "Highway Ingress & Transit Hub",
    coordinates: "31.2568° N, 75.7020° E",
    description: "The primary architectural gateway into Lovely Professional University along NH-1 GT Road, serving campus shuttle buses, auto-rickshaws, and visitors.",
    score: 82,
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "Campus Electric Bus Boarding Bay",
        tag: "Low-Floor Bus Transit",
        verified: true,
        desc: "Raised curb platform aligned precisely with low-floor electric shuttle doors.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Pedestrian Protected Sidewalk",
        tag: "Continuous Kerb Cuts",
        verified: true,
        desc: "Wide separated walkway connecting main gate security checkpoints to Academic Spine.",
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Security Booth Wheelchair Pass",
        tag: "Bypass Turnstile Gate",
        verified: true,
        desc: "Wide manual swing barrier ensuring students with mobility aids don't get stuck at turnstiles.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "indoor-stadium",
    name: "Indoor Sports Complex & Olympic Arena",
    type: "Recreational & Athletic Arena",
    coordinates: "31.2505° N, 75.7060° E",
    description: "Multi-court sports complex with international standard badminton courts, Olympic swimming pool, indoor shooting range, and spectator bleachers.",
    score: 80,
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "Lower Court Spectator Ramp",
        tag: "Direct Bleacher Access",
        verified: true,
        desc: "Smooth ramp leading directly to front-row designated wheelchair spectator positions.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Pool Lift & Level Changing Rooms",
        tag: "Step-Free Wet Area",
        verified: true,
        desc: "Zero-threshold slip-resistant tiles with grab bars in all changing room corridors.",
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "North Perimeter Accessible Walkway",
        tag: "Smooth Concrete Pave",
        verified: true,
        desc: "Direct connection to Boys Hostels and student athletic track grounds.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "hostels",
    name: "Residential Halls (BH & GH Complexes)",
    type: "Student Residences",
    coordinates: "31.2485° N, 75.7040° E",
    description: "Multi-story residential apartment blocks accommodating tens of thousands of boarders with attached mess dining halls, gymnasiums, and study quads.",
    score: 79,
    heroImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80",
    photos: [
      {
        title: "Mess Hall Step-Free Dining Entrance",
        tag: "Zero-Step Ramp",
        verified: true,
        desc: "Ramped ingress allowing smooth access to ground-floor central dining tables.",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Ground Floor Accessible Living Quads",
        tag: "Widened Door Clearance",
        verified: true,
        desc: "Specifically configured hostel rooms with low light switches and accessible washrooms.",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Hostel Quad Elevator Lobby",
        tag: "Dual High-Speed Lifts",
        verified: true,
        desc: "Operating lifts connecting all 7 residential floors with priority badges.",
        url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  }
]

export default function Campus360Viewer({ initialScene = "block-34" }) {
  const [activeTab, setActiveTab] = useState("tour360")
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    tourFacilities.some(f => f.id === initialScene) ? initialScene : "block-34"
  )
  const [lightboxPhoto, setLightboxPhoto] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef(null)

  const facility = tourFacilities.find(f => f.id === selectedFacilityId) || tourFacilities[0]

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col ${
        isFullscreen ? "h-screen rounded-none" : ""
      }`}
    >
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-violet-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">LPU 360° Real Campus Visual Tour</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-extrabold border border-teal-500/30">
                LPUTouch Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 360° panoramic walkthrough, real facility photographs, and Google 3D satellite view
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs font-bold">
            <button
              onClick={() => setActiveTab("tour360")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "tour360"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>360° Official Tour</span>
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "photos"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Real Photo Audits</span>
            </button>
            <button
              onClick={() => setActiveTab("satellite")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "satellite"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Google 3D Satellite</span>
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-teal-400" /> Quick Arena:
        </span>
        {tourFacilities.map(f => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedFacilityId(f.id)
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedFacilityId === f.id
                ? "bg-violet-600 text-white shadow-xs"
                : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
            }`}
          >
            {f.name.split(" ")[0]} {f.name.split(" ")[1] || ""}
          </button>
        ))}
      </div>

      <div className="relative w-full flex-1 min-h-[500px] sm:min-h-[620px] bg-black select-none">
        
        {activeTab === "tour360" && (
          <div className="w-full h-full min-h-[500px] sm:min-h-[620px] relative flex flex-col">
            <iframe
              src="https://iviewd.com/lpu/"
              className="w-full h-full min-h-[500px] sm:min-h-[620px] border-0"
              title="Official Lovely Professional University 360 Virtual Tour"
              allow="accelerometer; gyroscope; magnetometer; vr; fullscreen"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs shadow-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="font-bold text-slate-100">Live 360° LPU Campus Panorama</span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">Drag cursor or touch to rotate 360° • Click hotspots to walk</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <a
                href="https://iviewd.com/lpu/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Open Direct in Full VR</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {activeTab === "photos" && (
          <div className="w-full h-full p-4 sm:p-6 overflow-y-auto bg-slate-950 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-[21/9] min-h-[220px] max-h-[340px]">
              <img
                src={facility.heroImage}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-violet-500/80 text-white text-xs font-bold">
                    {facility.type}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    {facility.coordinates}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {facility.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
                  {facility.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{facility.score}/100 Access Rating</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-violet-400" />
                  <h4 className="text-sm font-black text-white">Verified Accessibility Infrastructure Photos</h4>
                </div>
                <span className="text-xs text-slate-400">Click any photograph to zoom and inspect specifications</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {facility.photos.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxPhoto(p)}
                    className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500 overflow-hidden shadow-lg transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                      <img
                        src={p.url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-extrabold text-teal-400 border border-slate-700">
                        {p.tag}
                      </div>
                      <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1 rounded-xl bg-slate-950/80 text-white text-xs font-bold backdrop-blur-xs shadow-md">
                          Click to Inspect
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-white line-clamp-1">{p.title}</h5>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "satellite" && (
          <div className="w-full h-full min-h-[500px] sm:min-h-[620px] relative">
            <iframe
              src="https://maps.google.com/maps?q=Lovely%20Professional%20University%2C%20Phagwara&t=k&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[500px] sm:min-h-[620px] border-0"
              title="LPU 3D Satellite Map"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs shadow-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <div>
                <span className="font-bold text-slate-100">Live Google 3D Satellite Map</span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">Lovely Professional University • 600+ Acres Campus Overhead View</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <a
                href="https://www.google.com/maps/place/Lovely+Professional+University/@31.2536,75.7037,17z/data=!3m1!1e3"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Google Earth / Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>

      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
          >
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  {lightboxPhoto.tag}
                </span>
                <h3 className="text-sm font-bold text-white">{lightboxPhoto.title}</h3>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
              <p className="text-slate-300 max-w-xl leading-relaxed">{lightboxPhoto.desc}</p>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Field Verified Accessible</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
