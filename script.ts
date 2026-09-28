interface UserData {
  nome?: string;
  email?: string;
  cpf?: string;
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
        const input = document.getElementById(key);
        if (input instanceof HTMLInputElement) {
          input.value = value;
          window.UserData[key] = value;
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