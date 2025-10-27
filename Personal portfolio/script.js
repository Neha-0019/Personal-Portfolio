// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    
    // Create an Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Animate timeline items when experience section comes into view
                if (entry.target.id === 'experience') {
                    animateTimeline();
                }
                
                // Animate education items when education section comes into view
                if (entry.target.id === 'education') {
                    animateEducation();
                }
                
                // Animate certificate items when certificates section comes into view
                if (entry.target.id === 'certificates') {
                    animateCertificates();
                }
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
    
    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Function to animate skill bars
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach((skillLevel, index) => {
            setTimeout(() => {
                skillLevel.style.width = skillLevel.getAttribute('data-level');
            }, index * 200); // Stagger the animations
        });
    }
    
    // Function to animate timeline items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }
    
    // Function to animate education items
    function animateEducation() {
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
    
    // Function to animate certificate items
    function animateCertificates() {
        const certificateItems = document.querySelectorAll('.certificate-item');
        certificateItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Add current year to footer copyright
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add hover effect to project items
    const projectItems = document.querySelectorAll('.project');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
    
    // Extracurricular Activities Slider
    const extracurricularSlider = document.querySelector('.extracurricular-slider');
    if (extracurricularSlider) {
        const slides = extracurricularSlider.querySelector('.slides');
        const slideItems = extracurricularSlider.querySelectorAll('.slide');
        const prevBtn = extracurricularSlider.querySelector('.prev');
        const nextBtn = extracurricularSlider.querySelector('.next');
        let currentIndex = 0;

        function showSlide(index) {
            if (index >= slideItems.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slideItems.length - 1;
            } else {
                currentIndex = index;
            }
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
    }
    
    // Add typing effect to header text
    const profileText = document.querySelector('.profile-text p');
    if (profileText) {
        const text = profileText.textContent;
        profileText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                profileText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add parallax effect to header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
    
    // Add counter animation to skill levels
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target > 0 ? 1 : 0;
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = `${start}%`;
            if (start >= target) {
                clearInterval(timer);
                element.textContent = `${target}%`;
            }
        }, stepTime);
    }
    
    // Create and append counter elements to skill items
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skillLevel => {
        const level = parseInt(skillLevel.getAttribute('data-level'));
        const counter = document.createElement('span');
        counter.className = 'skill-counter';
        counter.textContent = '0%';
        skillLevel.parentNode.appendChild(counter);
        
        // Add to the animation function
        const originalAnimateSkillBars = animateSkillBars;
        animateSkillBars = function() {
            originalAnimateSkillBars();
            document.querySelectorAll('.skill-counter').forEach((counter, index) => {
                const level = parseInt(skillLevels[index].getAttribute('data-level'));
                setTimeout(() => {
                    animateCounter(counter, level, 1500);
                }, index * 200);
            });
        };
    });


});