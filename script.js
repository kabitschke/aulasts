"use strict";
async function statics() {
    const response = await fetch(`https://api.origamid.dev/json/transacoes.json`);
    const data = await response.json();
    listStatics(data);
}
function listStatics(data) {
    data.map((item) => {
        document.body.innerHTML = `
<div>${item.Nome}</div>
`;
    });
}
statics();
