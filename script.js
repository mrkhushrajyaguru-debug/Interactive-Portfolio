document.addEventListener("DOMContentLoaded", function () {
  console.log("Khush Rajyaguru Portfolio initialized successfully.");

  /* ==========================================================================
     1. DARK / LIGHT MODE TOGGLE WITH LOCAL STORAGE
     ========================================================================== */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  function applyTheme(isDark) {
    if (!themeIcon || !themeLabel) return;
    if (isDark) {
      document.body.classList.add("dark-mode");
      themeIcon.textContent = "☀️";
      themeLabel.textContent = "Light Mode";
    } else {
      document.body.classList.remove("dark-mode");
      themeIcon.textContent = "🌙";
      themeLabel.textContent = "Dark Mode";
    }
  }

  function toggleDarkMode() {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    try {
      localStorage.setItem("khush_darkMode", String(isDark));
    } catch (e) {
      console.warn("localStorage unavailable:", e);
    }
  }

  let savedTheme = false;
  try {
    savedTheme = localStorage.getItem("khush_darkMode") === "true";
  } catch (e) {
    savedTheme = false;
  }
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleDarkMode);
  }

  /* ==========================================================================
     2. SHOW / HIDE CONTENT & MOBILE NAVIGATION TOGGLES
     ========================================================================== */
  const toggleBioBtn = document.getElementById("toggleBioBtn");
  const bioBox = document.getElementById("bioBox");
  if (toggleBioBtn && bioBox) {
    toggleBioBtn.addEventListener("click", function () {
      const isVisible = bioBox.classList.toggle("active");
      toggleBioBtn.textContent = isVisible ? "Less About Me" : "More About Me";
    });
  }

  const toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
  const skillsContainer = document.getElementById("skillsContainer");
  if (toggleSkillsBtn && skillsContainer) {
    toggleSkillsBtn.addEventListener("click", function () {
      const isHidden = skillsContainer.classList.toggle("hidden-grid");
      toggleSkillsBtn.textContent = isHidden ? "Show Cards" : "Hide Cards";
    });
  }

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ==========================================================================
     3. INTERACTIVE PROJECT SLIDER
     ========================================================================== */
  const projectsData = [
    {
      title: "Hospitality Management System",
      role: "Front-end Developer",
      tech: "Tools: Visual Studio Code, Front-end",
      icon: "🏨",
      gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)",
      bullets: [
        "Built a workflow for member and employee management across the organization.",
        "Includes employee onboarding and staff member details.",
        "Designed for Australian Hospitality Management needing one unified staff and organization management system."
      ]
    },
  
    {
      title: "Cyber Security Threat Detection Dashboard",
      role: "UI/UX Designer",
      tech: "Tools: Figma, UI/UX Design",
      icon: "🛡️",
      gradient: "linear-gradient(135deg, #4c1d95, #7c3aed)",
      bullets: [
        "Designed an interactive threat detection dashboard interface to assist users in identifying active cyber attacks.",
        "Formatted component layouts and color hierarchy to streamline real-time alert monitoring workflows."
      ]
    },
    {
      title: "Motion Detection Alarm System",
      role: "Hardware & Software Integration",
      tech: "Domain: Embedded Systems, IoT",
      icon: "📡",
      gradient: "linear-gradient(135deg, #9a3412, #ea580c)",
      bullets: [
        "Developed an automated motion-sensing security alarm system that detects nearby objects via integrated sensors.",
        "Programmed real-time notification logic to send direct mobile alerts alongside triggering audio alarms."
      ]
    }
  ];

  let currentSlide = 0;
  const projectSlider = document.getElementById("projectSlider");
  const slideVisual = document.getElementById("slideVisual");
  const slideIcon = document.getElementById("slideIcon");
  const slideRole = document.getElementById("slideRole");
  const slideCounter = document.getElementById("slideCounter");
  const slideTitle = document.getElementById("slideTitle");
  const slideTech = document.getElementById("slideTech");
  const slideBullets = document.getElementById("slideBullets");
  const sliderDots = document.getElementById("sliderDots");
  const prevSlideBtn = document.getElementById("prevSlideBtn");
  const nextSlideBtn = document.getElementById("nextSlideBtn");

  function renderSlide(index) {
    if (!slideVisual || !slideTitle || !slideBullets || !sliderDots) return;
    const project = projectsData[index];
    slideVisual.style.background = project.gradient;
    if (slideIcon) slideIcon.textContent = project.icon;
    if (slideRole) slideRole.textContent = project.role;
    if (slideCounter) slideCounter.textContent = `Project ${index + 1} of ${projectsData.length}`;
    slideTitle.textContent = project.title;
    if (slideTech) slideTech.textContent = project.tech;

    slideBullets.innerHTML = "";
    project.bullets.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      slideBullets.appendChild(li);
    });

    sliderDots.innerHTML = "";
    projectsData.forEach(function (_, idx) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `dot ${idx === index ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to project ${idx + 1}`);
      dot.addEventListener("click", function () {
        currentSlide = idx;
        renderSlide(currentSlide);
      });
      sliderDots.appendChild(dot);
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", function () {
      currentSlide = (currentSlide - 1 + projectsData.length) % projectsData.length;
      renderSlide(currentSlide);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", function () {
      currentSlide = (currentSlide + 1) % projectsData.length;
      renderSlide(currentSlide);
    });
  }

  if (projectSlider) {
    projectSlider.addEventListener("mouseenter", function () {
      projectSlider.classList.add("highlighted");
    });
    projectSlider.addEventListener("mouseleave", function () {
      projectSlider.classList.remove("highlighted");
    });
  }

  renderSlide(currentSlide);

  /* ==========================================================================
     4. INTERACTIVE SPRINT / TO-DO LIST WITH LOCAL STORAGE
     ========================================================================== */
  const defaultTasks = [
    { text: "Review employee onboarding flow for Hospitality Management System", completed: true },
    { text: "Test real-time single-broker stock trading UI workflow", completed: false },
    { text: "Refine alert hierarchy in Cyber Security Threat Detection Dashboard", completed: false }
  ];

  let tasks = [...defaultTasks];
  try {
    const parsed = JSON.parse(localStorage.getItem("khush_tasks"));
    if (Array.isArray(parsed) && parsed.length > 0) {
      tasks = parsed;
    }
  } catch (e) {
    tasks = [...defaultTasks];
  }

  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoError = document.getElementById("todoError");
  const todoList = document.getElementById("todoList");
  const todoCount = document.getElementById("todoCount");
  const resetTodosBtn = document.getElementById("resetTodosBtn");

  function saveAndRenderTasks() {
    if (!todoList) return;
    try {
      localStorage.setItem("khush_tasks", JSON.stringify(tasks));
    } catch (e) {
      console.warn("Could not save tasks to localStorage:", e);
    }

    todoList.innerHTML = "";
    tasks.forEach(function (task, index) {
      const li = document.createElement("li");
      li.className = `todo-item ${task.completed ? "completed" : ""}`;

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = `${task.completed ? "✅" : "⬜"} ${task.text}`;
      span.addEventListener("click", function () {
        tasks[index].completed = !tasks[index].completed;
        saveAndRenderTasks();
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-delete";
      delBtn.textContent = "Remove";
      delBtn.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveAndRenderTasks();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      todoList.appendChild(li);
    });

    if (todoCount) {
      const remaining = tasks.filter(function (t) { return !t.completed; }).length;
      todoCount.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
    }
  }

  function addTask() {
    if (!todoInput) return;
    const value = todoInput.value.trim();
    if (!value) {
      if (todoError) todoError.style.display = "block";
      return;
    }
    if (todoError) todoError.style.display = "none";
    tasks.push({ text: value, completed: false });
    todoInput.value = "";
    saveAndRenderTasks();
  }

  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", addTask);
  }

  if (todoInput) {
    todoInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        addTask();
      }
    });
  }

  if (resetTodosBtn) {
    resetTodosBtn.addEventListener("click", function () {
      tasks = [...defaultTasks];
      saveAndRenderTasks();
    });
  }

  saveAndRenderTasks();

  /* ==========================================================================
     5. CONTACT FORM VALIDATION (LIVE INPUT + SUBMIT FEEDBACK)
     ========================================================================== */
  const contactForm = document.getElementById("contactForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formBanner = document.getElementById("formBanner");

  function validateName() {
    if (!fullNameInput || !nameError) return true;
    const val = fullNameInput.value.trim();
    if (val.length < 2) {
      fullNameInput.classList.add("invalid");
      nameError.textContent = "Please enter your full name (at least 2 characters).";
      return false;
    }
    fullNameInput.classList.remove("invalid");
    nameError.textContent = "";
    return true;
  }

  function validateEmail() {
    if (!emailInput || !emailError) return true;
    const val = emailInput.value.trim();
    if (!val.includes("@") || !val.includes(".")) {
      emailInput.classList.add("invalid");
      emailError.textContent = "Please enter a valid email address (e.g., name@domain.com).";
      return false;
    }
    emailInput.classList.remove("invalid");
    emailError.textContent = "";
    return true;
  }

  function validateMessage() {
    if (!messageInput || !messageError) return true;
    const val = messageInput.value.trim();
    if (val.length < 10) {
      messageInput.classList.add("invalid");
      messageError.textContent = `Message must be at least 10 characters (currently ${val.length}).`;
      return false;
    }
    messageInput.classList.remove("invalid");
    messageError.textContent = "";
    return true;
  }

  if (fullNameInput) fullNameInput.addEventListener("input", validateName);
  if (emailInput) emailInput.addEventListener("input", validateEmail);
  if (messageInput) messageInput.addEventListener("input", validateMessage);

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        if (formBanner) {
          formBanner.className = "form-banner error";
          formBanner.textContent = "Please fix the highlighted errors above before submitting.";
        }
        return false;
      }

      const submittedName = fullNameInput ? fullNameInput.value.trim() : "there";
      if (formBanner) {
        formBanner.className = "form-banner success";
        formBanner.textContent = `Thank you, ${submittedName}! Your message has been sent to Khush Rajyaguru.`;
      }
      contactForm.reset();
      return true;
    });
  }
});