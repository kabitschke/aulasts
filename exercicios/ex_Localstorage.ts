interface UserData {
  nome?: string;
  email?: string;
  cpf?: string;
  //?opcional
}

interface Window {
  UserData: any;
}

window.UserData = {}

function isUserData(obj: unknown): obj is UserData {
  if (obj && typeof obj === 'object' && ('nome' in obj || 'cpf' in obj || 'email' in obj)) {
    return true;
  } else {
    return false;
  }
}

function validJSON(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false
  }
  return true;
}

function loadLocalStorage() {
  const localUserData = localStorage.getItem('UserData');
  if (localUserData && validJSON(localUserData)) {
    const UserData = JSON.parse(localUserData);
    if (isUserData(UserData)) {
      Object.entries(UserData).forEach(([key, value]) => {
        //Object.entries Transforma objeto em array
        const input = document.getElementById(key);
        //key é a chave Ex 'nome', 'email', 'cpf'
        if (input instanceof HTMLInputElement) {
          input.value = value;
          //Preenche o campo input com valor Ex 'maycon', 'maycon@gmail.com',   '456.456.255-55'
          window.UserData[key] = value;
          //Atualiza o Objeto UserData com o for digitado nos campos 
        }
      })
    }

  }
}

loadLocalStorage();

function handleInput({ target }: KeyboardEvent) {
  if (target instanceof HTMLInputElement) {
    window.UserData[target.id] = target.value;
    //target id é a chave do objeto ex 'nome:' target.value atribui o valor.
    localStorage.setItem('UserData', JSON.stringify(window.UserData));
  }

}

const form = document.querySelector<HTMLFormElement>("#form");
form?.addEventListener('keyup', handleInput);