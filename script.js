/**
 * SHIVANI SWAMI - PORTFOLIO INTERACTION CONTROLLER
 * Pure Vanilla JavaScript (No external frameworks needed)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initMobileNav();
  initStickyHeader();
  initTypewriter();
  initSkillFilters();
  initProjectFilters();
  initModals();
  initCopyButtons();
  initContactForm();
  initBackToTop();
  initDynamicYear();
  initScrollSpy();
});

/* ============================================================
   1. THEME TOGGLE (DARK / LIGHT MODE WITH LOCALSTORAGE)
   ============================================================ */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    updateThemeIcon(false);
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme', !isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    showToast(isLight ? 'Light mode enabled' : 'Dark mode enabled', 'info');
  });

  function updateThemeIcon(isLight) {
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    if (isLight) {
      icon.className = 'fa-solid fa-sun';
      themeToggle.setAttribute('title', 'Switch to Dark Mode');
    } else {
      icon.className = 'fa-solid fa-moon';
      themeToggle.setAttribute('title', 'Switch to Light Mode');
    }
  }
}

/* ============================================================
   2. MOBILE NAVIGATION MENU
   ============================================================ */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
    }
  });
}

/* ============================================================
   3. STICKY HEADER ON SCROLL
   ============================================================ */
function initStickyHeader() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ============================================================
   4. DYNAMIC HERO TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
  const el = document.getElementById('typewriterRole');
  if (!el) return;

  const roles = [
    '.NET Developer',
    'ASP.NET Core Specialist',
    'Full Stack Engineer (Angular & C#)',
    'RESTful Web API Architect',
    'SQL Server Database Engineer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ============================================================
   5. SKILLS & PROJECTS FILTERING TABS
   ============================================================ */
function initSkillFilters() {
  const tabBtns = document.querySelectorAll('#skillFilterTabs .tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!tabBtns.length || !skillCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initProjectFilters() {
  const projectBtns = document.querySelectorAll('#projectFilterTabs .project-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!projectBtns.length || !projectCards.length) return;

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-project-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   6. MODALS (RESUME PREVIEW & PROJECT DEEP-DIVE)
   ============================================================ */
const projectData = {
  'trust-housing': {
    title: 'DS Trust Housing',
    subtitle: 'Enterprise Society & Wing Administration Portal',
    role: 'Team Member',
    technologies: 'C#, ASP.NET Core, Angular, Entity Framework (DB-First), Web API, LINQ, Angular Material, SOLID',
    domain: 'Enterprise Real Estate / Community Management',
    summary: 'An enterprise architecture application engineered to automate society operations, wing hierarchies, automated monthly maintenance collections, and multi-tier complaint resolutions.',
    highlights: [
      'Engineered scalable ASP.NET Core Web APIs and modular Angular client interfaces utilizing Entity Framework Database-First architecture for complex relational data modeling.',
      'Constructed Member and Wing Administration modules supporting multi-wing structures, flat hierarchy mappings, document upload/verification, and administrative sign-offs.',
      'Deployed automated Financial and Maintenance accounting pipelines supporting recurring billing schedules, fixed maintenance fees, late-fee penalties, and digital invoice generation.',
      'Instituted an end-to-end Complaint Lifecycle Tracking system with Pending, In Progress, and Resolved states alongside automated escalation triggers for overdue issues.',
      'Standardized Staff and Vendor Operations including digital attendance tracking, task delegation, work order lifecycle, and payout auditing.',
      'Enabled community collaboration features: digital Minutes of Meetings (MoM), interactive scheduling, broadcast emergency notices, and facility reservations.',
      'Configured residential and visitor parking slot allocation with designated vehicle controls and capacity monitoring.'
    ]
  },
  'harvest-basket': {
    title: 'DS Harvest Basket',
    subtitle: 'Multi-Role Agricultural Commerce & Logistics Platform',
    role: 'Team Member',
    technologies: 'ASP.NET MVC, C#, SQL Server, Bootstrap, jQuery, AJAX, Dependency Injection, CSS3',
    domain: 'Agro E-Commerce & Supply Chain',
    summary: 'A multi-tier agro-marketplace supporting buyers, verified farming merchants, logistics couriers, and central platform administrators with automated compliance and accounting.',
    highlights: [
      'Architected an end-to-end multi-tier marketplace supporting 4 distinct user roles (Buyer, Seller, Courier Admin, Central Admin) with multi-level approval workflows for merchant onboarding and KYC verification.',
      'Implemented an asynchronous product discovery engine using AJAX and jQuery, integrating multi-parameter filtering, a 3-item product comparison module, and real-time pincode serviceability checks.',
      'Formulated a billing and tax calculation pipeline supporting dual GST compliance (CGST/SGST) across diverse agricultural product categories, generating dynamic PDF invoices for standard and discounted transactions.',
      'Devised a comprehensive order tracking mechanism spanning real-time courier status transitions (Ordered, Dispatched, Picked Up, Delivered) alongside mechanized 24-hour dispatch breach alerts.',
      'Programmed an integrated reverse logistics and reconciliation module handling multi-reason cancellations, replacements, and returns, streamlining merchant-to-admin refund approval requests.',
      'Delivered role-specific analytics dashboards rendering interactive sales trends, order settlement ledgers (net amounts after platform commission and shipping deductions), and bulk Excel export capabilities.'
    ]
  },
  'visitrace': {
    title: 'DS VisiTrace',
    subtitle: 'Enterprise Visitor Oversight & Access Control Platform',
    role: 'Team Member',
    technologies: 'C#, ADO.NET, SQL Server, Stored Procedures, WinForms, SQL Triggers',
    domain: 'Enterprise Security & Facility Access Control',
    summary: 'A secure, high-throughput visitor management and access protocol suite featuring on-desk check-ins, automated badge generation, security perimeter monitoring, and appointment scheduling.',
    highlights: [
      'Executed a multi-tier enterprise visitor oversight system supporting 3 distinct roles (Admin, Administrator, Receptionist) managing pre-registration and on-desk check-ins.',
      'Systematized the badge generation and dispatch pipeline with PDF badge printing and instant email notifications mapped to host schedules, accelerating reception desk throughput.',
      'Established perimeter security access protocols with real-time Watchlist monitoring, dual-mode manual/timed blocklisting (1 day to permanent), and auto-expiring countdown triggers.',
      'Spearheaded the MeetQuest event and assembly coordination module featuring multi-tier administrative approval workflows, computerized notifications, and interactive calendar-based scheduling.',
      'Authored comprehensive staff and student attendance monitoring modules utilizing ADO.NET, supporting multi-dimensional tracking across Status-wise, Time-wise, and Day-wise shift views.',
      'Crafted centralized operational dashboards rendering real-time donut and bar analytics for daily appointments, active visitor headcounts, and visitor experience feedback metrics.'
    ]
  }
};

function initModals() {
  // Resume Modal Elements
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModal = document.getElementById('closeResumeModal');
  const quickPreviewBtn = document.getElementById('quickPreviewBtn');
  const heroPreviewBtn = document.getElementById('heroPreviewBtn');
  const hubPreviewBtn = document.getElementById('hubPreviewBtn');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (quickPreviewBtn) quickPreviewBtn.addEventListener('click', openResume);
  if (heroPreviewBtn) heroPreviewBtn.addEventListener('click', openResume);
  if (hubPreviewBtn) hubPreviewBtn.addEventListener('click', openResume);
  if (closeResumeModal) closeResumeModal.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  // Project Modal Elements
  const projectModal = document.getElementById('projectModal');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalSubtitle = document.getElementById('projectModalSubtitle');
  const projectModalBody = document.getElementById('projectModalBody');
  const triggerBtns = document.querySelectorAll('.btn-modal-trigger');

  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    projectModalTitle.textContent = data.title;
    projectModalSubtitle.textContent = data.subtitle;

    projectModalBody.innerHTML = `
      <div class="modal-meta-grid">
        <div class="modal-meta-item">
          <span class="label">Role</span>
          <span class="value">${data.role}</span>
        </div>
        <div class="modal-meta-item">
          <span class="label">Domain</span>
          <span class="value">${data.domain}</span>
        </div>
        <div class="modal-meta-item">
          <span class="label">Technologies</span>
          <span class="value">${data.technologies}</span>
        </div>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 1.25rem; font-size: 1.02rem; line-height: 1.7;">
        ${data.summary}
      </p>

      <h4 class="modal-section-title"><i class="fa-solid fa-layer-group"></i> Architecture & Engineering Breakdown</h4>
      <ul class="modal-bullet-list">
        ${data.highlights.map(item => `
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      openProject(projId);
    });
  });

  if (closeProjectModal) closeProjectModal.addEventListener('click', closeProject);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProject();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProject();
    }
  });
}

