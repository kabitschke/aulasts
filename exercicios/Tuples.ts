// interface Produto {
//   0: string;
//   1: number;
//   2: string;
//   3: {
//     marca: string;
//     cor: string;
//   }

// }

// const apiVendas = async () => {
//   const response = await fetch('https://api.origamid.dev/json/vendas.json');
//   const data = await response.json();

//   loadingVendas(data);

// }


// const loadingVendas = (vendas: Produto[]) => {
//   const total = vendas.reduce((acc, item) => acc + item[1], 0);
//   document.body.innerHTML = `
//   <ul>
//   ${vendas.map((item) => `
//     <li>
//     <h2>${item[0]}</h2>
//     <p>Venda: ${item[1]} Data: ${item[2]}</p>
//     <p>Descrição: ${item[3].marca} Cor: ${item[3].cor}</p>
//     </li>
//     `).join('')}
//   </ul>


//   <h2>Total vendido: ${total} R$</h2>
//   `
// }


// apiVendas();



async function fetchVendas() {
  const response = await fetch('https://api.origamid.dev/json/vendas.json');
  const data = await response.json();
  somarVendas(data);

}

fetchVendas();

interface ProdutoDetalhe {
  marca: string;
  cor: string;
}

type Venda = [string, number, string, ProdutoDetalhe];

function somarVendas(vendas: Venda[]) {

  let total1 = 0;
  for (let i = 0; i < vendas.length; i++) {
    total1 += vendas[i][1];
  }


  const total = vendas.reduce((acc, item) => acc + item[1], 0);
  document.body.innerHTML += `<p>Total ${total}</p>`

}