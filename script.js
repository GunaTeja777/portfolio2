        // Loading screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1200);
        });

        // Custom cursor with smooth movement
        const cursor = document.getElementById('cursor');
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        const ease = 0.25; // More responsive following factor
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Interactive background effects
            createMouseEffect(e.clientX, e.clientY);
        });

        function updateCursor() {
            // Smooth easing movement
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;
            
            cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Interactive background effects
        function createMouseEffect(x, y) {
            const bgAnimation = document.getElementById('bgAnimation');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'mouse-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            bgAnimation.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 1000);
            
            // Create trail particles
            if (Math.random() < 0.1) { // Only occasionally create particles
                const trailParticle = document.createElement('div');
                trailParticle.className = 'trail-particle';
                trailParticle.style.left = x + (Math.random() - 0.5) * 50 + 'px';
                trailParticle.style.top = y + (Math.random() - 0.5) * 50 + 'px';
                bgAnimation.appendChild(trailParticle);
                
                setTimeout(() => {
                    if (trailParticle.parentNode) {
                        trailParticle.parentNode.removeChild(trailParticle);
                    }
                }, 2000);
            }
        }

        // Background particles
        function createParticles() {
            const bgAnimation = document.getElementById('bgAnimation');
            for (let i = 0; i < 80; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 12 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
                bgAnimation.appendChild(particle);
            }
        }
        createParticles();

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Typewriter effect
        const typewriter = document.getElementById('typewriter');
        const texts = ['ML Engineer', 'AI Developer', 'Computer Vision Engineer', 'Problem Solver', 'Innovation Driver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 80 : 120;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 800;
            }

            setTimeout(type, typeSpeed);
        }
        type();

        // Animate stats counter
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.dataset.target);
                        let current = 0;
                        const increment = target / 120;
                        const timer = setInterval(() => {
                            current += increment;
                            entry.target.textContent = Math.floor(current);
                            if (current >= target) {
                                entry.target.textContent = target + (target === 95 ? '%' : '+');
                                clearInterval(timer);
                            }
                        }, 30);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statNumbers.forEach(stat => observer.observe(stat));
        }
        animateStats();

        // Portfolio filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;
                
                portfolioItems.forEach((item, index) => {
                    if (filter === 'all' || item.dataset.category.includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 800) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
            animatedElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
                observer.observe(element);
            });
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    button.textContent = 'Message Sent!';
                    button.style.background = 'var(--primary)';
                    button.style.color = 'var(--bg-dark)';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = 'var(--primary)';
                        button.style.color = 'var(--bg-dark)';
                        button.disabled = false;
                        this.reset();
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(error => {
                button.textContent = 'Error! Try Again';
                button.style.background = '#ff4444';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'var(--primary)';
                    button.disabled = false;
                }, 3000);
                console.error('Error:', error);
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.geometric-shapes .shape');
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
            });
        });

        // Intersection Observer for hero animations
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        // Enhanced hover effects
        document.querySelectorAll('.service-card, .portfolio-item, .nav-link, .hire-btn, button, .social-links a, .stat-item, .logo, .logo-icon, .logo-text').forEach(element => {
            element.addEventListener('mouseenter', () => {
                // Remove cursor.classList.add('hover') to prevent cursor scaling
                element.style.transform = 'translateY(-10px) scale(1.05)';
                element.style.boxShadow = '0 20px 60px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(124, 58, 237, 0.1)';
                element.style.background = element.style.background || 'rgba(124, 58, 237, 0.05)';
                element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            element.addEventListener('mouseleave', () => {
                // Remove cursor.classList.remove('hover') to prevent cursor scaling
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '';
                element.style.background = '';
                element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });

        // Add click effect to cursor
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Performance optimization - throttle scroll events
        let ticking = false;
        function updateOnScroll() {
            // Navbar scroll effect
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Scroll to top button
            if (window.scrollY > 800) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }

            // Parallax effect
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.geometric-shapes .shape');
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Add loading states for better UX
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                link.style.opacity = '0.7';
                setTimeout(() => {
                    link.style.opacity = '1';
                }, 500);
            });
        });

        // Enhanced accessibility
        document.querySelectorAll('.btn, .nav-link, .social-link').forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });

        // Preload critical images
        const criticalImages = [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Error handling for images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', () => {
                img.style.display = 'none';
                console.warn('Failed to load image:', img.src);
            });
        });

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Add any initialization code here
            console.log('Portfolio loaded successfully!');
        });

        // Project Modal Functions
        function openProjectModal(portfolioItem) {
            const modal = document.getElementById('projectModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalFeatures = document.getElementById('modalFeatures');
            const modalTech = document.getElementById('modalTech');
            const modalLiveLink = document.getElementById('modalLiveLink');
            const modalGithubLink = document.getElementById('modalGithubLink');

            // Get data from portfolio item
            const title = portfolioItem.dataset.title;
            const description = portfolioItem.dataset.description;
            const features = portfolioItem.dataset.features.split(',');
            const tech = portfolioItem.dataset.tech.split(',');
            const liveLink = portfolioItem.dataset.live;
            const githubLink = portfolioItem.dataset.github;

            // Populate modal content
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Clear and populate features
            modalFeatures.innerHTML = '';
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.trim();
                modalFeatures.appendChild(li);
            });

            // Clear and populate tech tags
            modalTech.innerHTML = '';
            tech.forEach(techItem => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.textContent = techItem.trim();
                modalTech.appendChild(span);
            });

            // Set links
            modalLiveLink.href = liveLink;
            modalGithubLink.href = githubLink;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            const modal = document.getElementById('projectModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Modal event listeners
        document.addEventListener('DOMContentLoaded', () => {
            const modalClose = document.getElementById('modalClose');
            const modalOverlay = document.getElementById('modalOverlay');

            modalClose.addEventListener('click', closeProjectModal);
            modalOverlay.addEventListener('click', closeProjectModal);

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeProjectModal();
                }
            });
        });

