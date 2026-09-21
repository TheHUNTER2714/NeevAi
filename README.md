# NeevAI (नींव AI) — Foundational Learning Diagnostics & Action Engine
live link https://neevai-ov80.onrender.com

> **Empowering Teachers to See Invisible Learning Gaps in Multi-Grade Classrooms and Take 15-Minute Concrete Action.**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)
[![Built with React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg)](https://tailwindcss.com)

---

## 📖 Pedagogical & Research Foundations

NeevAI is grounded in foundational empirical research and national education policy reform in India:

### 1. What Can You Read to Advance Your Understanding?
* **[The great fiction of India’s classrooms (Frontline, 2025)](https://frontline.thehindu.com/the-nation/education/multigrade-multilevel-classrooms-india-policy-reform/article69909413.ece%20(2025))**:
  Exposes the structural reality that Indian classrooms are inherently multi-grade and multi-level (MGML). In a standard classroom of 40 children, up to 5 distinct foundational skill tiers coexist. Rigid syllabus pacing forces teachers to lecture ahead, causing vulnerable children to drop off the learning cliff.
* **[Teaching at the Right Level (TaRL) to improve learning (J-PAL, 2022)](https://www.povertyactionlab.org/case-study/teaching-right-level-improve-learning)**:
  Over 20 years of randomized evaluations across 60M+ children prove that grouping children by current learning readiness rather than age/grade generates **+0.70 SD gains** in reading and arithmetic within 40–50 instruction days.

---

## 🛠️ Assessment Frameworks & Toolkits Integrated

NeevAI’s screening and cognitive diagnostic engine directly incorporates the following standard toolkits:

1. **[CBSE Foundational Literacy & Numeracy (FLN) Assessment Toolkit & Question Banks](https://cbseacademic.nic.in/fln/teacher-corner.html)**:
   Calibrates Grade 1–3 competency rubrics, learning outcome codes (e.g., **M301: 2-Digit Subtraction with Regrouping**, **L304: Sentence Reading Fluency**), and NIPUN Bharat learning milestones.
2. **[ASER Basic Reading & Maths Assessment (Pratham DIYA)](https://asercentre.org/do-it-yourself-aser-diya/)**:
   Powers the 4-tier literacy screener (Letters → Words → Paragraph → Grade 2 Story) and the gold-standard 2-digit subtraction screener ($52 - 27$).
3. **[Early Grade Reading Assessment (EGRA) Toolkit](https://shared.rti.org/content/early-grade-reading-assessment-egra-toolkit-second-edition)**:
   Drives our real-time browser Speech AI for Words Correct Per Minute (WCPM) tracking, oral cadence analysis, and conjunct consonant (संयुक्त अक्षर) decoding.
4. **[Early Grade Mathematics Assessment (EGMA) Toolkit](https://shared.rti.org/content/early-grade-mathematics-assessment-egma-toolkit)**:
   Informs quantity discrimination ($7 \text{ vs } 5$), number identification, and place-value decomposition diagnostics.

---

## 🌟 Key Features

* **Octopii Kinetic Fluid Branding**: High-performance organic SVG multi-tentacle kinetic logo with dynamic breathing and trailing gradients.
* **Direct Child Screener**:
  * Step 0: Quantity Discrimination ($7 \text{ vs } 5$) with child-friendly fruit counters.
  * Step 1: Subtraction arithmetic diagnostic puzzle ($52 - 27 = ?$) with touch keypad (no spoilery hints).
  * Step 2: Oral reading screener with Web Speech API, live word highlighting, WCPM, and accuracy tracking.
  * Step 3: **Student Diagnostic Summary**:
    * Mapped directly to **CBSE FLN M301** & **ASER DIYA**.
    * Pinpoints the exact cognitive mechanism (e.g., **$52 - 27 = 35$** is diagnosed as *Top-From-Bottom Independent Inversion*).
    * Prescribes a zero-cost 15-minute concrete manipulative protocol (*10-Rupee Note & Coin Exchange*).
    * Places child in the optimal **J-PAL TaRL** cohort (*Group B — Developing* vs *Group C — Fluent*).
* **Teacher Cockpit**:
  * Multi-grade cohort clustering and X-Ray slider showing the reality gap.
  * Student profiles with 5-day step-by-step remediation plans.
  * Bilingual interface (English & Hindi) with time-aware pedagogical greetings.
* **Ask NeevAI**: Contextual classroom pedagogical assistant for rural multi-grade teachers.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/TheHUNTER2714/NeevAi.git
cd NeevAi

# Install dependencies
npm install

# Start local Vite dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploy to Render

This project is configured for 1-click deployment to **Render** as a Static Site.

### Automatic Blueprint Deployment
When pushing to GitHub, Render automatically reads [`render.yaml`](render.yaml):
- **Service Type**: Static Site
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Routing**: Automatically rewrites `/*` to `/index.html`

### Manual Configuration on Render Dashboard
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Static Site**.
3. Connect your GitHub repository: `TheHUNTER2714/NeevAi`.
4. Set:
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
5. Click **Create Static Site**.

---

## 📄 License
MIT License. Built for teachers, researchers, and foundational education reformers across India.
