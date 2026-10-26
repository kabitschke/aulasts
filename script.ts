interface Props {
  clientenovo: number;
  data: string;
  email: string;
  formadepagamento: string;
  id: number;
  nome: string;
  status: string;
  valor: string;
}


function normalizeKeys(data: Props[]) {
  return data.map((item) => {
    const entries = Object.entries(item).map(([key, value]) => {
      if (key === "Valor (R$)") {
        key = "valor";
      } else {
        key = key.toLowerCase().replace(/\s/g, "");
      }

      return [key, value];
    });
    return Object.fromEntries(entries);

  });
}




async function statics() {
  const response = await fetch(`https://api.origamid.dev/json/transacoes.json`);
  const data = await response.json();
  const normalizedData = normalizeKeys(data);
  listStatics(normalizedData);
  totalVendas(normalizedData);

}



function totalVendas(data: Props[]) {
  const total = data.reduce((acc, item) => {
    const valorTexto = item.valor.trim();

    if (valorTexto === "-") {
      return acc;
    }

    const valor = Number(
      valorTexto
        .replace(/\./g, "")
        .replace(",", ".")
    );

    return acc + valor;
  }, 0);

  return total;
}




function listStatics(data: Props[]) {
  const total = totalVendas(data);

  const abreviacoes: Record<string, string> = {
    'recusada pela operadora de cartão': 'recusada',
    'aguardando pagamento': 'pendente',
    'cartão de crédito': 'credito',
  };

  const formadepagamento = data.reduce((acc, item) => {
    const forma = item.formadepagamento.toLocaleLowerCase().trim();

    const chave = abreviacoes[forma] || forma;
    //se o valor estiver em abreviacoes utiliza ele ou o valor original


    acc[chave] = (acc[chave] || 0) + 1;

    return acc;
  }, {} as Record<string, number>);



  const contagemStatus = data.reduce((acc, item) => {
    const statusOriginal = item.status.toLocaleLowerCase().trim();
    const status = abreviacoes[statusOriginal] || statusOriginal;

    acc[status] = (acc[status] || 0) + 1;

    return acc;
  }, {} as Record<string, number>);


  const vendasPorDia = data.reduce((acc, item) => {
    const [dataParte] = item.data.split(' ');
    const [dia, mes, ano] = dataParte.split('/');

    const dataVenda = new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia)
    );

    const diasSemana = [
      'domingo',
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
    ];

    const diaSemana = diasSemana[dataVenda.getDay()];

    acc[diaSemana] = (acc[diaSemana] || 0) + 1;

    return acc;
  }, {} as Record<string, number>);


  const diaComMaisVendas = Object.entries(vendasPorDia)
    .sort((a, b) => b[1] - a[1])[0];

  //console.log('Dia com mais vendas:', diaComMaisVendas[0]);
  //console.log('Quantidade:', diaComMaisVendas[1]);






  document.body.innerHTML = `
  <div class="area">
    <h2>Estatísticas</h2>
    <div>Total de vendas: ${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}</div>
  </div>

  <div class="area">
    <div>Cartão de Crédito: ${formadepagamento.credito}</div>
    <div>Boleto: ${formadepagamento.boleto}</div>
  </div>

  <div class="area">
    <div>Paga:${contagemStatus.paga}</div>
    <div>Recusada pela operadora do cartão: ${contagemStatus.recusada}</div>
    <div>Aguardando pagamento: ${contagemStatus.pendente}</div>
    <div>Estornada: ${contagemStatus.estornada}</div>
    <div>Dia com mais venda: ${diaComMaisVendas[0]}</div>
  </div>

  <div class="area">
   <h2>Dados</h2>
    ${data
      .map(
        (item) => `
          <div>${item.valor}</div>
         
          <div>${item.nome}</div>
        `
      )
      .join("")}
  </div>`
    ;
}



statics();
