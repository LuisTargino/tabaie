'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const topbar = document.getElementById('topbar');
    const backToTop = document.getElementById('backToTop');
    const progressBar = document.getElementById('progressBar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const audioBtn = document.getElementById('audioButton');
    const fullscreenBtn = document.getElementById('fullscreenButton');

    // 1. Menu Mobile Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.innerText = isOpen ? 'Fechar' : 'Menu';
        });

        // Fechar menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.innerText = 'Menu';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Scroll Events (Progresso, Topbar, Back to Top, Reveal)
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Topbar
        if (scrollY > 50) {
            topbar.classList.add('scrolled');
        } else {
            topbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 600) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }

        // Barra de progresso
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressBar) progressBar.style.width = scrolled + "%";
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Back to Top Click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Reveal Animations usando Intersection Observer (Mais performático)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 5. Botão de Áudio (API de Síntese de Voz)
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            const text = "Bem-vindo ao Manual BMW Brasil. A marca alemã constrói sua reputação com engenharia refinada, mas exige atenção aos custos de manutenção. O modelo três vinte i é a porta de entrada, enquanto a linha M representa o ápice da performance.";
            
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel(); // Para falas anteriores
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'pt-BR';
                utterance.rate = 1.05;
                window.speechSynthesis.speak(utterance);
            } else {
                alert("Seu navegador não suporta a função de narração de texto.");
            }
        });
    }

    // 6. Botão Tela Cheia
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Erro ao tentar modo tela cheia: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
});