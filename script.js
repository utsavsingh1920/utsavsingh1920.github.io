
/* =========================================================
   UTSAV SINGH PORTFOLIO
   FINAL script.js
========================================================= */


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 400);
    }, 450);
});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header = document.getElementById("header");

function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader);
updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", "false");
}

function closeMobileMenu() {
    if (!navMenu || !menuBtn) return;

    navMenu.classList.remove("open");
    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
}

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });
}


/* CLOSE MENU OUTSIDE CLICK */

document.addEventListener("click", (event) => {
    if (!navMenu || !menuBtn) return;

    if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        closeMobileMenu();
    }
});


/* CLOSE MENU WITH ESCAPE */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});


/* RESET MENU ON DESKTOP */

window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
        closeMobileMenu();
    }
});


/* =========================================================
   DARK / LIGHT THEME
========================================================= */

const themeButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

let savedTheme = "dark";

try {
    savedTheme = localStorage.getItem("utsav-portfolio-theme") || "dark";
} catch (error) {
    savedTheme = "dark";
}

if (savedTheme === "light") {
    document.body.classList.add("light");

    if (themeIcon) {
        themeIcon.textContent = "☾";
    }
} else {
    document.body.classList.remove("light");

    if (themeIcon) {
        themeIcon.textContent = "☀";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");

        try {
            localStorage.setItem(
                "utsav-portfolio-theme",
                isLight ? "light" : "dark"
            );
        } catch (error) {
            // Theme still works for the current page.
        }

        if (themeIcon) {
            themeIcon.textContent = isLight ? "☾" : "☀";
        }
    });
}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateNavigation() {
    let currentSection = "home";
    const position = window.scrollY + 190;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (position >= top && position < top + height) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateNavigation);
window.addEventListener("load", updateNavigation);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMsg");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("cname")?.value.trim();
        const email = document.getElementById("cemail")?.value.trim();
        const message = document.getElementById("cmsg")?.value.trim();

        if (!name || !email || !message) {
            if (formMessage) {
                formMessage.textContent = "Please complete all fields.";
                formMessage.style.color = "#ff6b6b";
            }
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            if (formMessage) {
                formMessage.textContent = "Please enter a valid email.";
                formMessage.style.color = "#ff6b6b";
            }
            return;
        }

        const subject = encodeURIComponent(
            `Portfolio Contact from ${name}`
        );

        const body = encodeURIComponent(
`Hello Utsav,

My name is ${name}.

Email: ${email}

${message}

Regards,
${name}`
        );

        const mailtoLink =
            `mailto:singhutsav0007@gmail.com?subject=${subject}&body=${body}`;

        if (formMessage) {
            formMessage.textContent =
                "Opening your email application...";
            formMessage.style.color = "#34d399";
        }

        window.location.href = mailtoLink;
    });
}


/* =========================================================
   EXTERNAL LINK SECURITY
========================================================= */

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
});


/* =========================================================
   PROJECT IMAGE FALLBACK
========================================================= */

document.querySelectorAll(".project-image img").forEach((img) => {
    img.addEventListener("error", () => {
        img.style.display = "none";

        const holder = img.parentElement;

        if (holder && !holder.querySelector(".image-help")) {
            const note = document.createElement("p");

            note.className = "image-help";
            note.textContent =
                "Add " + img.getAttribute("src") + " to the portfolio folder";

            holder.appendChild(note);
        }
    });
});


/* =========================================================
   PROFILE IMAGE LOADING SAFETY
========================================================= */

const profileImage = document.querySelector(".photo-ring img");

if (profileImage) {
    profileImage.addEventListener("error", () => {
        profileImage.alt = "Utsav Singh Profile";
    });
}


/* =========================================================
   BUTTON TAP EFFECT FOR MOBILE
========================================================= */

document.querySelectorAll(
    ".btn, .icon-btn, .project-card, .skill-card"
).forEach((element) => {
    element.addEventListener(
        "touchstart",
        () => {
            element.classList.add("touch-active");
        },
        { passive: true }
    );

    element.addEventListener(
        "touchend",
        () => {
            setTimeout(() => {
                element.classList.remove("touch-active");
            }, 150);
        },
        { passive: true }
    );
});


/* =========================================================
   PREVENT EMPTY LINKS
========================================================= */

document.querySelectorAll('a[href=""]').forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
    });
});


/* =========================================================
   PROJECT ACTION BUTTON SAFETY
========================================================= */

