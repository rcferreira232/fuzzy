const precoCarro = {
  MB: {
    0: 1,
    2500: 0.9,
    5000: 0.6,
    10000: 0.3,
    20000: 0,
    30000: 0,
    50000: 0,
    100000: 0,
  },
  B: {
    0: 0,
    2500: 0.4,
    5000: 0.8,
    10000: 1,
    20000: 0.7,
    30000: 0.3,
    50000: 0,
    100000: 0,
  },
  M: {
    0: 0,
    2500: 0.1,
    5000: 0.3,
    10000: 0.6,
    20000: 1,
    30000: 0.7,
    50000: 0.4,
    100000: 0,
  },
  A: {
    0: 0,
    2500: 0,
    5000: 0,
    10000: 0.2,
    20000: 0.5,
    30000: 1,
    50000: 0.7,
    100000: 0.3,
  },
  MA: {
    0: 0,
    2500: 0,
    5000: 0,
    10000: 0,
    20000: 0.2,
    30000: 0.5,
    50000: 1,
    100000: 1,
  },
}

const numAmassados = {
  MP: {
    0: 1,
    1: 0.8,
    3: 0.5,
    5: 0.2,
    7: 0,
    10: 0,
  },
  P: {
    0: 0,
    1: 0.6,
    3: 1,
    5: 0.8,
    7: 0.4,
    10: 0,
  },
  ALG: {
    0: 0,
    1: 0,
    3: 0.5,
    5: 1,
    7: 0.6,
    10: 0,
  },
  VAM: {
    0: 0,
    1: 0,
    3: 0,
    5: 0.6,
    7: 1,
    10: 0.8,
  },
  MAM: {
    0: 0,
    1: 0,
    3: 0,
    5: 0,
    7: 0.5,
    10: 1,
  },
}

const valorSeguro = {
  MB: {
    0: 1,
    500: 0.8,
    1000: 0.4,
    2000: 0,
    3000: 0,
    3500: 0,
    5000: 0,
    10000: 0,
  },
  B: {
    0: 0,
    500: 0.6,
    1000: 1,
    2000: 0.8,
    3000: 0.4,
    3500: 0.3,
    5000: 0,
    10000: 0,
  },
  M: {
    0: 0,
    500: 0,
    1000: 0.6,
    2000: 1,
    3000: 0.8,
    3500: 0.6,
    5000: 0.4,
    10000: 0,
  },
  A: {
    0: 0,
    500: 0,
    1000: 0,
    2000: 0.6,
    3000: 1,
    3500: 0.9,
    5000: 0.8,
    10000: 0.4,
  },
  MA: {
    0: 0,
    500: 0,
    1000: 0,
    2000: 0,
    3000: 0.5,
    3500: 0.75,
    5000: 1,
    10000: 1,
  },
}

// - **Regra 1**: **MB** e **MP** → **MB**
// - **Regra 2**: **MB** e **P** → **B**
// - **Regra 3**: **B** e **MP** → **B**
// - **Regra 4**: **B** e **ALG** → **M**
// - **Regra 5**: **M** e **P** → **M**
// - **Regra 6**: **M** e **ALG** → **A**
// - **Regra 7**: **A** e **P** → **A**
// - **Regra 8**: **A** e **VAM** → **MA**
// - **Regra 9**: **MA** e **ALG** → **A**
// - **Regra 10**: **MA** e **MAM** → **MA**

const findKeyByValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value)
}

function defuzzificacao(valorDoCarro, nAmassados) {
  const grausValorCarro = {
    MB: precoCarro.MB[valorDoCarro],
    B: precoCarro.B[valorDoCarro],
    M: precoCarro.M[valorDoCarro],
    A: precoCarro.A[valorDoCarro],
    MA: precoCarro.MA[valorDoCarro],
  }

  const grausNumAmassados = {
    MP: numAmassados.MP[nAmassados],
    P: numAmassados.P[nAmassados],
    ALG: numAmassados.ALG[nAmassados],
    VAM: numAmassados.VAM[nAmassados],
    MAM: numAmassados.MAM[nAmassados],
  }

  // Calculo do Grau de Pertinência do valor saida de cada regra
  const grausSaidaRegras = {
    R1: Math.min(grausValorCarro.MB, grausNumAmassados.MP),
    R2: Math.min(grausValorCarro.MB, grausNumAmassados.P),
    R3: Math.min(grausValorCarro.B, grausNumAmassados.MP),
    R4: Math.min(grausValorCarro.B, grausNumAmassados.ALG),
    R5: Math.min(grausValorCarro.M, grausNumAmassados.P),
    R6: Math.min(grausValorCarro.M, grausNumAmassados.ALG),
    R7: Math.min(grausValorCarro.A, grausNumAmassados.P),
    R8: Math.min(grausValorCarro.A, grausNumAmassados.VAM),
    R9: Math.min(grausValorCarro.MA, grausNumAmassados.ALG),
    R10: Math.min(grausValorCarro.MA, grausNumAmassados.MAM),
  }

  // Calculo do valor de saída
  const valorSaida = {
    SR1:
      Number(findKeyByValue(valorSeguro.MB, grausSaidaRegras.R1)) *
      grausSaidaRegras.R1,
    SR2:
      Number(findKeyByValue(valorSeguro.B, grausSaidaRegras.R2)) *
      grausSaidaRegras.R2,
    SR3:
      Number(findKeyByValue(valorSeguro.B, grausSaidaRegras.R3)) *
      grausSaidaRegras.R3,
    SR4:
      Number(findKeyByValue(valorSeguro.M, grausSaidaRegras.R4)) *
      grausSaidaRegras.R4,
    SR5:
      Number(findKeyByValue(valorSeguro.M, grausSaidaRegras.R5)) *
      grausSaidaRegras.R5,
    SR6:
      Number(findKeyByValue(valorSeguro.A, grausSaidaRegras.R6)) *
      grausSaidaRegras.R6,
    SR7:
      Number(findKeyByValue(valorSeguro.A, grausSaidaRegras.R7)) *
      grausSaidaRegras.R7,
    SR8:
      Number(findKeyByValue(valorSeguro.MA, grausSaidaRegras.R8)) *
      grausSaidaRegras.R8,
    SR9:
      Number(findKeyByValue(valorSeguro.A, grausSaidaRegras.R9)) *
      grausSaidaRegras.R9,
    SR10:
      Number(findKeyByValue(valorSeguro.MA, grausSaidaRegras.R10)) *
      grausSaidaRegras.R10,
  }

  const somaSaida = Object.values(valorSaida).reduce(
    (acc, curr) => acc + curr,
    0
  )
  const somaGraus = Object.values(grausSaidaRegras).reduce(
    (acc, curr) => acc + curr,
    0
  )

  const resultado = somaSaida / somaGraus

  console.log('Grau de Pertinência do Valor do Carro: \n', grausValorCarro)
  console.log('Grau de Pertinência dos Amassados: \n', grausNumAmassados)
  console.log('Regras: ', grausSaidaRegras)
  console.log('Valor da Saída de Cada Regra: ', valorSaida)
  console.log('Somatório Saída: ', somaSaida)
  console.log('Somatório Graus: ', somaGraus)
  console.log('Valor do Seguro: ', resultado)
}

defuzzificacao(30000, 1)
