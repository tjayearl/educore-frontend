# 🎓 Educore - Learning Management Platform

Educore is a web-based learning management system designed for students and administrators across all levels of education — from primary school to university.

The platform allows students to manage their classes, assignments, exams, and grades, while administrators can oversee and manage the system.

---

## 🚀 Features

### 👨‍🎓 Student Dashboard
- View overview (dashboard summary)
- Add and manage classes
- Track assignments (pending, submitted, graded)
- View upcoming and completed exams
- Monitor grades and performance
- View teachers and subjects
- Personalized student profile

### 🛠️ Admin Dashboard
- Manage users (students/admins)
- View system overview
- Monitor activity and data

---

## 🧩 Sections in the Student Dashboard

### 📊 Dashboard
- Quick stats (classes, assignments, exams, grades)
- Upcoming activities
- Recent activity

### 📚 Classes
- Add classes
- View class details
- See teacher and schedule
- View topics covered

### 📝 Assignments
- View all assignments
- Submit assignments
- Track status (Pending / Submitted / Graded)

### 🧪 Exams
- View upcoming exams
- View completed exams
- See results and performance

### 🎓 Grades
- Overall performance
- Grades per subject
- Detailed breakdown

### 👤 Profile
- Add student details
- Customize learning info

---

## 🛠️ Tech Stack

- HTML
- CSS (Tailwind CSS)
- JavaScript (React + Vite)
- JSON Server (`db.json`) for data storage
- Vite (development server)

---

## 📁 Project Structure

```
educore-frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── db.json
```

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   ```

2. Navigate into the project:
   ```bash
   cd educore-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start JSON server (for backend simulation):
   ```bash
   npx json-server --watch db.json --port 3000
   ```

## 🔄 CRUD Operations

This project supports:

- **GET** → Fetch data (classes, assignments, etc.)
- **POST** → Add new data
- **PATCH** → Update data
- **DELETE** → Remove data

## 🎯 Project Goals

- Build a functional learning platform
- Practice frontend development (HTML, CSS, JS)
- Implement CRUD operations using db.json
- Create a clean and user-friendly UI
- Simulate real-world application structure

## 📌 Future Improvements

- Authentication system (login/register)
- File uploads for assignments
- Real-time messaging (student ↔ teacher)
- Notifications system
- Performance analytics (charts/graphs)

## 👨‍💻 Author

**Tjay Earl**
