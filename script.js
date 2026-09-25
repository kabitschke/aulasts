"use strict";
async function fetchProduto() {
    const response = await fetch('https://api.origamid.dev/json/cursos.json');
    const json = await response.json();
    handleCursos(json);
}
function isCurso(value) {
    if (value &&
        typeof value === 'object' &&
        'nome' in value &&
        'nivel' in value) {
        return true;
    }
    else {
        return false;
    }
}
function handleCursos(data) {
    if (Array.isArray(data)) {
        data.filter(isCurso).forEach(item => {
            document.body.innerHTML += `
      <h2>${item.nome}</h2>
      
      `;
        });
    }
}
fetchProduto();
