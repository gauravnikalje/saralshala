# PRD: Frontend Rebuild for Kataria English Medium School, Daund

## 1. Objective

This document outlines the requirements for a complete frontend rebuild of the Saralshala project for "Kataria English Medium School, Daund". The goal is to create a modern, professional, and responsive website based on the design and architecture of the reference site: [https://angelschoolspune.com/angel-high-school-junior-collegeloni-kalbhor/](https://angelschoolspune.com/angel-high-school-junior-collegeloni-kalbhor/).

The final product should be a single-page application (SPA) built with a modern technology stack that is scalable, maintainable, and provides an excellent user experience.

## 2. Key Features & Epics

The rebuild will be structured around the following key epics:

### Epic 1: Project Scaffolding & Foundational Setup

-   **Description:** Initialize the new frontend project using modern build tools and set up the core architecture.
-   **Requirements:**
    -   Initialize a new project using Vite with a React template.
    -   Install and configure Tailwind CSS for utility-first styling.
    -   Establish the component-based file structure as outlined in `FRONTEND_ANALYSIS.md`.
    -   Set up a basic deployment pipeline on Vercel or Netlify for continuous integration.

### Epic 2: Core Layout & UI Component Library

-   **Description:** Build the main structural components and a library of reusable UI elements.
-   **Requirements:**
    -   Develop a responsive `Header` component, including the school logo, navigation links, and social media icons.
    -   Develop a comprehensive `Footer` component with quick links and contact information.
    -   Create a library of basic UI components, including `Button` (primary, secondary variants), `Card`, and `Input` fields. These should be styled according to the reference design.

### Epic 3: Development of Page Sections

-   **Description:** Build out the distinct content sections of the main page as individual components.
-   **Requirements:**
    -   **Hero Section:** Create the main landing view with the school's name and primary heading.
    -   **About Section:** Develop the component to display information about the school.
    -   **Mission/Vision Section:** Build the three-column layout for the school's mission, vision, and values.
    -   **Principal's Message Section:** Create the component that includes the principal's photo and message.
    -   **Testimonials Section:** Develop a dynamic section to display parent testimonials, potentially in a carousel.
    -   **Enquiry Form Section:** Build the detailed enquiry form as a standalone component.

### Epic 4: Interactivity & State Management

-   **Description:** Implement the client-side logic to make the application interactive.
-   **Requirements:**
    -   Implement the logic for the mobile navigation menu (hamburger menu).
    -   Add client-side validation to the enquiry form.
    -   Implement smooth-scrolling for on-page navigation links.
    -   Manage the state for the enquiry form and any other dynamic components.

### Epic 5: Finalization & Deployment

-   **Description:** Prepare the application for production.
-   **Requirements:**
    -   Conduct thorough testing across all components and features.
    -   Ensure the website is fully responsive on mobile, tablet, and desktop.
    -   Deploy the final, optimized build to the production environment.

## 3. Technology Stack

-   **Framework:** React.js
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS
-   **Deployment:** Vercel / Netlify
-   **Backend Integration:** Supabase (for future form submissions and data)
