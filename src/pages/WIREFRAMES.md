# Educore LMS - UI Wireframes & Design Documentation

## Design Philosophy
- **Student Portal**: Clean, modern, welcoming (blue/purple gradients)
- **Admin Portal**: Professional, authoritative (dark slate theme)
- **Mobile-First**: Responsive design for all screen sizes
- **Accessibility**: High contrast, clear typography, ARIA labels

---

## 1. Student Login Page
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

## 2. Student Dashboard
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

---

## 3. Course Details Page
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

---

## 4. Admin Dashboard
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

## 5. Create Course Modal (Admin)
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

---

## 6. User Activities Page (Admin)
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

## Design Decisions

### Color Palette
- **Student Portal**: 
  - Primary: Blue (#2563eb)
  - Accent: Purple (#8b5cf6)
  - Background: Light gray (#f9fafb)

- **Admin Portal**:
  - Primary: Slate (#1e293b)
  - Accent: Red (#dc2626)
  - Background: Dark gray (#0f172a)

### Typography
- Font Family: Inter, system-ui, sans-serif
- Headings: Bold (700)
- Body: Regular (400)
- Small text: Medium (500)

### Component Patterns
- **Cards**: Rounded corners (0.75rem), subtle shadows
- **Buttons**: Rounded (0.5rem), hover states, loading indicators
- **Forms**: Clear labels, inline validation, error messages
- **Modals**: Centered overlay, backdrop blur, escape to close

### Responsive Breakpoints
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

---

## User Flow Diagrams

### Student Registration Flow
```
Start → Register Page → Fill Form → Submit
  ↓
Validation Error? → Show Error → Back to Form
  ↓
Success → Store Token → Redirect to Dashboard
```

### Admin Course Creation Flow
```
Dashboard → Click "Create Course" → Modal Opens
  ↓
Fill Form → Submit → Validation
  ↓
Success → Close Modal → Refresh Course List → Show Toast
```

### Lesson Completion Flow
```
Course Details → Select Lesson → View Content
  ↓
Click "Mark Complete" → API Call → Update Progress
  ↓
Success → Update UI → Show Checkmark → Update Progress Bar
```

---

## Accessibility Features
- ✅ Semantic HTML5 elements
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation support
- ✅ High contrast text (WCAG AA)
- ✅ Focus indicators on interactive elements
- ✅ Alt text for all images/icons

---

## Mobile Considerations
- Touch-friendly button sizes (min 44px)
- Simplified navigation (hamburger menu)
- Single-column layouts
- Larger text for readability
- Bottom navigation for key actions