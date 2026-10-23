interface Props {
  ClienteNovo: number;
  Data: string;
  Email: string;
  FormaDePagamento: string;
  ID: number;
  Nome: string;
  Status: string;
  Valor: string;
}

async function statics() {
  const response = await fetch(`https://api.origamid.dev/json/transacoes.json`);
  const data = await response.json();
  listStatics(data);
}



function listStatics(data: Props[]) {
  data.map((item) => {
    document.body.innerHTML = `
<div>${item.Nome}</div>
`
  })

}



statics();