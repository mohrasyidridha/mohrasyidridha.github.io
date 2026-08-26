/* =========================================================
   MRR ENGINEERING PORTFOLIO
========================================================= */


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

window.addEventListener("load", updateActiveNavigation);


/* =========================================================
   SKILL SYSTEM
========================================================= */

const skillNodes = document.querySelectorAll(".skill-node");

const skillCategory = document.getElementById("skillCategory");
const skillName = document.getElementById("skillName");
const skillDescription = document.getElementById("skillDescription");
const skillValue = document.getElementById("skillValue");

const monitorNames = document.querySelectorAll(".monitor-name");
const monitorValues = document.querySelectorAll(".monitor-value");
const monitorProgress = document.querySelectorAll(".monitor-progress");


function updateSkill(node) {

    if (!node) return;


    /* -------------------------
       DATA
    ------------------------- */

    const category =
        node.dataset.category || "";

    const name =
        node.dataset.name || "";

    const value =
        node.dataset.value || "0";

    const description =
        node.dataset.description || "";


    /* -------------------------
       MAIN INFORMATION
    ------------------------- */

    if (skillCategory) {
        skillCategory.textContent = category;
    }

    if (skillName) {
        skillName.textContent = name;
    }

    if (skillDescription) {
        skillDescription.textContent = description;
    }

    if (skillValue) {
        skillValue.textContent = `${value}%`;
    }


    /* -------------------------
       MONITOR DATA
    ------------------------- */

    const skills = [
        {
            name: node.dataset.skill1,
            value: node.dataset.value1
        },
        {
            name: node.dataset.skill2,
            value: node.dataset.value2
        },
        {
            name: node.dataset.skill3,
            value: node.dataset.value3
        }
    ];


    skills.forEach((skill, index) => {

        if (monitorNames[index]) {
            monitorNames[index].textContent =
                skill.name || "-";
        }

        if (monitorValues[index]) {
            monitorValues[index].textContent =
                `${skill.value || 0}%`;
        }

        if (monitorProgress[index]) {
            monitorProgress[index].style.width =
                `${skill.value || 0}%`;
        }

    });


    /* -------------------------
       ACTIVE STATE
    ------------------------- */

    skillNodes.forEach(item => {
        item.classList.remove("active");
    });

    node.classList.add("active");

}


/* =========================================================
   SKILL CLICK
========================================================= */

skillNodes.forEach(node => {

    node.addEventListener("click", () => {

        updateSkill(node);

    });

});


/* =========================================================
   INITIAL SKILL
========================================================= */

if (skillNodes.length > 0) {
    updateSkill(skillNodes[0]);
}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", () => {

        const submitButton =
            contactForm.querySelector(".contact-submit");

        if (!submitButton) return;

        submitButton.querySelector("span").textContent =
            "OPENING EMAIL...";

    });

}


/* =========================================================
   AOS
========================================================= */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 650,
        easing: "ease-out",
        once: true,
        offset: 80,
        disable: window.innerWidth < 600
    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("mobile-open");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("mobile-open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* CLOSE MENU AFTER CLICK */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("mobile-open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}
