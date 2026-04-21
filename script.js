const typingEl = document.getElementById("typing");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const revealEls = document.querySelectorAll(".reveal");

const roles = [
  "IoT Enthusiast",
  "Cybersecurity Learner",
  "Blockchain Explorer",
  "Web Development Aspirant"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  typingEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeEffect, 90);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 45);
  } else {
    deleting = !deleting;
    if (!deleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeEffect, deleting ? 1200 : 250);
  }
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

revealEls.forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => sectionObserver.observe(section));

window.addEventListener("load", typeEffect);