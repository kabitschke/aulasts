const input = document.querySelector<HTMLInputElement>('input');
const ul = document.querySelector<HTMLUListElement>("ul");


if (!input || !ul) {
  throw new Error('Elementos input ou ul não encontrados');
}

const handleKeyup = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    if (input.value === '') return;
    const li = document.createElement('li');
    li.textContent = input.value;
    ul.appendChild(li);
    input.value = '';

  }

}



input.addEventListener('keyup', handleKeyup);
