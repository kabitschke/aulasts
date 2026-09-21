"use strict";
// Estado dos elementos
// menu inativo:
// class="" em nav
// aria-expanded="false" em button
// aria-label="Abrir Menu" em button
// menu ativo:
// class="active" em nav
// aria-expanded="true" em button
// aria-label="Fechar Menu" em button
const btnMobile = document.getElementById("#btn-mobile");
const toggleMenu = (event) => {
    const nav = document.querySelector('#nav');
    const button = event.currentTarget;
    if (button instanceof HTMLElement && nav) {
        const active = nav.classList.contains('active');
        if (active) {
            nav.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'Abrir Menu');
        }
        else {
            nav.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
            button.setAttribute('aria-label', 'Fechar Menu');
        }
    }
};
btnMobile?.addEventListener('pointerdown', toggleMenu);
