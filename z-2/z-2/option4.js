document.addEventListener('DOMContentLoaded', () => {
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

    // Reveal animations
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 1s ${index * 0.2}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
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
