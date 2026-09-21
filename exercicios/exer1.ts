interface Empresa {
  nome: string;
  fundacao: number;
  pais: string
}

interface Props {
  nome: string;
  preco: number;
  descricao: string;
  garantia: string;
  seguroAcidentes: boolean;
  empresaFabricante: Empresa;
  empresaMontadora: Empresa;
}



async function fetchProduct() {
  const response = await fetch('https://api.origamid.dev/json/notebook.json');
  const data = await response.json();
  showProduct(data);
}


function showProduct(data: Props) {
  document.body.innerHTML = `
  <div>
  <h2>${data.nome}</h2>
  <p>${data.preco} R$</p>
  <p>${data.descricao} R$</p>
   <p>${data.garantia} anos</p>

   <h2>Montadora</h2>

   <p><b>Nome:</b> ${data.empresaMontadora.nome}</p>
   <p><b>Fundação:</b> ${data.empresaMontadora.fundacao}</p>
   <p><b>País:</b> ${data.empresaMontadora.pais}</p>


  </div>
  `;
}

fetchProduct();

