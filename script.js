"use strict";
const input = document.querySelector('input');
const ul = document.querySelector("ul");
if (!input || !ul) {
    throw new Error('Elementos input ou ul não encontrados');
}
const handleKeyup = (e) => {
    if (e.key === 'Enter') {
        if (input.value === '')
            return;
        const li = document.createElement('li');
        li.innerHTML = input.value;
        ul.appendChild(li);
        input.value = '';
    }
};
input.addEventListener('keyup', handleKeyup);
