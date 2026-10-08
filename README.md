# 📰 Bangla News 24

### Modern Bengali Newspaper Platform with Next.js & Better Auth

A modern, responsive, and authentication-enabled Bengali newspaper platform built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Better Auth**.

**Bangla News 24** focuses on delivering Bengali news through a clean editorial interface while providing a complete authentication and account-management experience.

[![Live Demo](https://img.shields.io/badge/Live_Demo-bangla--brief.vercel.app-c40004?style=for-the-badge&logo=vercel&logoColor=white)](https://bangla-brief.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-7C3AED?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)

<!-- <p align="center">
  <a href="https://bangla-brief.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Bangla%20Brief-DC2626?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/marleyDip/Programming-Hero_Milestone-07_Module-40-41_Next.js-Project-with-Authentication-BetterAuth_Newspaper">
    <img src="https://img.shields.io/badge/GitHub-Repository-18181B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
</p> -->

<!--
  Add screenshots here once you have them, for example:

  ![Home page](./public/screenshots/home.png)
  ![Article page](./public/screenshots/article.png)
-->

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Project Highlights](#-project-highlights)
- [Features](#-features)
- [Authentication](#-authentication)
- [Account Management](#-account-management)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Run the App](#run-the-app)
- [Available Scripts](#-available-scripts)
- [Architecture Notes](#architecture-notes)
- [Authentication Flow](#-authentication-flow)
- [Design & UX](#-design--ux)
- [Performance & UX Considerations](#-performance--ux-considerations)
- [What I Learned](#-what-i-learned)
- [Deployment](#deployment)
- [Future Improvements](#-future-improvements)
- [Project Structure](#-project-structure)
- [Data Source and Credits](#data-source-and-credits)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🚀 Overview

**Bangla News 24** is a Bangla-language news website that brings Bangladesh and world news together in one place. It is designed like a modern digital front page: a lead story, top stories, curated sections, a live headline ticker and a most-read list, all in a clean, responsive interface.

This bengali news web application developed as part of my **Programming Hero Milestone 07 - Next.js Project with Authentication** learning journey.

The project combines a newspaper-style editorial interface with a modern authentication system powered by **Better Auth**.

The application provides:

- Bengali news browsing
- Category-based news navigation
- Dynamic news pages
- Responsive editorial layouts
- User registration and authentication
- Session management
- Profile management
- Email management
- Password management
- Authentication feedback and loading states
- Modern responsive UI

The project is designed with a strong focus on **clean architecture, reusable components, type safety, responsive design, and real-world authentication patterns**.

---

## 🌐 Live Demo

### 🔴 [Bangla News 24 — Live Website](https://bangla-brief.vercel.app/)

> Explore the deployed application and experience the complete news browsing and authentication interface.

---

## ✨ Project Highlights

| Area | Highlights |
| --- | --- |
| 📰 News | Bengali newspaper-style news platform |
| 🔐 Authentication | Better Auth-powered authentication |
| 👤 User Accounts | Profile and account management |
| 📧 Email | Email address management |
| 🔑 Security | Password change and session management |
| 🗄️ Database | MongoDB |
| ⚡ Framework | Next.js 16 App Router |
| 🎨 Styling | Tailwind CSS 4 |
| 💻 Language | TypeScript |
| 📱 Responsive | Mobile-first responsive interface |
| 🔔 Feedback | React Hot Toast notifications |
| 🎯 UI | Editorial, modern, minimal design |

---

## 🎯 Features

### 📰 News Experience

- Browse Bengali news content
- Category-based navigation
- Dynamic category pages
- Responsive news cards
- Editorial-style layouts
- Featured news presentation
- Most-read/news sections
- Dynamic news details
- Loading states
- Error and empty-state handling

**Reading experience**

- Front page with a lead story, top stories and curated sections (Bangladesh, India, World, Health, Video and more)
- Live headline ticker ("সর্বশেষ") that pauses on hover and respects reduced-motion settings
- "সর্বাধিক পঠিত" (most read) list, pinned beside the content on large screens
- Category pages for politics, world, economy, health, sports, technology and video
- Article pages with hero photo, byline, publish and update times, reading time, pull quotes, photo captions and credits, tags and share links
- Bangla dates, times and numerals throughout, in Dhaka time

### 🔐 Authentication

The project implements a complete authentication experience using **Better Auth**.

- User registration
- Email/password sign in
- Session management
- Sign out
- Authentication-aware UI
- Protected user experience
- User profile access
- Authentication loading states
- Success and error feedback

Better Auth provides the authentication layer while the Next.js App Router handles the application structure and routing.

### 👤 Account Management

Authenticated users can manage their account through a dedicated account center.

#### Profile

- Update display name
- Update profile image URL
- Live profile preview
- User avatar fallback
- Account information display

#### Email

- View current email
- Request an email address change
- Email verification flow support
- User-friendly success/error feedback

#### Password

- Change current password
- New password validation
- Confirm password validation
- Password visibility controls
- Loading state
- Session security handling

### 🔔 Interactive Feedback

The application provides clear feedback during authentication and account operations.

- Loading toast
- Success toast
- Error toast
- Loading buttons
- Disabled form controls during requests
- Spinner states
- Skeleton loading UI

---

## 🔐 Authentication

Authentication is implemented with **Better Auth** and its MongoDB adapter.

### Authentication Stack

```text
Next.js
   │
   ├── Auth UI
   │
   ├── Better Auth Client
   │
   └── Better Auth Server
            │
            └── MongoDB
```

The Better Auth Next.js integration exposes the authentication handler through the App Router and provides a client API for operations such as sign-up, sign-in, and session handling.

### Supported Operations

```text
Sign Up
   ↓
Sign In
   ↓
Create Session
   ↓
Access Account
   ↓
Update Profile
   ↓
Change Email
   ↓
Change Password
   ↓
Sign Out
```

---

## 🗄️ Database

The application uses **MongoDB** as the authentication database.

Better Auth is connected through:

```text
@better-auth/mongo-adapter
        ↓
      MongoDB
        ↓
Bangla News 24 Database
```

The project currently uses the database:

```text
Bangla-news-24
```

> Never commit your MongoDB connection string, Better Auth secret, or other private environment variables to Git.

---

## 🛠️ Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-16.3.8-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router
- Server Components
- Client Components

### Authentication & Database

![Better Auth](https://img.shields.io/badge/Better_Auth-1.7.7-000000?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)

- Better Auth
- `@better-auth/mongo-adapter`
- MongoDB
- Session-based authentication

### UI & Developer Experience

- Lucide React
- React Hot Toast
- React Marquee Text
- ESLint
- TypeScript
- React Compiler

---

## 🏗️ Project Architecture

The project follows the **Next.js App Router** architecture.

```text
┌──────────────────────────────────────┐
│              Next.js                 │
│             App Router               │
└──────────────────┬───────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   News Platform        Authentication
        │                     │
        │               Better Auth
        │                     │
        │                     ▼
        │                  MongoDB
        │
        ▼
 Categories
 News
 Details
 User Experience
```

The architecture separates application concerns into reusable pages, components, libraries, authentication logic, and API-related utilities.

---

## 📁 Project Structure

A simplified representation of the project structure:

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── profile/
│   │
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │
│   ├── category/
│   ├── news/
│   ├── loading.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   ├── news/
│   ├── shared/
│   └── ...
│
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   ├── api.ts
│   └── ...
│
└── ...
```

> The exact structure may evolve as the project continues to develop.

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- **Node.js** 20.9 or newer
- **npm** (a `package-lock.json` is included)
- A **MongoDB** database, either local or on [MongoDB Atlas](https://www.mongodb.com/atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/marleyDip/Programming-Hero_Milestone-07_Module-40-41_Next.js-Project-with-Authentication-BetterAuth_Newspaper.git

# 2. Move into the project folder
cd Programming-Hero_Milestone-07_Module-40-41_Next.js-Project-with-Authentication-BetterAuth_Newspaper

# 3. Install dependencies
npm install
```

### 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Better Auth
BETTER_AUTH_SECRET=replace-with-a-long-random-string
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>

# Social login (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site, used for canonical links, Open Graph and structured data |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions. Generate one with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL of the app (use your production URL when deploying) |
| `MONGODB_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth credentials from the [Google Cloud Console](https://console.cloud.google.com/) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | OAuth credentials from your GitHub account's [developer settings](https://github.com/settings/developers) |

> **Note:** Keep `.env.local` out of version control. It is already ignored by `.gitignore`. Make sure the variable names match the ones used in your Better Auth configuration.

For social login, register these callback URLs with each provider (adjust the domain for production):

```text
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page with the lead story, sections and most-read list |
| `/category/[categoryId]` | News for a single category |
| `/news/[newsId]` | Full article page |
| `/signin` | Sign in |
| `/signup` | Sign up |
| `/about`, `/contact`, `/advertise`, `/privacy`, `/terms` | Site information pages linked from the footer |

---

## Architecture Notes

- **Server Components first.** Pages fetch their data on the server, so the browser receives ready-to-read HTML and very little JavaScript.
- **Cached data layer.** All API calls live in `src/lib/api.ts` and use Next.js caching (`use cache` with `cacheLife` and `cacheTag`). Failures are never cached, and the header and footer degrade gracefully if the API is unavailable.
- **One source of truth.** Site name, tagline and URL come from a single config, so metadata, structured data and the footer always agree.
- **Dhaka time everywhere.** Date helpers format Bangla dates and times in the `Asia/Dhaka` time zone, so readers see the same day as the server.
- **Design tokens in CSS.** Brand colors, shadows and reusable utilities (buttons, focus ring, nav link) are defined once in `globals.css` with Tailwind v4.
- **Accessibility and motion.** Animations are opt-in through `prefers-reduced-motion`, and interactive elements keep a visible focus ring.

---

## 🔄 Authentication Flow

### Registration

```text
User
 │
 ▼
Sign Up Page
 │
 ▼
Better Auth Client
 │
 ▼
Better Auth Server
 │
 ▼
MongoDB
 │
 ▼
User Account Created
```

### Sign In

```text
User
 │
 ▼
Sign In Form
 │
 ▼
Better Auth
 │
 ▼
Credentials Verified
 │
 ▼
Session Created
 │
 ▼
Authenticated User
```

### Profile Management

```text
Authenticated User
        │
        ▼
   Profile Page
        │
   ┌────┼─────┐
   ▼    ▼     ▼
Profile Email Password
   │    │     │
   └────┼─────┘
        ▼
   Better Auth
        │
        ▼
     MongoDB
```

---

## 🎨 Design & UX

The interface follows a modern editorial design language inspired by digital newspaper platforms.

### Design Principles

- Clean editorial hierarchy
- Strong typography
- Red/danger accent system
- Neutral backgrounds
- Minimal visual noise
- Responsive layouts
- Accessible interactive states
- Consistent spacing
- Rounded modern cards
- Subtle shadows
- Clear loading states

### Authentication UI

The authentication experience includes:

- Focused sign-in/sign-up layouts
- Responsive form cards
- Password visibility controls
- Loading buttons
- Toast notifications
- Skeleton loading screens
- Error states
- Account navigation

---

## ⚡ Performance & UX Considerations

The project takes advantage of modern Next.js patterns to provide a responsive experience.

### Next.js App Router

The application uses the App Router to organize pages and layouts while taking advantage of Server and Client Components where appropriate.

### Loading UI

Dedicated loading states help maintain a smooth transition while pages and authentication-related operations are being processed.

### Client Interactions

Client Components are used only where browser-side interaction is required, such as:

- Authentication forms
- Password visibility
- Profile editing
- Account navigation
- Toast notifications
- Session-aware UI

### Feedback

Long-running operations provide immediate feedback through:

```text
User Action
    ↓
Loading State
    ↓
Request
    ↓
Success / Error
    ↓
Toast Feedback
```

---

## 📚 What I Learned

This project helped strengthen my understanding of modern Next.js application development and authentication architecture.

### Next.js

- App Router
- Dynamic routes
- Server Components
- Client Components
- Loading UI
- Route organization
- Data fetching
- Metadata and SEO concepts

### Authentication

- Better Auth
- Authentication sessions
- Social Authentication (Google, Github)
- User management
- Sign in / sign up flows
- Protected user experiences
- Password management
- Email management
- Authentication feedback

### Database

- MongoDB
- Better Auth MongoDB adapter
- User/session persistence
- Database-backed authentication

### TypeScript

- Strongly typed form handling
- React event types
- API response handling
- Component props
- State management

### UI Engineering

- Responsive layouts
- Loading skeletons
- Form UX
- Error handling
- Toast feedback
- Accessible interactive controls
- Reusable UI patterns

---

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/):

1. Push the repository to GitHub.
2. Import the project on Vercel.
3. Add every variable from [Environment Variables](#environment-variables) in **Project Settings → Environment Variables**, using your production URL for `NEXT_PUBLIC_SITE_URL` and `BETTER_AUTH_URL`.
4. Update the OAuth callback URLs at Google and GitHub to use your production domain.
5. Deploy.

If you use MongoDB Atlas, allow your hosting provider's IP addresses in **Network Access**.

---

## 🔮 Future Improvements

Planned improvements may include:

- [ ] Email verification
- [ ] Forgot/reset password flow
- [ ] User preferences
- [ ] Saved/bookmarked news
- [ ] Reading history
- [ ] Search experience
- [ ] Advanced news filtering
- [ ] Dark mode
- [ ] Improved accessibility auditing
- [ ] Expanded user dashboard
- [ ] More personalized news recommendations

---

## Data Source and Credits

News content is loaded from a third-party API at `news-api-v2.vercel.app`. The articles it returns originate from **BBC Bangla** and carry their own photo credits (for example Getty Images and Reuters). Every article page links back to the original report.

**Disclaimer:** This is an educational and portfolio project. All article text, photographs and trademarks belong to their respective owners, and they are shown here for demonstration purposes only. If you are a rights holder and would like content removed, please open an issue.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Fork the repository

```bash
git fork
```

### Clone your fork

```bash
git clone <your-fork-url>
```

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git add .
git commit -m "feat: add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project was created for educational and portfolio purposes as part of my **Programming Hero** learning journey.

---

## 👨‍💻 Author

<div align="center">

  <h2>✨ Md. Sofian Hasan ✨</h2>

  <p>
    <strong>Software Engineer | Full-Stack (MERN / PERN) Developer</strong>
  </p>

  <p align="center">

[![🌐 Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Website-0A0A0A?style=for-the-badge)](https://marleydip.netlify.app/)
&nbsp;
[![💻 GitHub](https://img.shields.io/badge/💻_GitHub-View_Profile-181717?style=for-the-badge&logo=github)](https://github.com/marleyDip)

</p>

</div>

<p align="center">
  Passionate about building <strong>modern, scalable, and user-focused web applications</strong> while continuously strengthening <b><i>JavaScript, TypeScript, problem-solving, and full-stack development skills</i></b>.
</p>

### 🚀 Tech Focus

<div align="center">

<img src="https://skillicons.dev/icons?i=js,ts,react,nextjs,tailwind,nodejs,express,nestjs,mongodb,postgres" alt="Tech Stack" />

<br /><br />

<img src="https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge" alt="MERN Stack" />
<img src="https://img.shields.io/badge/PERN-Stack-336791?style=for-the-badge" alt="PERN Stack" />

</div>

---

<p align="center">

### 📰 Built with Next.js · TypeScript · Better Auth · MongoDB

**Learn → Build → Debug → Improve → Repeat**

</p>