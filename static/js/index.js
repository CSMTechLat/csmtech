document.addEventListener('DOMContentLoaded', function() {
    // Scrollspy for mobile and desktop nav synchronization
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY; // Usar scrollY (pageYOffset es obsoleto)

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3D Floating Box Interaction (mejorado para no romper la animación CSS)
    const codeBox = document.getElementById('3d-box');
    if(codeBox) {
        codeBox.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY } = e;
            const { width, height } = codeBox.getBoundingClientRect();
            const xRotation = (offsetY - height / 2) / 15;
            const yRotation = (offsetX - width / 2) / 15;
            // Combinamos la rotación 3D con una ligera traslación para mantener el efecto de flotación manual
            codeBox.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-10px)`;
            codeBox.style.animation = 'none'; // Pausa la animación CSS mientras interactúas
        });
        codeBox.addEventListener('mouseleave', () => {
            codeBox.style.transform = ''; // Limpia el estilo en línea
            codeBox.style.animation = 'float 6s ease-in-out infinite'; // Restaura la animación CSS
        });
    }
});