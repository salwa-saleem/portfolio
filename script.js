document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Mobile Navigation Menu
    // -------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    // -------------------------------------------------------------
    // 2. Typing Animation
    // -------------------------------------------------------------
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = [
            "AI & Data Science Student",
            "Problem Solver",
            "Python Enthusiast",
            "Tech Innovator"
        ];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIdx];
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
                typeSpeed = 50; // faster deletion
            } else {
                typingText.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
                typeSpeed = 120; // normal typing
            }

            if (!isDeleting && charIdx === currentRole.length) {
                // Pause at the end
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                typeSpeed = 500; // pause before typing next
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start typing
        setTimeout(type, 1000);
    }

    // -------------------------------------------------------------
    // 3. Canvas Particles Background
    // -------------------------------------------------------------
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;
        const connectionDistance = 120;
        
        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
                // Elegant soft cyan / blue colors
                this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.4)';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce or reset when leaving screen
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.15;
                        ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // -------------------------------------------------------------
    // 4. Scroll Reveal (Fade In) Animation
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // -------------------------------------------------------------
    // 5. Copy Email Clipboard Utility
    // -------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'salwasaleem7777@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
                copyEmailBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.classList.remove('copied');
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // -------------------------------------------------------------
    // 6. Navigation Link Highlighting on Scroll
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id') || 'home';
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-link');
            if (item.getAttribute('href') === `#${currentSectionId}` || 
                (currentSectionId === 'home' && item.getAttribute('href') === '#')) {
                item.classList.add('active-link');
            }
        });
    });
});
