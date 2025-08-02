// =============================================================================
// Основные скрипты для сайта гимназии «ЛИК-Успех»
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initUtilityBar();
    initSmoothScroll();
    initDropdownMenus();
    initScrollToTop();
    initLazyLoading();
    initFormValidation();
    initSideNavigation();
    initScrollRevealAnimations();
    initInteractiveElements();
    initPremiumEffects();
});

// Utility Bar - скрытие/показ при скролле на мобильном
function initUtilityBar() {
    const utilityBar = document.querySelector('.utility-bar');
    if (!utilityBar) return;

    let lastScrollTop = 0;
    let isScrolling = false;

    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (window.innerWidth <= 767) {
                    if (scrollTop > lastScrollTop && scrollTop > 60) {
                        // Скролл вниз - скрываем utility bar
                        utilityBar.style.transform = 'translateY(-100%)';
                    } else {
                        // Скролл вверх - показываем utility bar
                        utilityBar.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

// Мобильное меню
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.header__nav .nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isOpen);
            nav.classList.toggle('nav--open');
            
            // Блокируем скролл при открытом меню
            if (!isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('nav--open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.header__nav') && nav.classList.contains('nav--open')) {
                nav.classList.remove('nav--open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Обработка выпадающих меню на мобильном
        const dropdownItems = nav.querySelectorAll('.nav__item--dropdown');
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav__link');
            const dropdown = item.querySelector('.nav__dropdown');
            
            if (link && dropdown) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 767) {
                        e.preventDefault();
                        
                        // Переключаем состояние выпадающего меню
                        const isOpen = item.classList.contains('nav__item--open');
                        
                        // Закрываем все другие выпадающие меню
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('nav__item--open');
                                const otherDropdown = otherItem.querySelector('.nav__dropdown');
                                if (otherDropdown) {
                                    otherDropdown.classList.remove('nav__dropdown--open');
                                }
                            }
                        });
                        
                        // Переключаем текущее меню
                        if (!isOpen) {
                            item.classList.add('nav__item--open');
                            dropdown.classList.add('nav__dropdown--open');
                        } else {
                            item.classList.remove('nav__item--open');
                            dropdown.classList.remove('nav__dropdown--open');
                        }
                    }
                });
            }
        });

        // Закрытие меню по Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
                nav.classList.remove('nav--open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }
}

// Боковая навигация (для юридических страниц)
function initSideNavigation() {
    const sideNav = document.querySelector('.side-nav');
    if (!sideNav) return;

    const links = sideNav.querySelectorAll('.side-nav__link');
    const sections = [];

    // Собираем секции для scroll spy
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                sections.push({
                    element: section,
                    link: link,
                    id: href
                });
            }
        }
    });

    // Scroll spy для боковой навигации
    if (sections.length > 0) {
        function updateActiveLink() {
            const scrollPos = window.scrollY + 150; // Offset для лучшего UX

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.element.offsetTop <= scrollPos) {
                    // Убираем активный класс со всех ссылок
                    links.forEach(link => link.classList.remove('side-nav__link--active'));
                    // Добавляем к текущей
                    section.link.classList.add('side-nav__link--active');
                    break;
                }
            }
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Инициализация
    }
}

// Плавный скролл для якорных ссылок
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Учитываем высоту хедера
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Выпадающие меню
function initDropdownMenus() {
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        const dropdown = item.querySelector('.nav__dropdown');
        
        if (link && dropdown) {
            // Показываем меню при наведении
            item.addEventListener('mouseenter', function() {
                dropdown.style.display = 'block';
                setTimeout(() => {
                    dropdown.classList.add('nav__dropdown--visible');
                }, 10);
            });
            
            // Скрываем меню при уходе курсора
            item.addEventListener('mouseleave', function() {
                dropdown.classList.remove('nav__dropdown--visible');
                setTimeout(() => {
                    if (!dropdown.classList.contains('nav__dropdown--visible')) {
                        dropdown.style.display = 'none';
                    }
                }, 200);
            });
            
            // Для мобильных устройств - по клику
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
}

// Кнопка "Наверх"
function initScrollToTop() {
    // Создаем кнопку
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Прокрутить наверх');
    document.body.appendChild(scrollButton);
    
    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('scroll-to-top--visible');
        } else {
            scrollButton.classList.remove('scroll-to-top--visible');
        }
    });
    
    // Обработчик клика
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Ленивая загрузка изображений
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
}

// Валидация форм
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Валидация в реальном времени
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';
    
    // Проверка обязательности
    if (required && !value) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Проверка email
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный email адрес';
        }
    }
    
    // Проверка телефона
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный номер телефона';
        }
    }
    
    // Отображение ошибки
    showFieldError(field, isValid, errorMessage);
    
    return isValid;
}

function showFieldError(field, isValid, message) {
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.remove();
        }
    } else {
        field.classList.add('error');
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'field-error';
            error.textContent = message;
            field.parentNode.appendChild(error);
        } else {
            errorElement.textContent = message;
        }
    }
}

// Утилиты
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => animationObserver.observe(el));
    }
}

// Поиск по сайту (если нужен)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchResults) {
        const debouncedSearch = debounce(performSearch, 300);
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                debouncedSearch(query);
            } else {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
        });
        
        // Скрытие результатов при клике вне поиска
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }
}

