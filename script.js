"use strict";
function normalizeKeys(data) {
    return data.map((item) => {
        const entries = Object.entries(item).map(([key, value]) => {
            if (key === "Valor (R$)") {
                key = "valor";
            }
            else {
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
function totalVendas(data) {
    const total = data.reduce((acc, item) => {
        const valorTexto = item.valor.trim();
        if (valorTexto === "-") {
            return acc;
        }
        const valor = Number(valorTexto
            .replace(/\./g, "")
            .replace(",", "."));
        return acc + valor;
    }, 0);
    return total;
}
function listStatics(data) {
    const total = totalVendas(data);
    document.body.innerHTML = `
    <h2>Total de vendas: ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })}</h2>

    ${data
        .map((item) => `
          <div>${item.valor}</div>
          <div>${item.nome}</div>
        `)
        .join("")}
  `;
}
statics();
