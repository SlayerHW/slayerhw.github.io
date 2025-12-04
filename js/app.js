// --- TRANSLATIONS DICTIONARY ---
const translations = {
  pl: {
    hero_desc: "Ponad 11 lat doświadczenia w budowaniu skalowalnych systemów e-commerce.<br>Ekspert w ekosystemie Java, SAP Hybris & AI-Assisted Development.",
    contact_btn: "Skontaktuj się",
    download_cv: "Pobierz CV",
    exp_title: "Ścieżka Kariery",
    skills_title: "Moje Technologie",
    contact_title: "Kontakt",

    // Job Descriptions
    role_future: "Twój Projekt / Twoja Firma",
    company_future: "Lead / Senior Backend Developer",
    desc_future: "Szukam nowych wyzwań. Moje doświadczenie i pasja do AI mogą wesprzeć Twój zespół w budowaniu kolejnych świetnych rozwiązań.",

    role_senior: "Senior Backend Developer",
    role_dev: "Developer",
    role_junior: "Junior Developer",
    role_early: "Początki Kariery / Staże",

    desc_orange_new: "Projektowanie i rozwój dedykowanych mikroserwisów Spring Boot dla kluczowych modułów e-commerce. Implementacja logiki biznesowej w Java 17 oraz testy w Spock/Groovy.",
    desc_xxl: "Migracja funkcjonalności z SAP Hybris do architektury Serverless (AWS Lambda). Implementacja nowych funkcji dla największego sprzedawcy sportowego w Szwecji.",
    desc_mediq: "Budowa nowego sklepu internetowego oraz systemu obsługi recept zintegrowanego z SAP Cloud.",
    desc_volvo: "Aktualizacja serwera konwersji dokumentów (Miramo API & Jetty) do pracy wielowątkowej.",
    desc_bosch: "Rozwój globalnej platformy Bosch Commerce (custom extension SAP Hybris) działającej w 19 krajach.",
    desc_orange_old: "Backend dla portalu 'Orange Love', integracja POS, mapy punktów odbioru oraz optymalizacja SEO.",
    desc_polkomtel: "Transformacja systemów commerce na platformę SAP Hybris. Obsługa Call Center i eCare.",
    desc_early: "Pierwsze kroki w IT: integracje SAP, ATG Commerce, pluginy Eclipse, projekty szkoleniowe.",

    // Typewriter texts
    type_texts: ["Senior Backend Developer", "Java & Spring Expert", "AI Enthusiast"]
  },
  en: {
    hero_desc: "Over 11 years of experience in building scalable e-commerce systems.<br>Expert in Java, SAP Hybris & AI-Assisted Development.",
    contact_btn: "Contact Me",
    download_cv: "Download CV",
    exp_title: "Career Path",
    skills_title: "Tech Stack",
    contact_title: "Contact",

    // Job Descriptions
    role_future: "Your Project / Your Company",
    company_future: "Lead / Senior Backend Developer",
    desc_future: "Looking for new challenges. My experience and passion for AI can support your team in building the next great solution.",

    role_senior: "Senior Backend Developer",
    role_dev: "Developer",
    role_junior: "Junior Developer",
    role_early: "Early Career / Internships",

    desc_orange_new: "Designing and developing dedicated Spring Boot microservices for key e-commerce modules. Implementing business logic in Java 17 and writing tests with Spock/Groovy.",
    desc_xxl: "Migrating functionalities from SAP Hybris to Serverless architecture (AWS Lambda). Implementing new features for Sweden's largest sports retailer.",
    desc_mediq: "Building a new web shop and custom prescription handling system integrated with SAP Cloud.",
    desc_volvo: "Upgrading document conversion server (Miramo API & Jetty) to support multi-threading.",
    desc_bosch: "Developing the global Bosch Commerce platform (custom SAP Hybris extension) operating in 19 countries.",
    desc_orange_old: "Backend for 'Orange Love' portal, POS integration, pickup point maps, and SEO optimization.",
    desc_polkomtel: "Transitioning commerce systems to SAP Hybris platform. Supporting Call Center and eCare modules.",
    desc_early: "First steps in IT: SAP integrations, ATG Commerce, Eclipse plugins, training projects.",

    // Typewriter texts
    type_texts: ["Senior Backend Developer", "Java & Spring Expert", "AI Enthusiast","Full Time father and husband"]
  }
};

let currentLang = 'en';

// --- TYPEWRITER LOGIC ---
const textElement = document.getElementById("typewriter");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function type() {
  const texts = translations[currentLang].type_texts;
  const currentText = texts[textIndex];

  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typeTimeout = setTimeout(type, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeTimeout = setTimeout(type, 500);
  } else {
    typeTimeout = setTimeout(type, isDeleting ? 50 : 100);
  }
}

// --- LANGUAGE SWITCHER LOGIC ---
function setLanguage(lang) {
  currentLang = lang;

  document.getElementById('btn-pl').classList.toggle('active', lang === 'pl');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  clearTimeout(typeTimeout);
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;
  textElement.textContent = "";
  type();

  localStorage.setItem('preferred_lang', lang);
}

// --- SCROLL REVEAL ---
function reveal() {
  var reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred_lang') || 'pl';
  setLanguage(savedLang);
  reveal();
});