function performSearch(query) {
    // Здесь можно реализовать поиск по JSON-индексу или через API
    console.log('Поиск:', query);
    
    // Пример простого поиска (заглушка)
    const searchResults = document.querySelector('#search-results');
    searchResults.innerHTML = '<div class="search-result">Результаты поиска для: ' + query + '</div>';
    searchResults.style.display = 'block';
}

// Инициализация дополнительных функций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSearch();
    initAcademicEffects();
    initPrestigiousAnimations();
    initLiveCounter();
    initTestimonialSlider();
});

// Академические эффекты для главной страницы
function initAcademicEffects() {
    // Эффект печатной машинки для hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--color-cambridge-gold)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 800);
    }
    
    // Параллакс эффект для hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
    
    // Анимация счетчиков в статистике
    const statNumbers = document.querySelectorAll('.statistic-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element) {
    const finalNumber = element.textContent;
    const numericValue = parseFloat(finalNumber.replace(/[^\d.]/g, ''));
    const suffix = finalNumber.replace(/[\d.]/g, '');
    
    let currentNumber = 0;
    const increment = numericValue / 60; // 60 кадров анимации
    const duration = 2000; // 2 секунды
    const frameTime = duration / 60;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        const displayNumber = Math.floor(currentNumber * 10) / 10;
        element.textContent = displayNumber + suffix;
    }, frameTime);
}

// Престижные анимации при скролле
function initPrestigiousAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Элементы для анимации
    const elementsToAnimate = document.querySelectorAll(`
        .age-nav-card,
        .advantage-card,
        .project-card,
        .campus-item,
        .testimonial,
        .partner,
        .news-item,
        .admission-step
    `);
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        animationObserver.observe(element);
    });
    
    // Добавляем класс visible при появлении
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Живой счетчик обновления
function initLiveCounter() {
    const liveNumbers = document.querySelectorAll('.live-counter__number');
    
    if (liveNumbers.length > 0) {
        // Обновляем числа каждые 5 секунд для создания эффекта "живого" счетчика
        setInterval(() => {
            liveNumbers.forEach(number => {
                const currentValue = parseInt(number.textContent);
                const variation = Math.floor(Math.random() * 6) - 3; // ±3
                const newValue = Math.max(600, currentValue + variation); // Минимум 600
                
                // Плавная анимация изменения числа
                number.style.transform = 'scale(1.1)';
                number.style.color = 'var(--color-crown-gold)';
                
                setTimeout(() => {
                    number.textContent = newValue;
                    number.style.transform = 'scale(1)';
                    number.style.color = 'var(--color-cambridge-gold)';
                }, 150);
            });
        }, 5000);
    }
}

// Слайдер отзывов с престижными эффектами
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            // Добавляем случайные эффекты наведения
            testimonial.addEventListener('mouseenter', () => {
                testimonial.style.transform = 'translateY(-10px) scale(1.02) rotateY(2deg)';
                testimonial.style.boxShadow = '0 25px 50px rgba(122, 0, 39, 0.2)';
            });
            
            testimonial.addEventListener('mouseleave', () => {
                testimonial.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                testimonial.style.boxShadow = 'var(--shadow-academic)';
            });
        });
    }
}

// Премиум эффекты для элегантного дизайна
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с классом scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Добавляем анимации к основным секциям
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(section);
    });
}

function initInteractiveElements() {
    // Анимация карточек при наведении
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
    
    // Анимация кнопок
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
    
    // Эффект параллакса для hero секции
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section, section:first-of-type');
        
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

function initPremiumEffects() {
    // Анимация статистики
    const statsNumbers = document.querySelectorAll('[class*="text-3xl"], [class*="text-4xl"]');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent.match(/^\d+/)) {
                animateCountUp(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => {
        if (stat.textContent.match(/^\d+/)) {
            statsObserver.observe(stat);
        }
    });
    
    // Живой пульс для accent элементов
    document.querySelectorAll('.bg-accent').forEach(el => {
        el.style.animation = 'pulse 3s ease-in-out infinite';
    });
    
    // Мерцающий эффект для особых элементов
    document.querySelectorAll('.animate-pulse').forEach(el => {
        setInterval(() => {
            el.style.opacity = '0.7';
            setTimeout(() => {
                el.style.opacity = '1';
            }, 500);
        }, 2000);
    });
}

function animateCountUp(element) {
    const originalText = element.textContent;
    const numberMatch = originalText.match(/(\d+(?:\.\d+)?)/);
    
    if (!numberMatch) return;
    
    const targetNumber = parseFloat(numberMatch[1]);
    const suffix = originalText.replace(numberMatch[1], '');
    const prefix = originalText.substring(0, originalText.indexOf(numberMatch[1]));
    
    let currentNumber = 0;
    const increment = targetNumber / 60;
    const duration = 2000;
    const frameTime = duration / 60;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        const displayNumber = targetNumber % 1 === 0 
            ? Math.floor(currentNumber) 
            : (Math.floor(currentNumber * 10) / 10);
            
        element.textContent = prefix + displayNumber + suffix;
    }, frameTime);
}

// CSS стили для revealed состояния
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    section.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .scroll-reveal.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyles);

// Экспорт функций для использования в других скриптах
window.LikUspekhSite = {
    debounce,
    throttle,
    validateForm,
    validateField,
    initAcademicEffects,
    initPrestigiousAnimations,
    animateNumber,
    initScrollRevealAnimations,
    initInteractiveElements,
    initPremiumEffects
};
