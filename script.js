document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Toggle do menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('menu-open');
        });
    }

    // Fecha o menu quando clicar fora
    document.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            body.classList.remove('menu-open');
        }
    });

    // Fecha o menu quando clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('menu-open');
        });
    });

    // Smooth scroll para links de navegação
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

    // Animação de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar barras de progresso quando visíveis
                if (entry.target.classList.contains('skill-card')) {
                    const progress = entry.target.querySelector('.progress');
                    if (progress) {
                        const percentage = progress.dataset.progress + '%';
                        progress.style.width = percentage;
                    }
                }
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .section-title, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Typing animation for hero text
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Modal de tecnologias
    const modal = document.getElementById('techModal');
    const modalList = modal.querySelector('.tech-modal-list');
    const closeModal = modal.querySelector('.close-modal');

    window.showTechModal = function(button) {
        const technologies = JSON.parse(button.dataset.technologies);
        const frontendList = modal.querySelector('.frontend-list');
        const backendList = modal.querySelector('.backend-list');
        
        // Clear previous content
        frontendList.innerHTML = '';
        backendList.innerHTML = '';

        // Add frontend technologies
        if (technologies.frontend) {
            technologies.frontend.forEach(tech => {
                frontendList.innerHTML += `<span class="tech-modal-item">${tech}</span>`;
            });
        }

        // Add backend technologies
        if (technologies.backend) {
            technologies.backend.forEach(tech => {
                backendList.innerHTML += `<span class="tech-modal-item">${tech}</span>`;
            });
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

});