# Khush Rajyaguru — Interactive Developer & UI/UX Designer Portfolio

## 1. Project Overview
This project is a responsive, interactive personal portfolio web application built using **Semantic HTML5**, **Modern CSS3**, and **Vanilla JavaScript (ES6+)**. Designed to showcase my background as a Frontend Developer and UI/UX Designer, the application transforms a static resume into a dynamic, user-friendly digital experience.

### Goals & Objectives
* **Professional Showcase:** Present work experience, academic background, certifications, technical skills, and featured projects in a clean, scannable layout.
* **Client-Side Interactivity:** Implement real-time DOM manipulation, state persistence, interactive project browsing, and dynamic task management without external frameworks.
* **User Accessibility & Customization:** Provide seamless Light/Dark mode switching with persistent user preferences and responsive layouts across desktop, tablet, and mobile viewports.
* **Data Integrity:** Enforce strict real-time and submission-time client-side form validation to ensure accurate user inquiries.

---

## 2. Code Structure & File Hierarchy
The project follows a clean separation of concerns, dividing structure, styling, behavior, and media assets into distinct files:

```text
personal-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── IMG/
     └── img-pro.jpeg

```

---

## 3. Setup Instructions
Follow these steps to run and configure the project locally:

1. **Download or Clone the Project Folder:**
   Place `index.html`, `style.css`, `script.js`, and your profile image (`profile.jpg`) inside the same root directory.
2. **Configure Profile Image (Optional):**
   Ensure your portrait image is named `profile.jpg` in the root folder, or update line 55 in `index.html` (`<img src="./profile.jpg" ... />`) to match your image filename.
3. **Launch the Application:**
   * **Option A (Direct Browser):** Double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
   * **Option B (VS Code Live Server — Recommended):** Open the folder in Visual Studio Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## 4. Technical Details: Architecture, Data Structures & JavaScript Features

### Architecture & Event Lifecycle
All JavaScript logic is encapsulated inside a single `DOMContentLoaded` event listener in `script.js`. This guarantees that all HTML elements are fully parsed in the DOM before event listeners or state initializations execute, preventing null-reference errors.

### Data Structures Used
* **Array of Objects (`projectsData`):** Stores structured metadata (`title`, `role`, `tech`, `icon`, `gradient`, and a nested `bullets` array) for the 4 featured projects, enabling O(1) index-based lookup during slide navigation.
* **Array of Task Objects (`tasks`):** Stores `{ text: String, completed: Boolean }` entries for the Development Sprint Tracker, serialized as a JSON string in `localStorage`.
* **CSS Custom Properties (`:root` & `body.dark-mode`):** Manages theme tokens (`--bg-primary`, `--text-primary`, `--card-bar-default`, etc.) so a single class toggle updates the entire UI instantaneously.

### Implemented JavaScript Features & Interactive Elements
1. **Persistent Dark / Light Mode Toggle:**
   * Toggles the `.dark-mode` class on `<body>`, dynamically updates the button icon (`🌙` / `☀️`) and label, and persists the boolean state under `khush_darkMode` in `localStorage` wrapped in `try/catch` blocks for safe fallback.
2. **Interactive Project Carousel / Slider:**
   * Supports **Previous** and **Next** navigation using modular arithmetic (`(currentSlide + 1) % projectsData.length` and `(currentSlide - 1 + projectsData.length) % projectsData.length`) for seamless infinite looping.
   * Dynamically generates pagination indicator dots (`sliderDots`) and highlights active card borders on `mouseenter` / `mouseleave`.
3. **Collapsible Content & Mobile Navigation:**
   * **More About Me Toggle:** Expands/collapses the detailed engineering philosophy card and updates button text dynamically.
   * **Technical Skills Visibility Toggle:** Shows or hides the 2×2 Technical Skills grid (`#skillsContainer`) on demand.
   * **Responsive Mobile Menu:** Toggles `.open` on `#navLinks` for viewports under `850px` and auto-closes when any navigation link is clicked.
