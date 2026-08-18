# DevFlow AI — Engineering Decisions

## 1. Why this approach?

I chose **React 19 with Vite, Tailwind CSS, and custom CSS design tokens** because the assessment evaluates frontend judgment, restrained motion, responsive behavior, and clear product demonstration. 

- **Component Architecture:** I decomposed the interface into distinct, modular components (`Navbar`, `Hero`, `ProductPreview`, `Features`, `Workflow`, `CTA`, `Footer`) managed by a unified `ThemeProvider` context.
- **Product Preview as the Anchor:** Rather than simply describing what DevFlow does, the interactive dashboard is the centerpiece. It demonstrates real workflow decomposition, reactive subtask checkoffs with live sprint progress recalculation, and a 5-tab workspace interface (`Dashboard`, `Projects`, `Tasks`, `Analytics`, `Settings`).
- **Restrained Motion Design:** Rather than overloading the page with distracting floating elements or continuous loops, I implemented a single choreographed load sequence (Hero header $\rightarrow$ interactive dashboard scale-in $\rightarrow$ telemetry progress bar animation) with subtle CSS transitions elsewhere.
- **Design System & Theme Engine:** Built a cohesive token system with CSS custom properties supporting a complete Dark and Light theme with zero flicker on page load via localStorage pre-hydration.

## 2. Time-limit trade-off

Under time constraints, I prioritized the user experience and depth of the interactive demonstration:

1. **Interactive Demo Depth:** Built live state management for task checkoffs, quick-plan creation, and full 5-tab switching rather than static screenshots.
2. **True Responsive Adaptation:** Rigorously tested against the target **390px** mobile viewport (collapsible navigation drawer, reflowed metric cards, zero horizontal scrolling) and **1440px** desktop viewports.
3. **Honesty & Believability:** Zero invented statistics, fake testimonials, or fabricated logos. The messaging focuses exclusively on authentic developer workflow benefits.

With more time, I would connect the interface to a live WebAssembly-based local LLM runner or OpenAI/Anthropic API key integration and add persistent IndexedDB storage for offline project management.

## 3. AI usage

AI tools were used as an engineering assistant for ideation, drafting initial component boilerplate, and exploring CSS variable pairings.

All component logic, state management, responsive reflow styles, and interaction designs were reviewed, refactored, and verified directly. Every technical decision in this codebase is deliberate and can be defended in an engineering interview.
