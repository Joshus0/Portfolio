const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");
const navLinks = document.querySelectorAll(".nav-links a");
const yearElement = document.getElementById("year");
const themeToggle = document.getElementById("theme-toggle");
const typingTitle = document.getElementById("typing-title");
const revealElements = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const counters = document.querySelectorAll(".counter");
const skillBars = document.querySelectorAll(".skill-progress");
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("open");
    });
}

if (navLinks.length > 0 && navList) {
    navLinks.forEach((link) => {
        link.addEventListener("click", () => navList.classList.remove("open"));
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        if (nextTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
        localStorage.setItem("theme", nextTheme);
    });
}

if (typingTitle) {
    const text = typingTitle.dataset.text || "";
    let index = 0;
    const typing = setInterval(() => {
        typingTitle.textContent = text.slice(0, index);
        index += 1;
        if (index > text.length) {
            clearInterval(typing);
        }
    }, 60);
}

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => revealObserver.observe(element));
}

if (counters.length > 0) {
    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target || 0);
        let value = 0;
        const increment = Math.max(1, Math.floor(target / 70));
        const interval = setInterval(() => {
            value += increment;
            if (value >= target) {
                counter.textContent = String(target);
                clearInterval(interval);
                return;
            }
            counter.textContent = String(value);
        }, 20);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach((counter) => counterObserver.observe(counter));
}

if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level || "0";
                entry.target.style.width = `${level}%`;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach((bar) => skillsObserver.observe(bar));
}

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach((card) => {
                const categories = card.dataset.category || "";
                const showCard = filter === "all" || categories.includes(filter);
                card.classList.toggle("hidden", !showCard);
            });
        });
    });
}

if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !email || !message) {
            formFeedback.textContent = "Compila tutti i campi prima di inviare.";
            formFeedback.className = "form-feedback error";
            return;
        }

        if (!emailValid) {
            formFeedback.textContent = "Inserisci un indirizzo email valido.";
            formFeedback.className = "form-feedback error";
            return;
        }

        formFeedback.textContent = "Messaggio inviato con successo! Ti rispondero presto.";
        formFeedback.className = "form-feedback success";
        contactForm.reset();
    });
}
