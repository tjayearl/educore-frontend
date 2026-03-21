# Educore LMS - Design Wireframes

**Project:** Learning Management System for Kenya Broadcasting Corporation  
**Designer:** Tjay Earl  
**Date:** March 2026

---

## Why I Chose This Design Approach

I wanted the student side to feel friendly and encouraging - learning should be exciting, not intimidating. That's why I went with softer blues and purples. For the admin side, I needed something that felt more professional and serious, so I went with darker grays and slate colors. Admins are managing a lot of data and need clarity over flashiness.

---

## Student Login

The login page is intentionally simple. No distractions - just email, password, and you're in. I added the eye icon to toggle password visibility because everyone forgets what they typed at some point.
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    EDUCORE LMS                          │
│                   Student Portal                        │
│                                                         │
│   ┌─────────────────────────────────────────────┐      │
│   │                                             │      │
│   │  Email                                      │      │
│   │  ┌───────────────────────────────────────┐ │      │
│   │  │ 📧 student@example.com               │ │      │
│   │  └───────────────────────────────────────┘ │      │
│   │                                             │      │
│   │  Password                                   │      │
│   │  ┌───────────────────────────────────────┐ │      │
│   │  │ 🔒 ••••••••••                    👁️  │ │      │
│   │  └───────────────────────────────────────┘ │      │
│   │                                             │      │
│   │  ┌───────────────────────────────────────┐ │      │
│   │  │         Sign In                       │ │      │
│   │  └───────────────────────────────────────┘ │      │
│   │                                             │      │
│   │  Don't have an account? Register           │      │
│   │                                             │      │
│   └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Student Dashboard

This is where students spend most of their time. I put stats at the top so they can quickly see their progress. The "My Courses" section shows what they're actively working on with progress bars (people love seeing progress bars fill up). Below that is the full catalog with search and filtering.
```
┌──────┬──────────────────────────────────────────────────┐
│      │  Welcome back, John! 👋                         │
│ 📚   │  Continue your learning journey                 │
│      │                                                  │
│ Dash │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ Prog │  │ Enrolled │ │ Lessons  │ │ Progress │        │
│ My C │  │    3     │ │    12    │ │   75%    │        │
│      │  └──────────┘ └──────────┘ └──────────┘        │
│      │                                                  │
│ 🚪   │  My Courses                                     │
│Logout│  ┌────────────────────────────────────────┐     │
│      │  │ JavaScript Fundamentals    [=====>  ] │     │
│      │  │ 3/5 lessons • 60%                     │     │
│      │  └────────────────────────────────────────┘     │
│      │                                                  │
│      │  Browse Courses                                 │
│      │  🔍 Search... [▼ Category]                     │
│      │                                                  │
│      │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│      │  │ Course 1 │ │ Course 2 │ │ Course 3 │        │
│      │  │ Design   │ │ Business │ │ Tech     │        │
│      │  └──────────┘ └──────────┘ └──────────┘        │
└──────┴──────────────────────────────────────────────────┘
```

**Design note:** The sidebar stays fixed so navigation is always accessible. I've used this pattern before and it works really well for dashboards.

---

## Course Details & Lesson Viewer

Split-screen layout here. Lesson list on the left, content on the right. Students can see all lessons at a glance and check off what they've completed. The progress bar at the top is important - it gives immediate feedback on how far they've come.
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Dashboard                                     │
│                                                         │
│ JavaScript Fundamentals                                 │
│ Learn core concepts of JavaScript programming          │
│ Programming • Instructor: Jane Doe                     │
│                                                         │
│ Progress: 3/5 lessons completed [======>    ] 60%      │
│                                                         │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│ Lessons      │  Lesson 1: Variables                    │
│              │                                          │
│ ✅ Lesson 1  │  ┌────────────────────────────────────┐ │
│ ✅ Lesson 2  │  │                                    │ │
│ ✅ Lesson 3  │  │     🎥 Video Content               │ │
│ ⭕ Lesson 4  │  │                                    │ │
│ ⭕ Lesson 5  │  │     [▶️ Watch Video]               │ │
│              │  │                                    │ │
│              │  └────────────────────────────────────┘ │
│              │                                          │
│              │  [✓ Mark as Complete]                   │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

**Why this works:** Students can binge through lessons if they want, or jump around. The checkmarks give that satisfying feeling of accomplishment.

---

## Admin Dashboard

