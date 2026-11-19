# Engineering Team Module Ownership & Contribution Matrix

**Institution:** Lovely Professional University (Punjab)  
**Project:** Stride — Accessible Campus Movement & Navigation System  
**Academic Evaluation Standard:** Balanced Full-Stack Contribution Across Frontend & Backend for All Members

---

## 👥 Full-Stack Contribution Summary

Each member of the engineering team contributed substantively to **both Frontend UI/UX development and Backend/Algorithmic infrastructure**, structured around three major modular subsystems:

```
+--------------------------------------------------------------------------------------------------+
|                                    STRIDE ARCHITECTURE SUBSYSTEMS                                 |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   1. Core Routing, VR & Auth Subsystem          Lead: Pravesh (Reg. 12419500)                    |
|      - Frontend: 360° VR Tour, Google OAuth Modal, Layout Simulation Card                        |
|      - Backend:  Weighted Dijkstra Engine, Routing REST API, Google Session Bus                  |
|                                                                                                  |
|   2. Geospatial Graph & Network Map Subsystem   Lead: Kartik Grewal (Reg. 12406604)              |
|      - Frontend: 2D Interactive SVG Vector Canvas, Route Comparison Cards, Node Selection HUD    |
|      - Backend:  52-Facility Graph Modeling, Corridor Coordinates, Facilities REST API           |
|                                                                                                  |
|   3. Institutional Audit & Community Subsystem  Lead: Konatala Naveen (Reg. 12417251)           |
|      - Frontend: Barrier Report Form (Photo Upload), Live Wire Feed, Dynamic 2-Lift Checklist    |
|      - Backend:  Reports Storage Bus & Event Pipeline, Ingestion API, Compliance Scoring Math    |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
```

---

## 1. Pravesh (Reg. No. 12419500)
**Role:** Team Lead & Core Engine Architect

### A. Frontend Architecture & Components
- **`src/components/Campus360Viewer.jsx` & `src/app/tour/page.js`**:
  - Engineered the multi-mode visual verification hub integrating the official LPU2 walkthrough (`iviewd.com/lpu2/`), native HTML5 equirectangular VR panorama viewer, verified local photo audits, and Google 3D satellite layer.
  - Implemented smooth inertia camera damping, compass HUD orientation tracking, and 3D floating accessibility hotspots.
- **`src/components/GoogleSignInModal.jsx` & `src/app/profile/page.js`**:
  - Developed the Google OAuth 2.0 authentication modal with multi-color Google branding and 1-click credential selection.
  - Built the LPU Student Digital Smart Card interface with barcode and chip visualization.
- **`src/components/HeroSection.jsx` & `src/app/page.js`**:
  - Designed the hero banner, interactive step-free route simulator card, and global universal navigation layout.

### B. Backend Infrastructure & Algorithms
- **`src/lib/pathfinding.js`**:
  - Implemented the core weighted **Dijkstra Shortest-Path Algorithm** factoring gradient slopes, surface textures, step exclusions, and real-time student barrier impedance penalties.
  - Developed the dynamic waypoint reconstruction algorithm and traversal time estimation formulas.
- **`src/app/api/routes/route.js`**:
  - Built the REST API route endpoint accepting origin, destination, and accessibility mode parameters to compute and serialize optimized step-free paths.
- **`src/lib/auth.js`**:
  - Engineered client-side authentication session management, Google OAuth credential normalization, and session broadcast events.

---

## 2. Kartik Grewal (Reg. No. 12406604)
**Role:** Geospatial & Campus Mapping Lead

### A. Frontend Architecture & Components
- **`src/components/CampusMap.jsx` & `src/app/explore/page.js`**:
  - Built the interactive 2D vector SVG campus map canvas supporting coordinate scaling, drag/pan navigation, building node highlighting, and dynamic route path rendering.
  - Developed the interactive facility inspector HUD displaying entrance ramp conditions and lift statuses upon clicking map nodes.
- **`src/components/RouteCard.jsx`**:
  - Designed step-by-step route breakdown cards displaying distance meters, walking times, accessible badges, and waypoint turn sequences.
- **`src/components/BuildingCard.jsx`**:
  - Created compact campus block audit cards with category quick-filters (Academic, Library, Recreation, Residential).

### B. Backend Infrastructure & Algorithms
- **`src/lib/campusData.js` (Geodata & Network Modeling)**:
  - Conducted physical campus coordinate surveys across Lovely Professional University's 600-acre grounds, mapping all 52 facilities (vertices) into a normalized $(x, y)$ planar grid.
  - Mapped 70+ interconnected corridors, pedestrian avenues, and ramps (edges) with physical lengths, gradient ratios, and step attributes.
