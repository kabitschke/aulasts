"use strict";
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const btn = document.querySelector('#btn');
const handleSubmit = (e) => {
    e.preventDefault();
    if (nome?.value && email?.value && senha?.value) {
        const data = {
            nome: nome.value,
            email: email.value,
            senha: senha.value,
        };
        localStorage.setItem('UserData', JSON.stringify(data));
        nome.value = '';
        email.value = '';
        senha.value = '';
    }
    else {
        console.log('Preencha os dados...');
    }
};
const fillInput = () => {
    const items = localStorage.getItem('UserData');
    if (items && nome && email && senha) {
        const dados = JSON.parse(items);
        nome.value = dados.nome;
        email.value = dados.email;
        senha.value = dados.senha;
    }
};
fillInput();
btn?.addEventListener('click', handleSubmit);
