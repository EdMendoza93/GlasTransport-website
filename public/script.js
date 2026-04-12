const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileMenu && mobileToggle) {
      mobileMenu.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

function getActiveTab() {
  const hash = window.location.hash.replace('#', '');
  const validTabs = new Set(['home', 'services', 'features', 'experience', 'system', 'impact', 'contact']);

  return validTabs.has(hash) ? hash : 'home';
}

function setActiveTab(tabName) {
  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === tabName;
    panel.classList.toggle('is-active', isActive);
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${tabName}`;
    link.classList.toggle('is-active', isActive);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', () => {
  setActiveTab(getActiveTab());
});

setActiveTab(getActiveTab());

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 2 || !emailIsValid || !service || message.length < 20) {
      formMessage.textContent = 'Please complete the required fields and add a more detailed message.';
      return;
    }

    formMessage.textContent = 'The rebrand form is ready. Next step: connect it to your preferred system or CRM.';
    contactForm.reset();
  });
}
