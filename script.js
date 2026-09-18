

document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    const navbar = document.getElementById('mainNav');
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleActiveNav = () => {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', handleActiveNav);

    const navCollapse = document.getElementById('navbarNav');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    const typedElement = document.getElementById('typedText');
    const roles = ['Full Stack Developer', 'Frontend Developer', 'Web Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    };
    typeEffect();

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    const backToTop = document.getElementById('backToTop');
    const handleBackToTop = () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleBackToTop);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        function showFormMessage(text, type) {
            const existingMsg = document.querySelector('.form-message');
            if (existingMsg) existingMsg.remove();

            const msg = document.createElement('div');
            msg.className = `form-message form-message-${type}`;
            msg.style.cssText = `
                padding: 12px 20px;
                border-radius: 8px;
                margin-bottom: 16px;
                font-size: 0.9rem;
                font-weight: 500;
                ${type === 'success'
                    ? 'background: rgba(40, 200, 64, 0.15); color: #28c840; border: 1px solid rgba(40, 200, 64, 0.3);'
                    : 'background: rgba(255, 95, 87, 0.15); color: #ff5f57; border: 1px solid rgba(255, 95, 87, 0.3);'
                }
            `;
            msg.textContent = text;
            contactForm.insertBefore(msg, contactForm.firstChild);

            setTimeout(() => {
                msg.style.opacity = '0';
                msg.style.transform = 'translateY(-10px)';
                msg.style.transition = '0.3s ease';
                setTimeout(() => msg.remove(), 300);
            }, 4000);
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Parallax Effect on Hero (subtle) ===
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.scrollY;
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
            }
        }
    });

    function createSnowflakes() {
        const container = document.getElementById('snowfallContainer');
        if (!container) return;
        
        const snowflakeCount = 50;
        const symbols = ['❄', '❅', '❆', '✦', '✧', '★', '☆'];
        
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            const left = Math.random() * 100;
            const size = Math.random() * 12 + 8;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 15;
            const opacity = Math.random() * 0.5 + 0.3;
            const drift = (Math.random() - 0.5) * 200;
            
            snowflake.style.cssText = `
                left: ${left}vw;
                font-size: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                opacity: ${opacity};
                --drift: ${drift}px;
            `;
            
            snowflake.style.animation = `snowfall ${duration}s linear ${delay}s infinite`;
            
            container.appendChild(snowflake);
        }
    }
    
    createSnowflakes();

    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (!themeToggle || !themeDropdown) {
        console.error('Theme toggle elements not found:', { themeToggle, themeDropdown });
    } else {
        function positionDropdown() {
            const rect = themeToggle.getBoundingClientRect();
            themeDropdown.style.top = `${rect.bottom + 8}px`;
            themeDropdown.style.right = `${window.innerWidth - rect.right}px`;
        }

        // Load saved theme (default to 'nightcloud' on first visit)
        const savedTheme = localStorage.getItem('portfolio-theme');
        const firstLoad = !localStorage.getItem('theme-visited');
        if (firstLoad) {
            localStorage.setItem('theme-visited', 'done');
            applyTheme('nightcloud');
        } else {
            applyTheme(savedTheme || 'nightcloud');
        }

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpening = !themeDropdown.classList.contains('show');
            themeDropdown.classList.toggle('show');
            if (isOpening) {
                positionDropdown();
            }
        });

        themeToggle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        window.addEventListener('scroll', () => {
            if (themeDropdown.classList.contains('show')) positionDropdown();
        }, { passive: true });
        window.addEventListener('resize', () => {
            if (themeDropdown.classList.contains('show')) positionDropdown();
        });

        document.addEventListener('click', (e) => {
            if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
                themeDropdown.classList.remove('show');
            }
        });

        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                applyTheme(theme);
                themeDropdown.classList.remove('show');
            });
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-theme') === theme);
        });

        const cloudsContainer = document.querySelector('.clouds-container');
        const snowfallContainer = document.getElementById('snowfallContainer');
        const isNightCloud = theme === 'nightcloud';
        if (cloudsContainer) cloudsContainer.style.display = isNightCloud ? 'block' : 'none';
        if (snowfallContainer) snowfallContainer.style.display = isNightCloud ? 'block' : 'none';
    }

    window.applyTheme = applyTheme;
    window.toggleThemeDropdown = () => {
        const dd = document.getElementById('themeDropdown');
        if (dd) {
            const isOpening = !dd.classList.contains('show');
            dd.classList.toggle('show');
            if (isOpening) {
                const btn = document.getElementById('themeToggle');
                if (btn) {
                    const rect = btn.getBoundingClientRect();
                    dd.style.top = `${rect.bottom + 8}px`;
                    dd.style.right = `${window.innerWidth - rect.right}px`;
                }
            }
        }
    };

    window.showLinkNotice = (type) => {
        const messages = {
            'GitHub': 'Add your GitHub repository URL in the HTML to enable this link.',
            'Live Demo': 'Add your live demo URL in the HTML to enable this link.'
        };
        alert(messages[type] || 'Add your URL in the HTML to enable this link.');
    };

});
