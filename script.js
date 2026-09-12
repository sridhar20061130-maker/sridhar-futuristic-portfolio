const $ = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
  $("#loader").classList.add("hide");
});

$("#year").textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle");
const siteNav = $("#siteNav");

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const backTop = $("#backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const cursorGlow = $(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const canvas = $("#particles");
const context = canvas.getContext("2d");
let particles = [];
let animationFrame = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function createParticles() {
  const count = Math.min(90, Math.floor(window.innerWidth / 14));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8 + .4,
    speedX: (Math.random() - .5) * .35,
    speedY: (Math.random() - .5) * .35
  }));
}
function drawParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(54,228,255,.7)";
  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
  });
  animationFrame = requestAnimationFrame(drawParticles);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  resizeCanvas();
  createParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

const answers = [
  {
    keys: ["skill", "technical", "technology"],
    answer: "Sridhar’s technical skills include HTML, CSS, JavaScript, Tally Prime, Basic Excel, and GitHub. His soft skills include teamwork, quick learning, adaptability, and a positive attitude."
  },
  {
    keys: ["project", "portfolio", "itachi", "ecommerce", "e-commerce"],
    answer: "Sridhar has developed a Personal Portfolio Website and the Itachi Mart E-Commerce Website using HTML, CSS, and JavaScript. He is also developing an AI Portfolio Lab."
  },
  {
    keys: ["internship", "tally", "accounting"],
    answer: "Sridhar completed a 21-day Accounting Internship at SP Associates, Tiruppur. He practiced Tally Prime, voucher entry, accounting procedures, and basic Excel."
  },
  {
    keys: ["education", "college", "study"],
    answer: "Sridhar is pursuing B.Com (Information Technology) at KPR College of Arts, Science and Research."
  },
  {
    keys: ["contact", "email", "phone", "linkedin", "github"],
    answer: "Contact Sridhar at 9150437014 or sridhar20061130@gmail.com. LinkedIn: linkedin.com/in/sridhar-s-861b6234a. GitHub: github.com/sridhar20061130-maker."
  },
  {
    keys: ["objective", "career", "hire"],
    answer: "Sridhar is seeking an opportunity to apply his web development, accounting application, and learning skills while gaining professional experience and contributing to organizational growth."
  },
  {
    keys: ["achievement", "prize", "ncc", "chess"],
    answer: "Achievements include Second Prize in Ilam Vingyani 2019 for Waste Management and Third Prize in Vegetable Carving 2019. He also participated in NCC ATC Camp and APEX 26 Chess."
  }
];

function localAssistant(message) {
  const lower = message.toLowerCase();
  const match = answers.find((item) => item.keys.some((key) => lower.includes(key)));
  return match
    ? match.answer
    : "I can answer questions about Sridhar’s profile, skills, education, projects, internship, achievements, activities, career objective, and contact details.";
}

function addChatMessage(text, type) {
  const message = document.createElement("div");
  message.className = `chat-message ${type}`;
  message.textContent = text;
  $("#chatWindow").appendChild(message);
  $("#chatWindow").scrollTop = $("#chatWindow").scrollHeight;
}

$("#chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const message = input.value.trim();
  if (!message) return;
  addChatMessage(message, "user");
  addChatMessage(localAssistant(message), "bot");
  input.value = "";
});

const roadmaps = {
  "Web Developer": "1. Learn HTML structure\n2. Practice CSS layouts and responsive design\n3. Learn JavaScript DOM and APIs\n4. Build three projects\n5. Upload projects to GitHub\n6. Deploy using Vercel",
  "Data Analyst": "1. Strengthen Excel\n2. Learn SQL basics\n3. Learn Python and pandas\n4. Practice data cleaning\n5. Create charts and dashboards\n6. Build a data analysis portfolio",
  "Digital Marketer": "1. Learn SEO basics\n2. Practice content writing\n3. Learn social media marketing\n4. Study analytics concepts\n5. Create sample campaigns\n6. Build a marketing portfolio",
  "IT Support": "1. Learn computer hardware basics\n2. Study operating systems\n3. Learn networking fundamentals\n4. Practice troubleshooting\n5. Study ticketing and documentation\n6. Apply for entry-level support roles"
};

$("#careerBtn").addEventListener("click", () => {
  const career = $("#careerSelect").value;
  $("#careerOutput").textContent = roadmaps[career];
});
