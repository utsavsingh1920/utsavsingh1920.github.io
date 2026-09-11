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

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

function closeMobileMenu() {

    if (!navMenu || !menuBtn) return;

    navMenu.classList.remove("open");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute(
        "aria-label",
        "Open navigation"
    );

}


if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", event => {

        event.stopPropagation();

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuBtn.textContent =
            isOpen ? "✕" : "☰";

        menuBtn.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

    });


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", event => {

    if (!navMenu || !menuBtn) return;

    if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        closeMobileMenu();

    }

});


/* =========================================================
   DARK / LIGHT THEME
========================================================= */

const themeButton =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


const savedTheme =
    localStorage.getItem(
        "utsav-portfolio-theme"
    );


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


themeButton?.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body
                .classList
                .contains("light");

        localStorage.setItem(
            "utsav-portfolio-theme",
            isLight ? "light" : "dark"
        );

        if (themeIcon) {

            themeIcon.textContent =
                isLight ? "☾" : "☀";

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateNavigation() {

    let currentSection = "home";

    const position =
        window.scrollY + 190;


    sections.forEach(section => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;

        if (
            position >= top &&
            position < top + height
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);

window.addEventListener(
    "load",
    updateNavigation
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(href);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMsg");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("cname")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("cemail")
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById("cmsg")
                    ?.value
                    .trim();


            /* EMPTY FIELD CHECK */

            if (
                !name ||
                !email ||
                !message
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please complete all fields.";

                    formMessage.style.color =
                        "#ff6b6b";

                }

                return;

            }


            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please enter a valid email.";

                    formMessage.style.color =
                        "#ff6b6b";

                }

                return;

            }


            /* EMAIL SUBJECT */

            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name}`
                );


            /* EMAIL BODY */

            const body =
                encodeURIComponent(
`Hello Utsav,

My name is ${name}.

Email: ${email}

${message}

Regards,
${name}`
                );


            /* MAILTO LINK */

            const mailtoLink =
                `mailto:singhutsav0007@gmail.com?subject=${subject}&body=${body}`;


            if (formMessage) {

                formMessage.textContent =
                    "Opening your email application...";

                formMessage.style.color =
                    "#34d399";

            }


            setTimeout(() => {

                window.location.href =
                    mailtoLink;

            }, 250);

        }
    );

}


/* =========================================================
   ESC KEY CLOSE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   RESPONSIVE MENU RESET
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 960
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   EXTERNAL LINK SECURITY
========================================================= */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


/* =========================================================
   PROJECT IMAGE LOADING SAFETY
========================================================= */

document
    .querySelectorAll(".project-image img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0";

            }
        );

    });


/* =========================================================
   PROFILE IMAGE LOADING SAFETY
========================================================= */

const profileImage =
    document.querySelector(
        ".photo-ring img"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            profileImage.alt =
                "Utsav Singh Profile";

        }
    );

}


/* =========================================================
   BUTTON TAP EFFECT FOR MOBILE
========================================================= */

document
    .querySelectorAll(
        ".btn, .icon-btn, .project-card, .skill-card"
    )
    .forEach(element => {

        element.addEventListener(
            "touchstart",
            () => {

                element.classList.add(
                    "touch-active"
                );

            },
            {
                passive: true
            }
        );


        element.addEventListener(
            "touchend",
            () => {

                setTimeout(() => {

                    element.classList.remove(
                        "touch-active"
                    );

                }, 150);

            },
            {
                passive: true
            }
        );

    });


/* =========================================================
   PREVENT EMPTY LINKS
========================================================= */

document
    .querySelectorAll('a[href=""]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   PROJECT ACTION BUTTON SAFETY
   SONEXA + AI RESUME ANALYZER
========================================================= */

document
    .querySelectorAll(".project-actions a")
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                /*
                    Prevent project-card click events
                    from interfering with project buttons.
                */

                event.stopPropagation();

            }
        );

    });


/* =========================================================
   SONEXA APK DOWNLOAD ACCESSIBILITY
========================================================= */

const sonexaApkLink =
    document.querySelector(
        '.project-actions a[href*="SONEXA-v1.0.0.apk"]'
    );


if (sonexaApkLink) {

    sonexaApkLink.setAttribute(
        "title",
        "Download SONEXA v1.0.0 Android APK"
    );

}


/* =========================================================
   AI RESUME ANALYZER LIVE DEMO ACCESSIBILITY
========================================================= */

const resumeLiveDemo =
    document.getElementById("resumeLiveDemo");


if (resumeLiveDemo) {

    resumeLiveDemo.setAttribute(
        "title",
        "Open AI Resume Analyzer Live Demo"
    );

}


/* =========================================================
   PROJECT EXTERNAL LINK SECURITY
========================================================= */

document
    .querySelectorAll(".project-actions a")
    .forEach(link => {

        if (
            link.hostname &&
            link.hostname !== window.location.hostname
        ) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHeader();

        updateNavigation();

    }
);