- **`src/lib/utils.js` (Spatial Distance & Texture Calculation)**:
  - Implemented Euclidean distance calculators, surface friction indices (concrete, tiles, gravel), and authentic LPU building photo mapping resolvers.
- **`src/app/api/buildings/route.js`**:
  - Developed the facility registry REST API providing search, category filtering, and topological adjacency lists.

---

## 3. Konatala Naveen (Reg. No. 12417251)
**Role:** Full-Stack Audit & Community Lead

### A. Frontend Architecture & Components
- **`src/app/report/page.js`**:
  - Engineered the crowdsourced barrier submission interface with drag-and-drop photo upload, 5MB file validation (JPG/PNG/WEBP), real-time image preview, and verified reporter attribution.
  - Built the live card preview screen confirming real-time hazard publication.
- **`src/components/FeedPost.jsx` & `src/app/feed/page.js`**:
  - Developed the Student Live Wire community platform with category filters (Barrier Reports, Resolutions, Mobility Tips), in-feed photo attachments, and full-screen lightbox modal.
- **`src/components/BuildingChecklist.jsx` & `src/components/BuildingCommunityReports.jsx`**:
  - Implemented the dynamic **2-Lift per Block Rule** (`1 Lift Not Working` amber badge vs `Both Lifts Out of Service` red badge) with direct `[📷 View Photo Proof]` buttons and inspection drawers.
- **`src/components/DashboardRecentAlerts.jsx` & `src/app/dashboard/page.js`**:
  - Created the institutional accessibility audit matrix, facility compliance scorecards (0–100), and recent student hazard dispatches.

### B. Backend Infrastructure & Algorithms
- **`src/lib/reportsStorage.js`**:
  - Built the persistent storage bus (`localStorage` engine), custom window event broadcaster (`stride:report_added`), and seed audit data.
- **`src/app/api/reports/route.js`**:
  - Implemented the barrier ingestion REST API endpoint handling payload validation, timestamping, photo storage, and in-memory queue management.
- **`src/lib/campusData.js` (Institutional Scoring Engine)**:
  - Formulated the multi-dimensional accessibility scoring algorithm weighting ramp compliance (35%), vertical transport (25%), entrance usability (20%), and sanitary facilities (20%).

---

## 📋 File & Module Attribution Directory

| File / Component Path | Primary Author | Subsystem | Frontend Work | Backend Work |
| :--- | :--- | :--- | :--- | :--- |
| `src/lib/pathfinding.js` | **Pravesh (12419500)** | Core Engine | Dynamic route state hooks | Weighted Dijkstra algorithm & step filtering |
| `src/components/Campus360Viewer.jsx`| **Pravesh (12419500)** | Visual Engine | 360° VR canvas & sensor HUD | Hotspot coordinate projection math |
| `src/lib/auth.js` | **Pravesh (12419500)** | Auth Engine | Google OAuth modal integration | Session storage bus & credential normalization |
| `src/app/api/routes/route.js` | **Pravesh (12419500)** | Routing API | Client fetch integration | Query parsing & path calculation endpoint |
| `src/components/CampusMap.jsx` | **Kartik Grewal (12406604)** | Mapping Engine | 2D vector SVG map canvas | Coordinate scaling & path interpolation |
| `src/lib/campusData.js` (Graph) | **Kartik Grewal (12406604)** | Geodata Engine | Category filtering controls | 52-block graph topology & 70+ edge weights |
| `src/app/explore/page.js` | **Kartik Grewal (12406604)** | Map Explorer | Route calculation form & HUD | Adjacency list querying & filtering |
| `src/app/api/buildings/route.js` | **Kartik Grewal (12406604)** | Facility API | Client state synchronization | Facility serialization & search query handler |
| `src/app/report/page.js` | **Konatala Naveen (12417251)**| Barrier Audit | Drag-and-drop 5MB upload UI | Client-side validation & payload assembly |
| `src/lib/reportsStorage.js` | **Konatala Naveen (12417251)**| Storage Bus | Real-time reactive re-renders | Storage event pipeline & persistence schema |
| `src/app/api/reports/route.js` | **Konatala Naveen (12417251)**| Reports API | In-feed submission handlers | REST request validation & queue ingestion |
| `src/components/BuildingChecklist.jsx`| **Konatala Naveen (12417251)**| Building Audits| 2-Lift dynamic badges & photo proof | Ground-truth condition evaluation logic |
| `src/app/dashboard/page.js` | **Konatala Naveen (12417251)**| Compliance Matrix| Institutional scorecards & stats | Multi-attribute weighted scoring algorithm |
