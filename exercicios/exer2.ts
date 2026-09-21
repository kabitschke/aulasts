interface Cursos {
  nome: string;
  horas: number;
  aulas: number;
  gratuito: boolean;
  tags: string[];
  idAulas: number[];
  nivel: string;
}

async function fetchCursos() {
  const response = await fetch('https://api.origamid.dev/json/cursos.json');
  const data = await response.json();
  showCursos(data);
}

function showCursos(data: Cursos[]) {
  document.body.innerHTML = `
    <ul>
      ${data.map((curso) => `
        <li>
          <h2 class='${curso.nivel === 'avancado' ? 'hard' : 'easy'}'>${curso.nome}</h2>
          <p>Horas: ${curso.horas}</p>
          <p>Aulas: ${curso.aulas}</p>
          <p>Grade: ${curso.tags.map(item => `<li>${item}</li>`).join('')}</p>
          <p>Nível: ${curso.nivel}</p>
        </li>
      `).join('')}
    </ul>

  `;
}

fetchCursos();