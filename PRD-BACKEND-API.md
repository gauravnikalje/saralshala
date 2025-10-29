# PRD: Backend API for Kataria English Medium School

## 1. Objective

This document outlines the requirements for building a new, robust backend API for the "Kataria English Medium School" project. The goal is to create a secure, scalable, and well-documented API that will serve as the backbone for the new React-based frontend.

This project will replace the current fragmented backend logic and provide a centralized server to handle all business logic, database interactions, and external services.

---

## 2. Getting Started: Your Workflow

**To begin your work, follow these steps:**

1.  **Create a New Taskmaster Context:** Open your terminal in the project root and create a new, isolated task list for the backend work by running:
    ```bash
    task-master add-tag backend-api --description="Tasks for building the new backend API"
    ```

2.  **Switch to Your New Context:** Make your new tag the active one:
    ```bash
    task-master use-tag backend-api
    ```

3.  **Generate Your Task List:** Use this PRD to create your high-level project plan automatically:
    ```bash
    task-master parse-prd PRD-BACKEND-API.md
    ```

4.  **Begin Work:** You now have a clean set of tasks. Start by listing them (`task-master list`) and then viewing the details of the first task (`task-master show 1`).

---

## 3. Key Features & Epics

The backend development will be structured around the following key epics:

### Epic 1: Project Scaffolding & Foundational Setup

-   **Description:** Initialize the new backend project using a modern Node.js framework and establish a clean, scalable architecture.
-   **Requirements:**
    -   Initialize a new Node.js project in a new `/server` or `/api` directory.
    -   Set up an Express.js (or similar, like Fastify) server.
    -   Implement a structured folder layout (e.g., `/routes`, `/controllers`, `/services`, `/middleware`).
    -   Configure environment variables (`.env`) for Supabase credentials, JWT secrets, etc.
    -   Establish a connection to the Supabase database.

### Epic 2: User Authentication API

-   **Description:** Build a complete, secure set of endpoints for user authentication and authorization.
-   **Requirements:**
    -   **Registration:** `POST /api/auth/register` endpoint for new user creation with password hashing (bcrypt).
    -   **Login:** `POST /api/auth/login` endpoint that verifies credentials and returns a JSON Web Token (JWT).
    -   **User Profile:** `GET /api/auth/me` protected endpoint to fetch the logged-in user's profile.
    -   **Middleware:** Create JWT validation middleware to protect routes.
    -   **Role-Based Access Control (RBAC):** Implement logic to handle different roles (Teacher, Principal).

### Epic 3: School Data Management APIs

-   **Description:** Create a full suite of CRUD (Create, Read, Update, Delete) endpoints for managing core school data.
-   **Requirements:**
    -   Endpoints for `Students`.
    -   Endpoints for `Teachers`.
    -   Endpoints for `Classes`.
    -   Endpoints for `Timetables`.
    -   Endpoints for `Notices`.
    -   All endpoints must be protected by the authentication middleware and respect user roles.

### Epic 4: Core Functionality APIs

-   **Description:** Build the endpoints to handle the main operational features of the application.
-   **Requirements:**
    -   **Attendance API:** Endpoints to submit and retrieve student attendance records.
    -   **Grades API:** Endpoints to manage and view student grades.
    -   **Enquiry Form API:** A public endpoint `POST /api/enquiry` to handle submissions from the new frontend's enquiry form.

### Epic 5: Production-Ready SMS Integration

-   **Description:** Integrate a real SMS gateway service to replace the current mock implementation.
-   **Requirements:**
    -   Choose and integrate a production-grade SMS provider (e.g., Twilio).
    -   Create a secure service to handle sending messages.
    -   Implement the "Absence Alert" functionality by creating a protected endpoint that triggers SMS notifications.

---

## 4. Technology Stack

-   **Framework:** Node.js with Express.js
-   **Database:** Supabase (PostgreSQL)
-   **Authentication:** JSON Web Tokens (JWT)
-   **SMS Provider:** Twilio or a similar service.
