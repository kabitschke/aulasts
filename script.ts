const nome = document.querySelector<HTMLInputElement>('#nome');
const email = document.querySelector<HTMLInputElement>('#email');
const senha = document.querySelector<HTMLInputElement>('#senha');
const btn = document.querySelector('#btn');

interface UserData {
  nome: string;
  email: string;
  senha: string;
}


const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (nome?.value && email?.value && senha?.value) {
    const data: UserData = {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    }
    localStorage.setItem('UserData', JSON.stringify(data));
    nome.value = '';
    email.value = '';
    senha.value = '';
  } else {
    console.log('Preencha os dados...');
  }

}

const fillInput = () => {
  const items = localStorage.getItem('UserData');
  if (items && nome && email && senha) {
    const dados = JSON.parse(items);

    nome.value = dados.nome;
    email.value = dados.email;
    senha.value = dados.senha;


  }


}

fillInput();
btn?.addEventListener('click', handleSubmit);