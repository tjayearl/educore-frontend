# 🎓 Educore - Learning Management System

Educore is a full-stack Learning Management System (LMS) designed to facilitate seamless online education. It features distinct portals for **Learners** to browse courses and track progress, and for **Administrators** to manage course content, lessons, and monitor platform activity.

The system is built with a modern tech stack, utilizing a hybrid database architecture to optimize for both relational integrity and content flexibility.

---

## ️ Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS for responsive design
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js & Express.js
- **Architecture:** RESTful API
- **Deployment:** Render (Web Service)

### Databases (Hybrid Architecture)
- **PostgreSQL:** Handles Users, Auth, and Course Metadata (Structured Data).
- **MongoDB:** Handles Lesson Content, User Progress, and Audit Logs (Document Data).

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Frontend Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd educore-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:5173`.

### Backend Connection
The frontend is currently configured to connect to the live production backend hosted on Render.
- **API URL:** `https://educore-backend-7p4o.onrender.com/api`

If you wish to run the backend locally, update `src/services/api.js` to point to `http://localhost:5000/api` after starting the backend server.

---

##  API Documentation

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | | |
| POST | `/auth/register` | Register a new user (Learner/Admin) |
| POST | `/auth/login` | Login and receive JWT |
| **Courses** | | |
| GET | `/courses` | List all available courses |
| GET | `/courses/:id` | Get specific course details |
| POST | `/courses` | Create a new course (Admin only) |
| DELETE | `/courses/:id` | Delete a course (Admin only) |
| **Lessons** | | |
| GET | `/courses/:id/lessons` | Get all lessons for a course |
| POST | `/courses/:id/lessons` | Add a lesson to a course (Admin only) |
| DELETE | `/courses/:courseId/lessons/:lessonId` | Delete a lesson (Admin only) |
| **Progress** | | |
| GET | `/progress/:courseId` | Get user's progress for a course |
| POST | `/progress/:cId/lessons/:lId/complete` | Mark a lesson as completed |
| **Activity** | | |
| GET | `/activities/all` | Get system-wide audit logs (Admin only) |

---

## 🗄️ Database Design Choices

We utilized a **Hybrid Database Architecture** to leverage the strengths of both SQL and NoSQL systems.

### 1. PostgreSQL (SQL) - Users & Metadata
**Why?** User accounts, authentication data, and high-level course metadata require strict schemas and referential integrity.
- **Benefits:** ACID compliance ensures transactional reliability. Relational structure makes it easy to map relationships between users and their roles.

### 2. MongoDB (NoSQL) - Content & Progress
**Why?** Lesson content (text, video URLs) and user progress tracking are dynamic and often hierarchical.
- **Benefits:** Flexible schema allows different lesson types without altering table structures. Storing progress as nested documents/arrays provides faster read performance for the student dashboard without complex joins.

---

## 🏗️ Microservices Strategy

While currently built as a modular application, Educore is designed to be easily split into microservices as it scales:

1.  **Identity Service:** Independent handling of Auth (Login/Register) using PostgreSQL.
2.  **Catalog Service:** Manages Course metadata and discovery.
3.  **Content Service:** Dedicated to serving lesson content (MongoDB), allowing for independent scaling for heavy read traffic.
4.  **Tracker Service:** Handles high-frequency write operations for User Progress and Analytics.

**Communication:** Services would communicate via REST APIs or a message queue (e.g., RabbitMQ) for asynchronous events like "Course Completed" -> "Issue Certificate".

---

## 💭 Reflections & Trade-offs

### Design Decisions
- **React + Vite:** Chosen for speed and optimal developer experience. Vite provides instant server start, crucial for rapid iteration.
- **JWT Authentication:** Stateless authentication reduces the load on the database for every request, improving scalability.

### Trade-offs
- **Hybrid Database Complexity:** Maintaining two database connections (Postgres & Mongo) increases operational complexity (backups, migrations) but offers significant performance benefits for specific data types.
- **Tailwind CSS:** While it speeds up development, it can lead to cluttered HTML. Componentization in React mitigates this issue.
- **Separation of Concerns:** separating the frontend completely from the backend allows for independent deployment and scaling, but introduces CORS and API synchronization challenges compared to a full-stack framework like Next.js or Remix.

---

## 👨‍💻 Author
**Tjay Earl**  
*KBC Junior Full-Stack Developer Assessment*