Complete opposite vibe from the student side. Dark theme, serious look. Admins need to see everything at once - total courses, students, lessons. Quick action buttons right below the stats because creating courses is probably the most common task.
```
┌──────┬──────────────────────────────────────────────────┐
│ 🛡️   │  Dashboard Overview                             │
│      │                                                  │
│Admin │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│Panel │  │  Total   │ │  Total   │ │  Total   │        │
│      │  │ Courses  │ │ Students │ │ Lessons  │        │
│ 📊   │  │    12    │ │   248    │ │    56    │        │
│Dash  │  └──────────┘ └──────────┘ └──────────┘        │
│      │                                                  │
│ 📚   │  Quick Actions                                  │
│My C  │  [+ Create Course] [View All Courses]          │
│      │                                                  │
│ 📋   │  Recent Activity                                │
│Act   │  • Admin created "Web Design 101"              │
│      │  • Student John completed Lesson 4             │
│ 🚪   │  • New student registered                      │
│Logout│                                                  │
└──────┴──────────────────────────────────────────────────┘
```

---

## Create Course Modal

Kept this really straightforward. Three fields, that's it. Title, description, category. The modal floats over the dashboard so you don't lose your place.
```
        ┌───────────────────────────────┐
        │ Create New Course         ❌  │
        ├───────────────────────────────┤
        │                               │
        │ Course Title *                │
        │ ┌───────────────────────────┐ │
        │ │ Introduction to...        │ │
        │ └───────────────────────────┘ │
        │                               │
        │ Description *                 │
        │ ┌───────────────────────────┐ │
        │ │ Learn the fundamentals... │ │
        │ │                           │ │
        │ └───────────────────────────┘ │
        │                               │
        │ Category *                    │
        │ ┌───────────────────────────┐ │
        │ │ Programming          ▼    │ │
        │ └───────────────────────────┘ │
        │                               │
        │ ┌───────────────────────────┐ │
        │ │      Create Course        │ │
        │ └───────────────────────────┘ │
        │                               │
        └───────────────────────────────┘
```

**Why a modal?** Faster than navigating to a new page, and admins can quickly create multiple courses in a row.

---

## User Activities (Audit Log)

This is basically a security/compliance thing. Every action gets logged with who did it, when, and whether it succeeded. Green dots for success, red for failures. Helps track down issues and proves everything is being monitored.
```
┌─────────────────────────────────────────────────────────┐
│  User Activities                                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟢 Admin User - CREATE COURSE                   │   │
│  │ admin@test.com • Mar 21, 2026 7:23 AM          │   │
│  │ Status: 201 • Resource: course                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟢 John Student - MARK COMPLETE                 │   │
│  │ john@test.com • Mar 21, 2026 7:15 AM           │   │
│  │ Status: 200 • Resource: progress                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟢 Jane Doe - LOGIN                             │   │
│  │ jane@test.com • Mar 21, 2026 7:10 AM           │   │
│  │ Status: 200 • Resource: user                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Color Choices

**Student Side:**
- Blue (#2563eb) - Trust, calm, professional but approachable
- Purple (#8b5cf6) - Creative, engaging, modern
- Light backgrounds - Easy on the eyes for long study sessions

**Admin Side:**
- Dark slate (#1e293b) - Professional, serious, focus
- Red accents (#dc2626) - For important actions like logout
- Dark theme - Reduces eye strain when admins are working late

---

## What Works on Mobile

All of this collapses nicely on phones:
- Sidebar becomes a hamburger menu
- Stats stack vertically instead of horizontally
- Course cards go single-column
- Touch targets are all 44px minimum (Apple's recommendation)

I tested the layouts on my phone and tablet to make sure nothing breaks.

---

## Technical Stuff I Considered

**Fonts:** Using system fonts (Inter as first choice) so pages load fast. No custom font downloads.

**Performance:** Progress bars and stats update without reloading the whole page. Used React's state management to keep everything snappy.

**Accessibility:** Everything works with keyboard navigation. Screen readers can understand the layout. Color contrast passes WCAG AA standards.

**Browser Support:** Tested on Chrome, Firefox, and Safari. Works on all of them.

---

## If I Had More Time

Things I'd add:
- Dark mode toggle for students
- More detailed analytics for admins (graphs, charts)
- Notifications system
- Course preview before enrolling
- Discussion forums per course

But for an MVP, this covers all the core requirements.