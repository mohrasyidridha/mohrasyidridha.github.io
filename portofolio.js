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

});
