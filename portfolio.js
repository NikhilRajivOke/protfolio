// ─── Experience Data ───────────────────────────────────────────────────────
const compArr = [
  {
    company: "PayPal",
    position: "Software Engineer II",
    location: "New York City, NY",
    dates: "Apr 2025 – Present",
    subRoles: [
      {
        title: "Loyalty Platform (PayPal+)",
        bullets: [
          "Built and maintained microservices for the PayPal+ loyalty program, serving 1M+ users with 99.9%+ uptime",
          "Designed AMQ pipelines for asynchronous event processing between distributed services",
          "Optimized Oracle SQL queries, reducing p99 read latency by 30%",
          "Implemented Resilience4j circuit breakers and Datadog alerting, cutting mean time to recovery (MTTR) by 60%",
        ],
      },
      {
        title: "Ads Platform",
        bullets: [
          "Scaled ad delivery infrastructure serving 25M+ daily users with sub-100ms p99 latency",
          "Drove $4M+ in revenue through improved ad targeting and delivery pipelines",
          "Implemented GDPR compliance for Germany and UK markets",
          "Built GraphQL APIs backed by Google Cloud Spanner with end-to-end Datadog observability",
        ],
      },
    ],
    tech: [
      "Java",
      "Spring Boot",
      "GraphQL",
      "Oracle",
      "RabbitMQ",
      "Resilience4j",
      "Datadog",
      "Cloud Spanner",
    ],
  },
  {
    company: "Idea Nova Technologies",
    position: "Software Engineer",
    location: "Naperville, IL",
    dates: "Jun 2024 – Aug 2024",
    bullets: [
      "Built features for a web conferencing platform, reducing infrastructure costs by $50K",
      "Established CI/CD pipelines with GitHub Actions and Docker, cutting deployment time by 50%",
      "Improved frontend performance by 40% through code splitting and lazy loading strategies",
    ],
    tech: ["Docker", "GitHub Actions", "CI/CD"],
  },
  {
    company: "Select Health",
    position: "Software Engineer Intern",
    location: "Salt Lake City, UT",
    dates: "Aug 2023 – Jun 2024",
    bullets: [
      "Migrated monolithic healthcare application to microservices architecture, saving $150K annually",
      "Implemented Spring Boot + RabbitMQ + Redis event-driven system, improving processing throughput by 30%",
      "Optimized SQL Server queries across 4M+ patient records, reducing query execution time by 40%",
    ],
    tech: ["Spring Boot", "RabbitMQ", "Redis", "SQL Server", "Angular", "TypeScript"],
  },
  {
    company: "Binghamton University",
    position: "Grading Assistant",
    location: "Binghamton, NY",
    dates: "Aug 2023 – Dec 2023",
    bullets: [
      "Mentored 50+ students in data structures and algorithms, grading submissions and providing detailed feedback",
      "Fostered a collaborative learning environment that helped students build confidence with core CS concepts",
    ],
    tech: [],
  },
  {
    company: "WeAgile Software Solutions",
    position: "Software Engineer",
    location: "Pune, India",
    dates: "Dec 2020 – Jun 2022",
    bullets: [
      "Developed RESTful APIs and GraphQL services with Spring Boot for a cloud-based workforce management platform",
      "Implemented OAuth2 authentication and role-based access control across distributed services",
      "Built React-based frontend components and containerized services with Docker",
    ],
    tech: ["Java", "Spring Boot", "GraphQL", "React", "Docker"],
  },
  {
    company: "Accenture",
    position: "Associate Software Developer",
    location: "Bangalore, India",
    dates: "Sep 2019 – Oct 2020",
    bullets: [
      "Developed and optimized Spring Boot REST APIs for e-commerce order management, reducing system latency by 20%",
      "Built analytics dashboards and improved operational workflows using data-driven UI components",
    ],
    tech: ["Spring Boot", "Java", "React", "SQL"],
  },
];

// ─── Experience Renderer ───────────────────────────────────────────────────
function showCompany(idx) {
  // Update active tab styling
  document.querySelectorAll(".exp-tab").forEach((btn, i) => {
    btn.classList.toggle("active", i === idx);
  });

  const comp = compArr[idx];
  const content = document.getElementById("exp-content");

  // Build tech pills HTML
  let techHTML = "";
  if (comp.tech && comp.tech.length > 0) {
    techHTML = `<div class="exp-tech">${comp.tech
      .map((t) => `<span class="tech-pill">${t}</span>`)
      .join("")}</div>`;
  }

  // Build body: sub-roles (PayPal) or flat bullets
  let bodyHTML = "";
  if (comp.subRoles) {
    bodyHTML = comp.subRoles
      .map(
        (role) => `
      <div class="sub-role">
        <h4 class="sub-role-title">${role.title}</h4>
        <ul class="exp-bullets">
          ${role.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>`
      )
      .join("");
  } else if (comp.bullets) {
    bodyHTML = `<ul class="exp-bullets">${comp.bullets
      .map((b) => `<li>${b}</li>`)
      .join("")}</ul>`;
  }

  content.innerHTML = `
    <div class="exp-header">
      <div class="exp-header-left">
        <div class="exp-company">${comp.company}</div>
        <div class="exp-position">${comp.position}</div>
      </div>
      <div class="exp-header-right">
        <div class="exp-location"><i class="fas fa-map-marker-alt"></i> ${comp.location}</div>
        <div class="exp-dates">${comp.dates}</div>
      </div>
    </div>
    <div class="exp-body">${bodyHTML}</div>
    ${techHTML}
  `;
}

// ─── Dark Mode ─────────────────────────────────────────────────────────────
function setTheme(isDark) {
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("theme-icon").className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
    document.getElementById("theme-icon").className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  }
}

// ─── Navbar scroll shadow ──────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 10);
});

// ─── Init ──────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") setTheme(true);

  // Dark mode toggle
  document.getElementById("dark-toggle").addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    setTheme(!isDark);
  });

  // Mobile hamburger
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu on nav link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });

  // Load first experience entry
  showCompany(0);

  // Scroll to top on load
  window.scrollTo(0, 0);
});
