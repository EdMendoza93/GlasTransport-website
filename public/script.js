const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
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