document.querySelectorAll(".project-actions a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});


/* =========================================================
   AI RESUME ANALYZER LIVE DEMO ACCESSIBILITY
========================================================= */

const resumeLiveDemo = document.getElementById("resumeLiveDemo");

if (resumeLiveDemo) {
    resumeLiveDemo.setAttribute(
        "title",
        "Open AI Resume Analyzer Live Demo"
    );
}


/* =========================================================
   PROJECT EXTERNAL LINK SECURITY
========================================================= */

document.querySelectorAll(".project-actions a").forEach((link) => {
    if (
        link.hostname &&
        link.hostname !== window.location.hostname
    ) {
        link.setAttribute("rel", "noopener noreferrer");
    }
});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    updateHeader();
    updateNavigation();
});


/* =========================================================
   APK DOWNLOAD DIALOGS
   SONEXA, FREEGI AND DHANVIQ
========================================================= */

(() => {
    const triggers = document.querySelectorAll(".app-download-trigger");
    const dialogs = document.querySelectorAll("[data-download-dialog]");

    let activeTrigger = null;

    /* CLOSE DOWNLOAD DIALOG */

    const closeDialog = (dialog) => {
        if (!dialog) return;

        dialog.hidden = true;
        document.body.classList.remove("app-download-open");

        if (activeTrigger) {
            activeTrigger.setAttribute("aria-expanded", "false");
            activeTrigger.focus();
        }

        activeTrigger = null;
    };


    /* DETECT ANDROID DEVICE FOR SONEXA */

    const detectSonexa = async (dialog) => {
        const status = dialog.querySelector("[data-detection-status]");

        if (!status || status.dataset.checked === "true") return;

        status.dataset.checked = "true";

        if (!/Android/i.test(navigator.userAgent)) {
            status.textContent =
                "You are viewing this on a computer. Open this page on your Android phone for a device suggestion, or choose an APK manually.";
            return;
        }

        const uaData = navigator.userAgentData;

        if (
            !uaData ||
            typeof uaData.getHighEntropyValues !== "function"
        ) {
            status.textContent =
                "Android detected, but this browser does not share the CPU type. Please choose your APK manually.";
            return;
        }

        try {
            const details = await uaData.getHighEntropyValues([
                "architecture",
                "bitness"
            ]);

            const arch = String(details.architecture || "").toLowerCase();
            const bits = String(details.bitness || "");

            let match = null;

            if (arch === "arm" && bits === "64") {
                match = "arm64";
            } else if (arch === "arm" && bits === "32") {
                match = "arm32";
            } else if (
                (arch === "x86" || arch === "x86_64") &&
                bits === "64"
            ) {
                match = "x86_64";
            }

            if (!match) {
                status.textContent =
                    "Android detected, but the browser could not confirm the CPU architecture. Please choose manually.";
                return;
            }

            const option = dialog.querySelector(
                `[data-arch="${match}"]`
            );

            if (option) {
                option.classList.add("is-recommended");

                const copy = option.querySelector(".app-apk-copy");

                if (
                    copy &&
                    !copy.querySelector(".app-recommended-label")
                ) {
                    const label = document.createElement("em");

                    label.className = "app-recommended-label";
                    label.textContent = "Suggested for this device";

                    copy.appendChild(label);
                }

                status.textContent =
                    "Your Android device appears compatible with the highlighted APK. Tap it to download.";
            }
        } catch (error) {
            status.textContent =
                "Automatic detection is unavailable. Please choose your APK manually.";
        }
    };


    /* OPEN DOWNLOAD DIALOG */

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const appName = trigger.dataset.app;

            const dialog = document.getElementById(
                `${appName}DownloadDialog`
            );

            if (!dialog) return;

            activeTrigger = trigger;

            dialog.hidden = false;

            document.body.classList.add("app-download-open");

            trigger.setAttribute("aria-expanded", "true");

            const closeButton = dialog.querySelector(
                ".app-download-close"
            );

            if (closeButton) {
                closeButton.focus();
            }

            if (appName === "sonexa") {
                detectSonexa(dialog);
            }
        });
    });


    /* CLOSE BUTTON AND BACKDROP */

    dialogs.forEach((dialog) => {
        const closeButton = dialog.querySelector(
            ".app-download-close"
        );

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                closeDialog(dialog);
            });
        }

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });
    });


    /* CLOSE DIALOG WITH ESCAPE */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        const openDialog = document.querySelector(
            '[data-download-dialog]:not([hidden])'
        );

        if (openDialog) {
            closeDialog(openDialog);
        }
    });

})();
