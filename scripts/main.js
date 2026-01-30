import translations from './translations.js';

// Configuration
const CONFIG = {
    DEFAULT_LANG: 'en',
    DEFAULT_THEME: 'dark'
};

class Portfolio {
    constructor() {
        this.lang = localStorage.getItem('lang') || CONFIG.DEFAULT_LANG;
        this.theme = localStorage.getItem('theme') || CONFIG.DEFAULT_THEME;
        
        this.init();
    }

    init() {
        this.applyTheme();
        this.applyLanguage();
        this.setupEventListeners();
        this.initScrollReveal();
    }

    setupEventListeners() {
        // Theme Toggle
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Language Toggle
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => this.toggleLanguage());
        }

        // Mobile Menu
        const menuBtn = document.getElementById('menu-btn');
        const navLinks = document.querySelector('.nav-links');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = this.theme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
        }
    }

    toggleLanguage() {
        this.lang = this.lang === 'en' ? 'vi' : 'en';
        localStorage.setItem('lang', this.lang);
        this.applyLanguage();
    }

    applyLanguage() {
        const trans = translations[this.lang];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if (trans[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = trans[key];
                } else {
                    el.innerHTML = trans[key];
                }
            }
        });
        document.querySelector('#lang-toggle span').textContent = this.lang.toUpperCase();
    }

    initScrollReveal() {
        // Simple Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Active Link tracking
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});
