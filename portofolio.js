document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MRR ENGINEERING
       PORTFOLIO JAVASCRIPT
    ===================================================== */


    /* =====================================================
       01. AOS ANIMATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 700,
            easing: "ease-out",
            once: true,
            offset: 80
        });

    }


    /* =====================================================
       02. MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");


    function closeMobileMenu() {

        if (!navMenu) return;

        navMenu.classList.remove("active");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    }


    function openMobileMenu() {

        if (!navMenu) return;

        navMenu.classList.add("active");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';
        }

    }


    if (menuToggle && navMenu) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                navMenu.classList.contains("active");


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });

    }


    /* =====================================================
       03. CLOSE MOBILE MENU
       WHEN NAVIGATION LINK IS CLICKED
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* =====================================================
       04. CLOSE MOBILE MENU
       WHEN CLICKING OUTSIDE
    ===================================================== */

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

            closeMobileMenu();

        }

    });


    /* =====================================================
       05. FOOTER YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       06. ACTIVE NAVIGATION
       BASED ON SCROLL POSITION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNav() {

        if (!sections.length || !navLinks.length) {
            return;
        }


        const scrollPosition =
            window.scrollY + 150;


        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection = sectionId;

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");


            const linkTarget =
                link.getAttribute("href");


            if (
                linkTarget ===
                `#${currentSection}`
            ) {

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


/* =====================================================
   07. PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectItems =
    document.querySelectorAll(".project");


if (
    filterButtons.length > 0 &&
    projectItems.length > 0
) {

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            /* -----------------------------------------
               REMOVE ACTIVE FROM ALL BUTTONS
            ----------------------------------------- */

            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });


            /* -----------------------------------------
               ACTIVATE SELECTED BUTTON
            ----------------------------------------- */

            button.classList.add("active");


            /* -----------------------------------------
               GET FILTER
            ----------------------------------------- */

            const filter =
                button.dataset.filter;


            /* -----------------------------------------
               FILTER PROJECTS
            ----------------------------------------- */

            projectItems.forEach((project) => {

                const category =
                    project.dataset.category;


                const shouldShow =
                    filter === "all" ||
                    category === filter;


                if (shouldShow) {

                    project.classList.remove("hidden");

                } else {

                    project.classList.add("hidden");

                }

            });


            /* -----------------------------------------
               REFRESH AOS
            ----------------------------------------- */

            if (typeof AOS !== "undefined") {

                AOS.refresh();

            }

        });

    });

}


    /* =====================================================
       08. PROJECT MODAL SYSTEM
    ===================================================== */

    const modalConfigurations = [

        {
            modalId: "projectModal",
            closeId: "projectModalClose",
            cardId: "project04Card"
        },

        {
            modalId: "project05Modal",
            closeId: "project05ModalClose",
            cardId: "project05Card"
        },

        {
            modalId: "project06Modal",
            closeId: "project06ModalClose",
            cardId: "project06Card"
        }

    ];


    const activeModals = [];


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openModal(modal) {

        if (!modal) return;


        modal.classList.add("active");


        document.body.classList.add(
            "modal-open"
        );


        document.body.style.overflow = "hidden";


        activeModals.push(modal);

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal(modal) {

        if (!modal) return;


        modal.classList.remove("active");


        const index =
            activeModals.indexOf(modal);


        if (index !== -1) {

            activeModals.splice(index, 1);

        }


        /*
         * Jika tidak ada modal yang masih terbuka,
         * kembalikan scroll halaman.
         */

        const anyModalOpen =
            document.querySelector(
                ".project-modal.active"
            );


        if (!anyModalOpen) {

            document.body.classList.remove(
                "modal-open"
            );

            document.body.style.overflow = "";

        }

    }


    /* =====================================================
       INITIALIZE ALL PROJECT MODALS
    ===================================================== */

    modalConfigurations.forEach((config) => {

        const modal =
            document.getElementById(
                config.modalId
            );


        const closeButton =
            document.getElementById(
                config.closeId
            );


        const projectCard =
            document.getElementById(
                config.cardId
            );


        if (!modal) return;


        /* ---------------------------------------------
           MODAL OVERLAY
        --------------------------------------------- */

        const overlay =
            modal.querySelector(
                ".project-modal-overlay"
            );


        /* ---------------------------------------------
           PROJECT DETAIL BUTTONS
        --------------------------------------------- */

        const detailButtons =
            projectCard
                ? projectCard.querySelectorAll(
                    ".project-detail-btn, " +
                    ".project-detail-trigger"
                )
                : [];


        /* ---------------------------------------------
           OPEN BUTTON
        --------------------------------------------- */

        detailButtons.forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    openModal(modal);

                }
            );

        });


        /* ---------------------------------------------
           CLOSE BUTTON
        --------------------------------------------- */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    closeModal(modal);

                }
            );

        }


        /* ---------------------------------------------
           CLOSE WHEN CLICKING OVERLAY
        --------------------------------------------- */

        if (overlay) {

            overlay.addEventListener(
                "click",
                () => {

                    closeModal(modal);

                }
            );

        }

    });


    /* =====================================================
       09. ESCAPE KEY
       CLOSE ACTIVE MODAL
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            const activeModal =
                document.querySelector(
                    ".project-modal.active"
                );


            if (activeModal) {

                closeModal(activeModal);

            }

        }
    );


    /* =====================================================
       10. PREVENT MODAL CONTENT
       FROM CLOSING MODAL
    ===================================================== */

    document
        .querySelectorAll(".project-modal-content")
        .forEach((content) => {

            content.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );

        });


    /* =====================================================
       11. WINDOW RESIZE
       CLOSE MOBILE MENU ON DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768 &&
                navMenu
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       12. INITIAL PAGE STATE
    ===================================================== */

    /*
     * Pastikan semua modal dalam keadaan tertutup
     * ketika halaman pertama kali dibuka.
     */

    document
        .querySelectorAll(".project-modal")
        .forEach((modal) => {

            modal.classList.remove("active");

        });


    /*
     * Pastikan halaman dapat di-scroll.
     */

    document.body.classList.remove(
        "modal-open"
    );

    document.body.style.overflow = "";


});
