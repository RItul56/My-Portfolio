"use strict";

const portfolio = (() => {
  const typedWords = [
    "Python Developer",
    "Full Stack Developer",
    "React Developer",
    "AI Enthusiast",
    "Robotics Learner",
    "Problem Solver"
  ];

  const projects = [
    {
      title: "Smart Attendance System",
      description: "Face-recognition attendance workflow using Python, OpenCV, and MySQL for structured classroom records.",
      tech: ["Python", "OpenCV", "MySQL"],
      icon: "fa-user-check"
    },
    {
      title: "School Management System",
      description: "Student, teacher, and administration management experience with a clean web interface and Python logic.",
      tech: ["HTML", "CSS", "JavaScript", "Python"],
      icon: "fa-school"
    },
    {
      title: "InfiCard",
      description: "A modern digital card platform concept with React frontend, Node.js APIs, and MongoDB persistence.",
      tech: ["React", "Node.js", "MongoDB"],
      icon: "fa-address-card"
    },
    {
      title: "AutoLux Motors",
      description: "Premium automobile website with polished layouts, interactive sections, and responsive product presentation.",
      tech: ["HTML", "CSS", "JavaScript"],
      icon: "fa-car-side"
    },
    {
      title: "Parking Management System",
      description: "Object-oriented C++ system for parking slots, vehicle records, and operational fee management.",
      tech: ["C++", "OOP"],
      icon: "fa-square-parking"
    },
    {
      title: "AI Learning Dashboard",
      description: "Learning analytics dashboard concept combining React interfaces with Python-powered AI insights.",
      tech: ["React", "Python", "AI"],
      icon: "fa-chart-simple"
    }
  ];

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const initNavigation = () => {
    const header = qs(".site-header");
    const toggle = qs(".nav-toggle");
    const menu = qs(".nav-menu");
    const links = qsa(".nav-link");

    const closeMenu = () => {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("active");
      toggle.classList.toggle("active", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    const updateHeader = () => {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  };

  const initTyping = () => {
    const target = qs("#typed-text");
    if (!target) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = typedWords[wordIndex];
      target.textContent = word.slice(0, charIndex);

      if (!deleting && charIndex < word.length) {
        charIndex += 1;
        setTimeout(type, 85);
        return;
      }

      if (!deleting && charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(type, 45);
        return;
      }

      deleting = false;
      wordIndex = (wordIndex + 1) % typedWords.length;
      setTimeout(type, 220);
    };

    type();
  };

  const renderProjects = () => {
    const grid = qs("#projects-grid");
    if (!grid) return;

    grid.innerHTML = projects.map((project) => `
      <article class="project-card reveal">
        <div class="project-image" aria-hidden="true">
          <i class="fa-solid ${project.icon}"></i>
        </div>
        <div class="project-body">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-tags">
            ${project.tech.map((tag) => `<span class="tech-tag">${tag}</span>`).join("")}
          </div>
          <div class="project-actions">
            <a class="btn btn-secondary" href="https://github.com/RItul56" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i> GitHub
            </a>
            <a class="btn btn-primary" href="#contact">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
            </a>
          </div>
        </div>
      </article>
    `).join("");
  };

  const initRevealAnimations = () => {
    const revealItems = qsa(".reveal");
    const skillCards = qsa(".skill-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        if (entry.target.classList.contains("skill-card")) {
          const progress = entry.target.dataset.progress || "0";
          const bar = qs(".progress span", entry.target);
          if (bar) bar.style.width = `${progress}%`;
        }

        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
      observer.observe(item);
    });

    skillCards.forEach((card) => {
      const progress = card.dataset.progress || "0";
      card.setAttribute("aria-label", `${card.querySelector("h3").textContent} proficiency ${progress} percent`);
    });
  };

  const initActiveSections = () => {
    const sections = qsa("main section[id]");
    const links = qsa(".nav-link");

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, {
      threshold: 0.42
    });

    sections.forEach((section) => sectionObserver.observe(section));
  };

  const initHoverLighting = () => {
    const cards = qsa(".skill-card, .feature-card, .project-card");

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--x", `${x}%`);
        card.style.setProperty("--y", `${y}%`);
      });
    });
  };

  const initContactForm = () => {
  const form = qs("#contact-form");
  if (!form) return;

  const setError = (field, message) => {
    const error = field.nextElementSibling;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  };

  const validators = {
    name: (value) =>
      value.trim().length >= 2 || "Please enter your name.",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
      "Please enter a valid email address.",
    message: (value) =>
      value.trim().length >= 10 ||
      "Please write a message of at least 10 characters."
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    const fields = qsa("input, textarea", form);

    fields.forEach((field) => {
      const result = validators[field.name](field.value);
      const message = result === true ? "" : result;
      setError(field, message);
      valid = valid && result === true;
    });

    const status = qs(".form-status", form);

    if (!valid) {
      status.textContent = "Please fix the highlighted fields.";
      return;
    }

    const formData = new FormData(form);

    emailjs.send(
      "service_wr7lrfq",
      "template_5p6gxpd",
      {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      }
    )
    .then(() => {
      status.textContent = "Message sent successfully!";
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      status.textContent = "Failed to send message.";
    });
  });
};

  const initUtilityControls = () => {
    const backToTop = qs(".back-to-top");
    const cursorGlow = qs(".cursor-glow");

    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 700);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("pointermove", (event) => {
      if (!cursorGlow || window.matchMedia("(pointer: coarse)").matches) return;
      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  };

  const initProfileFallback = () => {
    const image = qs(".profile-image");
    if (!image) return;

    const showFallback = () => {
      image.style.display = "none";
      image.parentElement.classList.add("image-missing");
    };

    image.addEventListener("error", showFallback);

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  };

  const init = () => {
    renderProjects();
    initNavigation();
    initTyping();
    initRevealAnimations();
    initActiveSections();
    initHoverLighting();
    initContactForm();
    initProfileFallback();
    initUtilityControls();
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", portfolio.init);
