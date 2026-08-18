# DevFlow AI

> **Turn ideas into shipped software.**

DevFlow AI is an AI-powered developer workspace that turns complex engineering tasks and requirements into structured implementation plans, actionable tasks, and measurable development progress — so you can spend less time planning and more time building.

---

## 🚀 Live Demo & Deployment

- **GitHub Repository:** [github.com/Kishan-2483/devflow-ai](https://github.com/Kishan-2483/devflow-ai)
- **Deployment Platform:** Ready for 1-click deployment on [Vercel](https://devflow-ai-seven.vercel.app/) or Netlify.

---

## 🛠 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | **React 19** | Modern concurrent rendering, clean component composition, and hooks. |
| **Build Tool** | **Vite 8** | Sub-second HMR and optimized production bundling (`dist` < 120 kB gzipped). |
| **Styling** | **Tailwind CSS v4 & Vanilla CSS Custom Properties** | Bespoke design tokens, frosted glassmorphism, and responsive breakpoints. |
| **Animation** | **Framer Motion** | Fluid layout transitions, expandable accordions, and choreographed interactions. |
| **Icons** | **Lucide React** | Consistent, lightweight vector iconography. |
| **Typography** | **Inter & Geist Mono (Google Fonts)** | High-contrast, bold hierarchy for technical clarity. |

---

## ✨ Features & Architecture

### 1. Interactive Workspace Preview (Hero Dashboard)
The centerpiece of the landing page is a fully interactive simulation of the DevFlow AI workspace:
- **🤖 AI Planner (Integrated Generator):** Describe any feature or pick from preset templates (*Auth & OAuth System*, *Blog REST API*, *Real-time WebSockets*, *S3 Media Uploads*). Decomposes specs into structured implementation tasks, effort estimates, and blocker risks.
- **⚡ Live Workspace Sync:** Clicking **"Apply to Workspace Tasks"** updates the live Tasks list, Dashboard KPIs, and Progress Ring telemetry in real time.
- **📋 Tasks Tracker:** Interactive checkbox verification, filter tabs (*All*, *Todo*, *Done*), priority chips (*High*, *Medium*, *Low*), and effort tags.
- **📊 Real-time Dashboard:** Live sprint completion percentage, blocker counters, AI risk detection, and audit activity feeds.
- **🌿 Git Commits:** Expandable Git log with commit diff previews, branch labels, and merge statuses.
- **📈 Progress & Velocity:** Dynamic SVG progress ring, module progress breakdown bars, and 7-day velocity chart.

### 2. Comprehensive Landing Page Sections
- **Sticky Glassmorphic Navigation:** Responsive with mobile menu drawer and persistent primary CTA.
- **Positioning Pillars:** *Plan with Clarity*, *Build with Focus*, and *Ship with Confidence*.
- **Workflow Bento Grid:** Features with interactive mini-visualizations (AI planning list, smart checklist, velocity histogram).
- **Product Showcase:** Comprehensive telemetry across sprint modules, AI recommendations, and recent commits.
- **4-Step Execution Flow:** *Describe*, *Plan*, *Build*, *Ship* with high-contrast editorial typography.
- **Interactive AI Copilot Console:** Test natural language queries, blocker diagnostics, and task generation.
- **Security & Privacy Commitment:** Clear documentation on data isolation, access controls, and human-in-the-loop AI boundaries.
- **Accordion FAQ:** Keyboard-navigable question & answer drawer.
- **Enterprise Footer:** Multi-column sitemap, social links, and brand statement.

---

## 📱 Responsive Design & Breakpoints

Built mobile-first and tested rigorously across standard device viewports:
- **Mobile (390px - 600px):** Collapsible navigation drawer, horizontal scrollable tab strip for the workspace dashboard, reflowed metric grids, and touch-friendly tap targets ($\ge 44\text{px}$).
- **Tablet (640px - 820px):** 2-column feature grids and balanced fluid typography.
- **Desktop (1024px - 1440px+):** Full multi-column layouts, expanded sidebar navigation, and glassmorphic elevated frames.

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/Kishan-2483/devflow-ai.git
cd devflow-ai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser: http://localhost:5173
```

## 📦 Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📖 Engineering Rationale

Read [DECISIONS.md](./DECISIONS.md) for full architectural rationale, design decisions, and time-constraint trade-offs.
