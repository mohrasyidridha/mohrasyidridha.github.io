document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       AOS ANIMATION
    ========================================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 700,
            easing: "ease-out",
            once: true,
            offset: 80
        });


        /* =========================================
   3D PROJECT MODAL
========================================= */

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalOverlay = document.querySelector(".project-modal-overlay");

const projectDetailButtons = document.querySelectorAll(
    ".project-detail-btn, .project-detail-trigger"
);

function openProjectModal() {

    if (!projectModal) return;

    projectModal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeProjectModal() {

    if (!projectModal) return;

    projectModal.classList.remove("active");

    document.body.style.overflow = "";

}

projectDetailButtons.forEach((button) => {

    button.addEventListener("click", openProjectModal);

});

if (projectModalClose) {

    projectModalClose.addEventListener(
        "click",
        closeProjectModal
    );

}

if (projectModalOverlay) {

    projectModalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}

/* Close with ESC */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        projectModal &&
        projectModal.classList.contains("active")
    ) {

        closeProjectModal();

    }

});


/* =========================================
   PROJECT 05 MODAL
========================================= */

const project05Modal = document.getElementById("project05Modal");
const project05ModalClose = document.getElementById("project05ModalClose");
const project05ModalOverlay = project05Modal
    ? project05Modal.querySelector(".project-modal-overlay")
    : null;

const project05Buttons = document.querySelectorAll(
    "#project05Card .project-detail-btn, " +
    "#project05Card .project-detail-trigger"
);

function openProject05Modal() {
    if (!project05Modal) return;

    project05Modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeProject05Modal() {
    if (!project05Modal) return;

    project05Modal.classList.remove("active");
    document.body.style.overflow = "";
}

project05Buttons.forEach((button) => {
    button.addEventListener("click", openProject05Modal);
});

if (project05ModalClose) {
    project05ModalClose.addEventListener(
        "click",
        closeProject05Modal
    );
}

if (project05ModalOverlay) {
    project05ModalOverlay.addEventListener(
        "click",
        closeProject05Modal
    );
}

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        project05Modal &&
        project05Modal.classList.contains("active")
    ) {
        closeProject05Modal();
    }

});


/* =========================================
   PROJECT 06 MODAL
========================================= */

const project06Modal = document.getElementById("project06Modal");

const project06ModalClose =
    document.getElementById("project06ModalClose");

const project06ModalOverlay = project06Modal
    ? project06Modal.querySelector(".project-modal-overlay")
    : null;


/* PROJECT 06 BUTTONS */

const project06Buttons = document.querySelectorAll(
    "#project06Card .project-detail-btn, " +
    "#project06Card .project-detail-trigger"
);


/* OPEN MODAL */

function openProject06Modal() {

    if (!project06Modal) return;

    project06Modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* CLOSE MODAL */

function closeProject06Modal() {

    if (!project06Modal) return;

    project06Modal.classList.remove("active");

    document.body.style.overflow = "";
}


/* BUTTON EVENT */

project06Buttons.forEach((button) => {

    button.addEventListener(
        "click",
        openProject06Modal
    );

});


/* CLOSE BUTTON */

if (project06ModalClose) {

    project06ModalClose.addEventListener(
        "click",
        closeProject06Modal
    );

}


/* CLOSE OVERLAY */

if (project06ModalOverlay) {

    project06ModalOverlay.addEventListener(
        "click",
        closeProject06Modal
    );

}


/* ESC KEY */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        project06Modal &&
        project06Modal.classList.contains("active")
    ) {

        closeProject06Modal();

    }

});


    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
    }


    /* =========================================
       CLOSE MOBILE MENU
       WHEN NAVIGATION LINK IS CLICKED
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            }

        });

    });


    /* =========================================
       FOOTER YEAR
    ========================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       ACTIVE NAVIGATION
       BASED ON SCROLL POSITION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {

        const scrollPosition = window.scrollY + 150;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = sectionId;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", (event) => {

        if (!menuToggle || !navMenu) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    });


     /* =========================================
       PROJECT FILTER
    ========================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectItems =
        document.querySelectorAll(".project");


    if (filterButtons.length > 0 &&
        projectItems.length > 0) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                /* Remove active from all buttons */

                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });


                /* Activate clicked button */

                button.classList.add("active");


                /* Get selected filter */

                const filter =
                    button.dataset.filter;


                /* Show / hide projects */

                projectItems.forEach(project => {

                    const category =
                        project.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        project.style.display = "grid";

                    } else {

                        project.style.display = "none";

                    }

                });

            });

        });

    }

});


