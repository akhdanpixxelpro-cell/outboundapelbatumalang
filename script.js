document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const reveals = document.querySelectorAll('.reveal');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    // 1. Header background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 3. Mobile Menu Toggle
    mobileMenuIcon.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active-mobile');
        document.body.classList.toggle('no-scroll', isOpen);

        // Simple animation for hamburger menu
        const spans = mobileMenuIcon.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 4. Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu first
                if (navLinks.classList.contains('active-mobile')) {
                    navLinks.classList.remove('active-mobile');
                    document.body.classList.remove('no-scroll');
                    const spans = mobileMenuIcon.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }

                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Table of Content Toggle
    const toc = document.querySelector('.toc-container');
    if (toc) {
        const tocHeader = toc.querySelector('.toc-header');
        if (tocHeader) {
            tocHeader.addEventListener('click', () => {
                toc.classList.toggle('active');
            });
        }
    }

    // 6. Scroll to Top Button Visibility
    const scrollTopBtn = document.querySelector('.btn-scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        // 7. Scroll to top execution
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
