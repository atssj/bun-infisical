// Main JavaScript for Documentation
// Vanilla JS, ES6+ features
/* eslint-disable one-var */

const COPY_FEEDBACK_DURATION_MS = 2000;

// ============================================
// 1. Copy-to-clipboard for code blocks
// ============================================
const initCodeCopy = () => {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-clipboard-text");
      if (!text) {
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        const originalIcon = button.innerHTML;
        button.classList.add("is-copied");
        button.innerHTML = "<span>✓</span>";

        setTimeout(() => {
          button.classList.remove("is-copied");
          button.innerHTML = originalIcon;
        }, COPY_FEEDBACK_DURATION_MS);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    });
  });
};

// ============================================
// 2. Mobile navigation toggle
// ============================================
const initMobileNav = () => {
  const navToggle = document.querySelector(".nav-toggle"),
    navMenu = document.querySelector(".nav-menu");

  if (!navToggle || !navMenu) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle("is-open");
    document.body.classList.toggle("nav-open");
  });
};

// ============================================
// 3. Reveal on scroll
// ============================================
const initScrollReveal = () => {
  const observerOptions = {
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    },
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions),
    revealElements = document.querySelectorAll(".feature-card, .section-title, .code-example"),
    style = document.createElement("style");
  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
    observer.observe(el);
  });

  // Small internal style for revealed state
  style.innerHTML = `
    .is-revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initCodeCopy();
  initMobileNav();
  initScrollReveal();
});
