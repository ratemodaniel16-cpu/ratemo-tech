
// RATEMO TECH - JavaScript

// Explore More button
function showMessage() {
    alert("Welcome to RATEMO TECH! 🚀");
}

// Back to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

console.log("Ratemo Tech website loaded successfully!");

document.addEventListener("DOMContentLoaded", function() {
    // SUPABASE DATABASE CONNECTION
const SUPABASE_URL = "https://wpqjdacekmbpurlwqqty.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KCrCChOGLRp6385kHyDuyA_6oN2zOuf.co";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

    // BACK TO TOP
    const topBtn = document.getElementById("topBtn");

    if (topBtn) {
        topBtn.style.display = "none";

        window.addEventListener("scroll", function() {
            topBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });
    }

    // LOADING SCREEN
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function() {
            loader.style.opacity = "0";

            setTimeout(function() {
                loader.style.display = "none";
            }, 500);

        }, 2000);
    }

    // DARK AND LIGHT MODE
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeToggle.textContent = "🌙 Dark Mode";
        }

        themeToggle.addEventListener("click", function() {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
                themeToggle.textContent = "🌙 Dark Mode";
            } else {
                localStorage.setItem("theme", "dark");
                themeToggle.textContent = "☀️ Light Mode";
            }
        });
    }

    // TYPING INTRO
    const typingText = document.getElementById("typing-text");

    if (typingText) {
        const words = [
            "RATEMO TECH",
            "Innovation",
            "Technology",
            "The Future"
        ];

        let wordIndex = 0;
        let letterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                letterIndex--;
            } else {
                letterIndex++;
            }

            typingText.textContent = currentWord.substring(0, letterIndex);

            let speed = deleting ? 70 : 120;

            if (!deleting && letterIndex === currentWord.length) {
                deleting = true;
                speed = 1200;
            } else if (deleting && letterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // ANIMATED COUNTERS
    const counters = document.querySelectorAll(".counter");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = Number(counter.dataset.target);
                    let current = 0;
                    const increment = Math.ceil(target / 50);

                    const timer = setInterval(function() {
                        current += increment;

                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }

                        counter.textContent = current;
                    }, 30);

                    observer.unobserve(counter);
                }
            });
        });

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });

        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");

            menuToggle.textContent =
                navMenu.classList.contains("active") ? "✕" : "☰";
        });
    }

 
// CONTACT FORM - SUPABASE DATABASE

const contactForm = document.getElementById("contactForm");
const successPopup = document.getElementById("successPopup");

if (contactForm && successPopup) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const subject = formData.get("subject").trim();
        const message = formData.get("message").trim();

        try {

            const { data, error } = await supabaseClient
                .from("contact_messages")
                .insert([
                    {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    }
                ]);

            if (error) {
                console.error("Supabase error:", error);
                alert("Message could not be saved. Please try again.");
                return;
            }

            contactForm.reset();

            successPopup.classList.add("show");

            setTimeout(function() {
                successPopup.classList.remove("show");
            }, 4000);

        } catch (error) {

            console.error("Connection error:", error);
            alert("Connection error. Please try again.");

        }

    });

}   

    // SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    "section, .project-card, .stat-box"
);

revealElements.forEach(function(element) {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
});

revealElements.forEach(function(element) {
    revealObserver.observe(element);
});
// CUSTOM CURSOR GLOW
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    document.addEventListener("mousemove", function(event) {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}

});
