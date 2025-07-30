// JavaScript Document
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    // Efecto scroll para la barra de navegación
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Animación de scroll suave para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de aparición al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-card, .product-card, .service-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Establecer opacidad inicial para la animación
    const animatedElements = document.querySelectorAll('.benefit-card, .product-card, .service-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animaciones
    setTimeout(animateOnScroll, 500);
    window.addEventListener('scroll', animateOnScroll);

    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor completa todos los campos requeridos.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor ingresa un correo electrónico válido.');
                return;
            }
            
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }

    // ========== CARRITO DE COMPRAS ========== //
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.fa-shopping-cart')?.parentElement;
    
    // Solo inicializar carrito si existe el icono
    if (cartIcon) {
        // Añadir contador al icono del carrito
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        updateCartCount();
        cartIcon.appendChild(cartCount);
        cartIcon.classList.add('cart-icon');
        
        // Eventos para botones "Añadir al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Verificar que los datos estén completos
                if (!this.dataset.id || !this.dataset.name || !this.dataset.price) {
                    console.error('El botón no tiene los atributos data necesarios');
                    return;
                }
                
                const product = {
                    id: this.dataset.id,
                    name: this.dataset.name,
                    price: parseFloat(this.dataset.price),
                    img: this.dataset.img || '',
                    quantity: 1
                };
                
                addToCart(product);
                showNotification(`${product.name} añadido al carrito`);
            });
        });
        
        // Función para añadir al carrito
        function addToCart(product) {
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }
            
            updateCartCount();
            saveCart();
        }
        
        // Función para actualizar el contador del carrito
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        }
        
        // Función para guardar el carrito en localStorage
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        // Función para mostrar notificación
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        // Evento para el icono del carrito
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            // Aquí puedes redirigir a la página del carrito
            // window.location.href = 'carrito.html';
            console.log('Productos en el carrito:', cart);
        });
    }
});