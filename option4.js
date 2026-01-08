document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2500);
    });

    // Scroll Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    const progressRingCircle = document.querySelector('.progress-ring-circle');
    const radius = progressRingCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    progressRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRingCircle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
        
        // Update circular progress
        const offset = circumference - (scrollPercentage / 100) * circumference;
        progressRingCircle.style.strokeDashoffset = offset;
    });

    // Dynamic Navigation Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu-list a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroText.style.opacity = 1 - scrolled / 700;
        }
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.borderColor = '#666';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#1a1a1a';
        });
    });

    // Fullscreen menu
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const menuLinks = document.querySelectorAll('.menu-list a');

    menuBtn.addEventListener('click', () => {
        fullscreenMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            fullscreenMenu.classList.remove('active');
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        });
    });

    // Portfolio Filtering System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                item.classList.add('hide');
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                    }
                }, 100);
            });
        });
    });

    // Project View Details
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectItem = btn.closest('.project-item');
            const projectName = projectItem.querySelector('h3').textContent;
            const projectDesc = projectItem.querySelector('p').textContent;
            
            // Create modal with project details
            showProjectModal(projectName, projectDesc);
        });
    });

    function showProjectModal(name, desc) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${name}</h2>
                <p>${desc}</p>
                <p class="modal-description">This is a featured project showcasing modern architecture and innovative design solutions. Our team delivered exceptional results with attention to detail and quality craftsmanship.</p>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <strong>Duration:</strong> 18 months
                    </div>
                    <div class="modal-stat">
                        <strong>Area:</strong> 50,000 sq ft
                    </div>
                    <div class="modal-stat">
                        <strong>Status:</strong> Completed
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Reveal animations with Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 1s ${index * 0.2}s`;
        revealObserver.observe(element);
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.capability, .project-item, .stat-box');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize element states
    document.querySelectorAll('.capability, .stat-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Number counter animation - runs on every page load
    const heroStatNumbers = document.querySelectorAll('.hero-stat-number');
    
    const animateValue = (element, start, end, duration, suffix = '') => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    };

    // Start counter animation immediately on page load
    const startCounterAnimation = () => {
        heroStatNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const label = stat.nextElementSibling.textContent;
            
            // Reset to 0 before animating
            stat.textContent = '0';
            
            // Add appropriate suffix based on label
            if (label.includes('24/7')) {
                animateValue(stat, 0, target, 2000, '/7');
            } else if (label.includes('100%')) {
                animateValue(stat, 0, target, 2000, '%');
            } else {
                animateValue(stat, 0, target, 2000);
            }
        });
    };

    // Trigger animation after loading screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            startCounterAnimation();
        }, 2600);
    });

    // Dynamic form validation
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '' && input.hasAttribute('required')) {
                input.style.borderBottomColor = '#e74c3c';
            } else {
                input.style.borderBottomColor = '#1a1a1a';
            }
        });
        
        input.addEventListener('input', () => {
            input.style.borderBottomColor = '#1a1a1a';
        });
    });

    // EmailJS form submission with loading state
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        
        try {
            const response = await emailjs.send('service_fqijflm', 'template_u1xjxr7', {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Zentrax Team'
            });
            
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } catch (error) {
            console.log('FAILED...', error);
            showNotification('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Service Category Accordion
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach((header, index) => {
        // Open first category by default
        if (index === 0) {
            header.parentElement.classList.add('active');
        }
        
        header.addEventListener('click', () => {
            const category = header.parentElement;
            const isActive = category.classList.contains('active');
            
            // Close all categories
            document.querySelectorAll('.service-category').forEach(cat => {
                cat.classList.remove('active');
            });
            
            // Open clicked category if it wasn't active
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });

    // Animate service items on scroll
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.service-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        serviceObserver.observe(item);
    });

    // Project hover effects
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            const color = project.dataset.color;
            cursor.style.borderColor = color;
        });
        
        project.addEventListener('mouseleave', () => {
            cursor.style.borderColor = '#1a1a1a';
        });
    });

    // Form submission with EmailJS
    const form = document.querySelector('.modern-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                reply_to: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to_email: 'zentrax1234@gmail.com'
            };
            
            emailjs.send('service_u782zz3', 'template_7pl7sgs', templateParams)
                .then(function(response) {
                    alert('Thank you for reaching out! We will be in touch soon.');
                    form.reset();
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                }, function(error) {
                    alert('Failed to send message. Please try again later.');
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                    console.error('EmailJS Error:', error);
                });
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.capability, .project-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});
