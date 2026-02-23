document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const reveals = document.querySelectorAll('.reveal');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const menuSpans = mobileMenuIcon ? mobileMenuIcon.querySelectorAll('span') : [];

    // ── Helpers ────────────────────────────────────────────
    function openMobileMenu() {
        navLinks.classList.add('active-mobile');
        document.body.classList.add('no-scroll');
        menuSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuSpans[1].style.opacity = '0';
        menuSpans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        mobileMenuIcon.setAttribute('aria-label', 'Tutup Menu');
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active-mobile');
        document.body.classList.remove('no-scroll');
        menuSpans[0].style.transform = '';
        menuSpans[1].style.opacity = '';
        menuSpans[2].style.transform = '';
        mobileMenuIcon.setAttribute('aria-label', 'Buka Menu');
    }

    // ── 1. Header scroll effect ─────────────────────────────
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── 2. Scroll reveal ────────────────────────────────────
    const revealOnScroll = () => {
        const vh = window.innerHeight;
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < vh - 120) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();

    // ── 3. Mobile menu toggle ───────────────────────────────
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active-mobile');
            isOpen ? closeMobileMenu() : openMobileMenu();
        });
    }

    // ── 4. Auto-close menu on any nav link click ────────────
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const isAnchor = href && href.startsWith('#');

                // Close menu first
                closeMobileMenu();

                // Handle anchor scroll with offset
                if (isAnchor) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: target.offsetTop - 75,
                                behavior: 'smooth'
                            });
                        }, 100);
                    }
                }
                // If it's a page link (e.g. blog.html), let browser navigate normally
            });
        });
    }

    // ── 5. Close menu on Escape key ────────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active-mobile')) {
            closeMobileMenu();
        }
    });

    // ── 6. Table of Contents toggle ────────────────────────
    const toc = document.querySelector('.toc-container');
    if (toc) {
        const tocHeader = toc.querySelector('.toc-header');
        if (tocHeader) {
            tocHeader.addEventListener('click', () => toc.classList.toggle('active'));
        }
    }

    // ── 7. Scroll-to-top button ─────────────────────────────
    const scrollTopBtn = document.querySelector('.btn-scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('show', window.scrollY > 400);
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // ── 8. FAQ Home Accordion ───────────────────────────────
    const faqButtons = document.querySelectorAll('.faq-home-q');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            faqButtons.forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.classList.remove('open');
                }
            });

            // Toggle current
            btn.setAttribute('aria-expanded', String(!isOpen));
            answer.classList.toggle('open', !isOpen);
        });
    });
});