// ==================== FUTURISTIC ANIMATIONS ==================== 

// Mouse Follow Effect
function createMouseFollower() {
  const follower = document.createElement('div');
  follower.className = 'mouse-follower';
  follower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(0,255,255,0.6) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(follower);

  document.addEventListener('mousemove', (e) => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });
}

// Random Particles Generator
function createFloatingParticles(count = 20) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(0, 255, 255, ${Math.random() * 0.8 + 0.2});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    document.body.appendChild(particle);
  }
}

// Glitch Effect
function createGlitchEffect(element) {
  setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance
      element.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
      element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
      
      setTimeout(() => {
        element.style.transform = '';
        element.style.filter = '';
      }, 150);
    }
  }, 2000);
}

// Typing Text Animation
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Dynamic Background Grid
function createAnimatedGrid() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    const gridSize = 50;
    const time = Date.now() * 0.001;

    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const alpha = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5;
        ctx.globalAlpha = alpha * 0.3;
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }
    
    requestAnimationFrame(drawGrid);
  }
  drawGrid();
}

// Profile Photo Hover Effect
function addProfileHoverEffect(profileElement) {
  profileElement.style.transition = 'all 0.3s ease';
  
  profileElement.addEventListener('mouseenter', () => {
    profileElement.style.transform = 'scale(1.05) rotate(2deg)';
    profileElement.style.filter = 'brightness(1.1) contrast(1.1)';
  });
  
  profileElement.addEventListener('mouseleave', () => {
    profileElement.style.transform = 'scale(1) rotate(0deg)';
    profileElement.style.filter = 'brightness(1) contrast(1)';
  });
}

// Animated Code Background
function createCodeRain() {
  const codeChars = '01АИ{}[]()<>/\\|+-*=~`#@$%^&';
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  for (let i = 0; i < 50; i++) {
    const char = document.createElement('div');
    char.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
    char.style.cssText = `
      position: absolute;
      color: rgba(0, 255, 255, ${Math.random() * 0.5 + 0.1});
      font-family: 'Courier New', monospace;
      font-size: ${Math.random() * 14 + 10}px;
      left: ${Math.random() * 100}%;
      animation: matrix-rain ${Math.random() * 10 + 5}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(char);
  }
  
  document.body.appendChild(container);
}

// Initialize all futuristic animations
function initializeFuturisticEffects() {
  createMouseFollower();
  createFloatingParticles();
  createAnimatedGrid();
  createCodeRain();
  
  // Apply to your profile photo
  const profilePhoto = document.querySelector('.profile-photo');
  if (profilePhoto) {
    addProfileHoverEffect(profilePhoto);
    createGlitchEffect(profilePhoto);
  }
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFuturisticEffects);
} else {
  initializeFuturisticEffects();
}