4. **Development Sprint & Task Tracker (`localStorage` CRUD):**
   * **Create:** Validates non-empty input via button click or `Enter` key press and appends new tasks.
   * **Read & Persist:** Loads saved tasks from `localStorage` (`khush_tasks`) on page load and updates the live remaining task counter (`#todoCount`).
   * **Update:** Clicking any task toggles its `completed` boolean state and applies strikethrough styling.
   * **Delete & Reset:** Allows removing individual tasks via `Array.prototype.splice()` or restoring default milestones.

---

## 5. Form Validation Logic
The Contact Form (`#contactForm`) uses `novalidate` to override inconsistent browser popups and implements custom two-stage validation (live `input` listeners + `submit` interception):

1. **Full Name (`validateName`):**
   * Trims leading/trailing whitespace and verifies `val.length >= 2`.
   * Displays `"Please enter your full name (at least 2 characters)."` if invalid.
2. **Email Address (`validateEmail`):**
   * Trims input and verifies the presence of both `@` and `.` characters (`val.includes("@") && val.includes(".")`).
   * Displays `"Please enter a valid email address (e.g., name@domain.com)."` if invalid.
3. **Message Body (`validateMessage`):**
   * Trims input and verifies `val.length >= 10`, providing live character count feedback (e.g., `currently 4`).
4. **Submission Feedback Banner (`#formBanner`):**
   * Calls `event.preventDefault()` on submit. If any check fails, displays a red error banner (`form-banner error`) and highlights invalid fields with `.invalid`. When all checks pass, displays a personalized green confirmation banner (`form-banner success`) and resets the form.

---

## 6. Visual Documentation
> **Note for Submission:** Capture and attach screenshots of your running application in the `screenshots/` folder (or paste them directly below) demonstrating each state:

* **Hero & About Section (Desktop Light & Dark Mode):** Shows left-aligned bio details paired with the right-aligned profile photo (`180px × 220px`) and theme toggle button.
* **Unified Detail Panels & Hover States:** Demonstrates the 2×2 card grid across *Technical Skills*, *Featured Projects*, *Experience*, and *Education & Certifications*, highlighting the indigo-to-cyan hover bar transition.
* **Interactive Project Slider:** Shows dynamic slide transitions, gradient visuals, and active pagination dots.
* **Sprint Task Tracker:** Demonstrates adding, completing (strikethrough), and removing tasks with live counter updates.
* **Contact Form Validation States:** Shows inline red error messages on invalid submission and the green confirmation banner upon valid submission.

---

## 7. Testing Evidence & Validation Cases

| Test ID | Feature / Component | Test Input / Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Dark Mode Persistence | Click **Dark Mode** button, then refresh browser (`F5`) | Page switches to dark palette (`#0f172a`), button reads **Light Mode**, and persists after reload | Theme persisted accurately via `localStorage` | **Pass** |
| **TC-02** | Project Slider Looping | Click **Previous** on Project 1; click **Next** on Project 4 | Wraps smoothly to Project 4 and back to Project 1; active dot updates | Looped without index out-of-bounds errors | **Pass** |
| **TC-03** | Sprint Tracker Empty Input | Click **Add Task** with empty or whitespace-only input | Displays `"Please enter a task description before adding."` and does not add blank item | Error message displayed; empty item blocked | **Pass** |
| **TC-04** | Sprint Tracker CRUD | Add task `"Deploy v1"`, click task to complete, reload page | Task persists in `localStorage` with `✅` and strikethrough; counter decrements by 1 | State saved and restored properly | **Pass** |
| **TC-05** | Contact Form — Invalid Data | Submit Name: `"A"`, Email: `"userdomain"`, Message: `"Hi"` | Highlights all 3 fields in red, shows specific error messages, and displays red error banner | Submission blocked; inline errors shown | **Pass** |
| **TC-06** | Contact Form — Valid Data | Submit Name: `"Rohan"`, Email: `"rohan@test.com"`, Message: `"Hello Khush, let's connect!"` | Clears errors, displays green banner thanking `"Rohan"`, and resets form inputs | Confirmation banner rendered; form cleared | **Pass** |
| **TC-07** | Responsive Mobile Layout | Resize viewport to `< 850px` width | Hamburger menu (`☰`) appears; 2-column grids stack cleanly into 1 column; photo scales to `145×175px` | Layout adapted cleanly without horizontal scroll | **Pass** |