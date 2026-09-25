async function fetchProduto() {
  const response = await fetch('https://api.origamid.dev/json/cursos.json');
  const json = await response.json();
  handleCursos(json);
}

interface Curso {
  nome: string;
  nivel: string;
}

function isCurso(value: unknown): value is Curso {
  if (
    value &&
    typeof value === 'object' &&
    'nome' in value &&
    'nivel' in value
  ) {
    return true;
  } else {
    return false;
  }
}


function handleCursos(data: unknown) {
  if (Array.isArray(data)) {

    data.filter(isCurso).forEach(item => {
      document.body.innerHTML += `
      <h2>${item.nome}</h2>
      
      `
    })


  }
}
fetchProduto();