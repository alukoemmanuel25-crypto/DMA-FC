const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation menu");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu?.classList.contains("is-open")) {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation menu");
    navToggle?.focus();
  }
});

const animatedItems = document.querySelectorAll(".feature-card, .service-card, .standard-steps article, .industry-grid span, .process-grid article, .review-card, .commitment-card, details");
animatedItems.forEach((item) => item.setAttribute("data-animate", ""));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector(".quote-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector("[data-form-status]");
  const data = new FormData(form);
  const subject = `Quote request from ${data.get("name")}`;
  const body = [
    `Full name: ${data.get("name")}`,
    `Company: ${data.get("company") || "Not provided"}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${data.get("email")}`,
    `Service needed: ${data.get("service")}`,
    `Property type: ${data.get("property-type")}`,
    `Cleaning frequency: ${data.get("frequency")}`,
    `Preferred contact method: ${data.get("preferred-contact")}`,
    "",
    "Message:",
    data.get("message") || "No additional details provided."
  ].join("\n");

  if (status) {
    status.textContent = "Your email app is opening. Review the message, then send it to complete your request.";
  }

  window.location.href = `mailto:info@dmafacilitycare.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