/* ============================================================
   7. COPY TO CLIPBOARD BUTTONS
   ============================================================ */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-check text-accent';
          setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
          }, 2000);
        }
        showToast(`Copied "${text}" to clipboard!`, 'success');
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${text}" to clipboard!`, 'success');
      }
    });
  });
}

/* ============================================================
   8. CONTACT FORM VALIDATION & SUBMISSION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('btnSubmit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim()) {
      showError('nameError', 'Please enter your name');
      isValid = false;
    } else {
      clearError('nameError');
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError('emailError', 'Please enter your email address');
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError('emailError', 'Please provide a valid email format');
      isValid = false;
    } else {
      clearError('emailError');
    }

    // Subject Validation
    if (!subjectInput.value.trim()) {
      showError('subjectError', 'Please provide a subject');
      isValid = false;
    } else {
      clearError('subjectError');
    }

    // Message Validation
    if (!messageInput.value.trim()) {
      showError('messageError', 'Please enter your message');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError('messageError', 'Message should be at least 10 characters long');
      isValid = false;
    } else {
      clearError('messageError');
    }

    if (!isValid) return;

    // Show loading state on button
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

    const accessKeyInput = document.getElementById('contactAccessKey');
    const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

    // If access key is placeholder, gracefully fallback to mailto so no inquiries are lost
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setTimeout(() => {
        const mailtoUrl = `mailto:swamishivani606@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent("Sender Name: " + nameInput.value + "\nSender Email: " + emailInput.value + "\n\nMessage:\n" + messageInput.value)}`;
        window.location.href = mailtoUrl;
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        showToast('Opening your email app to send to swamishivani606@gmail.com', 'info');
      }, 500);
      return;
    }

    // Real API Submission (Works natively on GitHub Pages!)
    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200 && json.success) {
          form.reset();
          showToast("Thank you! Your message has been sent directly to Shivani's inbox.", 'success');
        } else {
          throw new Error(json.message || 'Submission failed');
        }
      })
      .catch((error) => {
        console.error('Contact Form Error:', error);
        // Fallback to mailto if network error
        const mailtoUrl = `mailto:swamishivani606@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent("Sender Name: " + nameInput.value + "\nSender Email: " + emailInput.value + "\n\nMessage:\n" + messageInput.value)}`;
        window.location.href = mailtoUrl;
        showToast('Connecting to your email app to send to swamishivani606@gmail.com', 'info');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      });
  });

  function showError(elementId, msg) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = msg;
  }

  function clearError(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = '';
  }
}

/* ============================================================
   9. TOAST NOTIFICATION UTILITY
   ============================================================ */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
  toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ============================================================
   10. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   11. DYNAMIC FOOTER YEAR
   ============================================================ */
function initDynamicYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   12. SCROLLSPY (ACTIVE NAVBAR LINKS)
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
