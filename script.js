document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const navbar = document.getElementById('navbar');
    // Updated selector for skill progress bars
    const skillProgressBars = document.querySelectorAll('.skill-progress'); 
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.querySelector('.contact-form');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.15; // Slightly faster cursor follow
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    updateCursor();
    
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .cta-button, .submit-btn, .experience-item, .achievement-item, .skill-category, .skill-item'); // Updated for new skill elements
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Function to animate skill bars
    function animateSkills() {
        skillProgressBars.forEach(bar => {
            if (!bar.classList.contains('animated')) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress; // Use the data-progress value directly as width
                bar.classList.add('animated');
            }
        });
        // Removed circular skill animation logic
    }

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 18px 45px rgba(0,0,0,0.6)'; // Deeper shadow on hover
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)'; // Reset shadow
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - (navbar.offsetHeight - 20); // Adjust offset for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    contactForm.addEventListener('submit', async function(e) { // Made the function async
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        const originalBackground = submitBtn.style.background;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // In a real application, you would send this data to a backend server.
        // For demonstration purposes, we'll simulate a successful send:
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)'; // Green gradient for success
            
            // Log the form data to the console for verification
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            console.log('Form Submitted Data:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);
            console.log('This data would typically be sent to a backend to email jethibhavya@gmail.com');

            setTimeout(() => { // Revert button state after a delay
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = originalBackground;
                this.reset(); // Reset the form after successful submission
            }, 2000);
        }, 1500);
    });
    
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkills(); // Animate skills specifically when skill section is visible
                }
                entry.target.classList.add('is-visible'); // Add class for general animations
                // observer.unobserve(entry.target); // Optional: stop observing once animated
            } else {
                // Optional: remove is-visible class if element scrolls out of view
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);
    
    // Updated animatedElements to include new skill elements
    const animatedElements = document.querySelectorAll('.portfolio-item, .about-text, .contact-info, .contact-form, .experience-item, .achievement-item, .skill-category, .skill-item, .about-image'); 
    
    animatedElements.forEach(element => {
        element.classList.add('animated-element'); // Add base class for animation
        observer.observe(element);
    });
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2; /* Behind everything */
            overflow: hidden; /* Prevent particles from causing scrollbars */
        `;
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 70; i++) { // More particles
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1; // Varying particle sizes
            const duration = Math.random() * 5 + 3; // Varying animation durations
            const delay = Math.random() * 2; // Varying animation delays
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1}); /* Varying transparency */
                border-radius: 50%;
                animation: particleFloat ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                left: ${posX}%;
                top: ${posY}%;
                filter: blur(${size / 2}px); /* Blur particles */
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    const navLinksArray = Array.from(navLinks);
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset for fixed navbar when determining active section
            if (pageYOffset >= sectionTop - navbar.offsetHeight - 50) { 
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Keyframes for particleFloat are already in style.css, but added again for clarity if needed
    const style = document.createElement('style');
    style.textContent += `
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.5; }
            25% { transform: translateY(-10px) translateX(10px) scale(1.1); opacity: 0.7; }
            50% { transform: translateY(-20px) translateX(-10px) scale(0.9); opacity: 1; }
            75% { transform: translateY(-10px) translateX(10px) scale(1.1); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape) => {
            const speed = parseFloat(shape.getAttribute('data-speed')); // Use data-speed attribute
            const yPos = -(scrolled * speed * 0.2); // Adjust multiplier for desired effect
            const xPos = -(scrolled * speed * 0.1); // Add slight horizontal parallax
            shape.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Ripple effect for cta-buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.style.position = 'relative'; // Ensure position is relative for ripple
        button.style.overflow = 'hidden';   // Ensure overflow is hidden for ripple
        
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4); /* Brighter ripple */
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out forwards; /* Use forwards to keep final state */
                pointer-events: none;
                z-index: 2;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            if (this.getAttribute('href') === '#contact') {
                setTimeout(() => {
                    document.getElementById('contact').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 200);
            }
        });
    });
    
    // Ripple keyframes directly in JS or ensure in style.css
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2.5); /* Larger ripple */
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    window.addEventListener('resize', function() {
        const windowWidth = window.innerWidth;
        const mobileBreakpoint = 768;
        
        if (windowWidth <= mobileBreakpoint) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
    });
    
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }
});