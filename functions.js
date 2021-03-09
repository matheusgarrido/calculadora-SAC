const btn = document.getElementsByTagName('button')[0];

btn.addEventListener('click', () => {
  //Values
  const valor = parseFloat(document.querySelector('#valor').value);
  const prazoano = parseFloat(document.querySelector('#prazoano').value);
  const jurosano = parseFloat(document.querySelector('#jurosano').value);
  //Fields
  const prazomesfield = document.querySelector('#prazomes');
  const jurosmesfield = document.querySelector('#jurosmes');
  const jurosacumuladosfield = document.querySelector('#jurosacumulados');

  //Table creation
  const table = document.createElement('table');
  const tr = document.createElement('tr');
  const thList = ['Prestação', 'Amortização', 'Juros', 'Total'];
  for (i = 0; i < 4; i++) {
    const th = document.createElement('th');
    th.textContent = thList[i];
    tr.appendChild(th);
  }
  table.appendChild(tr);

  //Process
  const prazomes = prazoano * 12;
  const jurosmes = (1 + jurosano) ** (1 / 12) - 1;
  const amortizacao = valor / prazomes;
  let jurosAcumulados = 0;
  for (i = 0; i < prazomes; i++) {
    //Values
    const saldoDevedor = valor - i * amortizacao;
    const juros = saldoDevedor * jurosmes;
    jurosAcumulados += juros;
    //Limit to 5 rows in table
    if (i < 5) {
      //Table data
      const trValues = document.createElement('tr');
      //Prestação
      const tdPrestacao = document.createElement('td');
      tdPrestacao.textContent = i + 1;
      trValues.appendChild(tdPrestacao);
      //Amortização
      const tdAmortizacao = document.createElement('td');
      tdAmortizacao.textContent = amortizacao.toFixed(2);
      trValues.appendChild(tdAmortizacao);
      //Juros
      const tdJuros = document.createElement('td');
      tdJuros.textContent = juros.toFixed(2);
      trValues.appendChild(tdJuros);
      //Total
      const tdTotal = document.createElement('td');
      tdTotal.textContent = (amortizacao + juros).toFixed(2);
      trValues.appendChild(tdTotal);
      //Inserting on table
      table.appendChild(trValues);
    }
  }

  //Result
  prazomesfield.value = prazomes;
  jurosmesfield.value = jurosmes;
  jurosacumuladosfield.value = jurosAcumulados;
  //Table
  const tableContainer = document.querySelector('#table');
  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
});
