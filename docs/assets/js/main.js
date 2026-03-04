// Main JavaScript for Documentation
// Vanilla JS, ES6+ features

// ============================================
// 1. Copy-to-clipboard for code blocks
// ============================================
const initCodeCopy = () => {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((code) => {
    const pre = code.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

    button.addEventListener('click', async () => {
      const text = code.textContent;
      try {
        await navigator.clipboard.writeText(text);
        button.classList.add('copied');
        button.setAttribute('aria-label', 'Code copied');
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        setTimeout(() => {
          button.classList.remove('copied');
          button.setAttribute('aria-label', 'Copy code to clipboard');
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.setAttribute('aria-label', 'Failed to copy');
      }
    });

    wrapper.appendChild(button);
  });
};

// ============================================
// 2. Mobile navigation toggle
// ============================================
const initMobileNav = () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-menu, nav, .sidebar');

  if (!navToggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  const openNav = () => {
    nav.classList.add('is-open');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  navToggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && nav.classList.contains('is-open')) {
      closeNav();
    }
  });
};

// ============================================
// 3. Smooth scroll for anchor links
// ============================================
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.header, .navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      history.pushState(null, null, href);

      // Set focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
};

// ============================================
// 4. Table of contents highlighting
// ============================================
const initTOC = () => {
  const tocLinks = document.querySelectorAll('.toc a, .table-of-contents a, [data-toc] a');
  const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');

  if (tocLinks.length === 0 || headings.length === 0) return;

  let currentActive = null;
  const navHeight = document.querySelector('.header, .navbar')?.offsetHeight || 0;
  const offset = navHeight + 100;

  const observerOptions = {
    root: null,
    rootMargin: `-${offset}px 0px -60% 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.toc a[href="#${id}"], .table-of-contents a[href="#${id}"], [data-toc] a[href="#${id}"]`);

        if (link) {
          if (currentActive) {
            currentActive.classList.remove('is-active');
          }
          link.classList.add('is-active');
          currentActive = link;
        }
      }
    });
  }, observerOptions);

  headings.forEach((heading) => observer.observe(heading));

  // Highlight on scroll (fallback)
  const handleScroll = () => {
    let current = null;
    const scrollPos = window.pageYOffset + offset;

    headings.forEach((heading) => {
      if (heading.offsetTop <= scrollPos) {
        current = heading;
      }
    });

    if (current && current !== currentActive) {
      const id = current.getAttribute('id');
      const link = document.querySelector(`.toc a[href="#${id}"], .table-of-contents a[href="#${id}"], [data-toc] a[href="#${id}"]`);

      if (link) {
        if (currentActive) {
          currentActive.classList.remove('is-active');
        }
        link.classList.add('is-active');
        currentActive = link;
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
};

// ============================================
// 5. Skip to content functionality
// ============================================
const initSkipLink = () => {
  const skipLink = document.querySelector('.skip-to-content, [href="#main-content"]');
  const mainContent = document.getElementById('main-content') ||
                      document.querySelector('main') ||
                      document.querySelector('[role="main"]');

  if (!skipLink || !mainContent) return;

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();
    window.scrollTo({
      top: mainContent.offsetTop - 20,
      behavior: 'smooth'
    });
  });
};

// ============================================
// Initialize all functionality on DOM ready
// ============================================
const init = () => {
  initCodeCopy();
  initMobileNav();
  initSmoothScroll();
  initTOC();
  initSkipLink();
};

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
