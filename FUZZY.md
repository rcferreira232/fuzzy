# Controlador Fuzzy para Cálculo de Seguro Automotivo (PT-BR)

## Sumário

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Entradas do Sistema](#entradas-do-sistema)
3. [Saída do Sistema](#saída-do-sistema)
4. [Tabela](#tabela)
   - [Geral](#geral)
   - [Legenda da Tabela](#legenda-da-tabela)
   - [Representação Tabular dos Conjuntos Nebulosos](#representação-tabular-dos-conjuntos-nebulosos)
     - [Preço do Carro](#preço-do-carro)
     - [Número de Amassados](#número-de-amassados)
     - [Valor do Seguro](#valor-do-seguro)
5. [Regras](#regras)
6. [Problema de Cálculo de Seguro Automotivo](#problema-de-cálculo-de-seguro-automotivo)
   - [Dados](#dados)
   - [Pergunta](#pergunta)

## Descrição do Projeto

Este projeto envolve o desenvolvimento de um controlador baseado em lógica fuzzy para calcular o valor do seguro automotivo de uma seguradora. O objetivo é encontrar um equilíbrio entre a lucratividade da empresa e um preço justo para o cliente, evitando prejuízos e garantindo competitividade no mercado.

A lógica fuzzy permite manipular incertezas e subjetividades, proporcionando uma abordagem flexível para definir o preço ideal do seguro com base em múltiplos fatores.

## Entradas do Sistema

- **Preço do Carro**: Valor atual do veículo no mercado.
- **Número de Amassados**: Quantidade de amassados visíveis no carro, influenciando o valor do seguro de acordo com o estado estético do veículo.

## Saída do Sistema

- **Valor do Seguro**: Valor a ser cobrado pelo seguro do carro, considerando o equilíbrio entre um preço competitivo e a rentabilidade da seguradora.

## Tabela

### Geral

| Variáveis           | Tipo    | Conj. Nebuloso       |
| ------------------- | ------- | -------------------- |
| Preço do carro      | Entrada | MB, B, M, A, MA      |
| Número de Amassados | Entrada | MP, P, ALG, VAM, MAM |
| Valor do Seguro     | Saída   | MB, B, M, A, MA      |

### Legenda da Tabela

- **Tipo**: Define se a variável é uma entrada ou saída do sistema fuzzy.
- **Conj. Nebuloso**: Representa os conjuntos fuzzy associados às variáveis. Esses conjuntos determinam os graus de pertinência de cada variável e seguem a seguinte legenda:
  - **MB**: Muito Baixo
  - **B**: Baixo
  - **M**: Médio
  - **A**: Alto
  - **MA**: Muito Alto
  - **MP**: Muito Poucos
  - **P**: Poucos
  - **ALG**: Alguns
  - **VAM**: Vários Amassados
  - **MAM**: Muitos Amassados

### Representação Tabular dos Conjuntos Nebulosos

#### Preço do Carro

| Conjunto Nebuloso | 0   | 2500 | 5000 | 10000 | 20000 | 30000 | 50000 | 100000 |
| ----------------- | --- | ---- | ---- | ----- | ----- | ----- | ----- | ------ |
| Muito Baixo (MB)  | 1   | 0.9  | 0.6  | 0.3   | 0     | 0     | 0     | 0      |
| Baixo (B)         | 0   | 0.4  | 0.8  | 1     | 0.7   | 0.3   | 0     | 0      |
| Médio (M)         | 0   | 0.1  | 0.3  | 0.6   | 1     | 0.7   | 0.4   | 0      |
| Alto (A)          | 0   | 0    | 0    | 0.2   | 0.5   | 1     | 0.7   | 0.3    |
| Muito Alto (MA)   | 0   | 0    | 0    | 0     | 0.2   | 0.5   | 1     | 1      |

#### Número de Amassados

| Conjunto Nebuloso      | 0   | 1   | 3   | 5   | 7   | 10  |
| ---------------------- | --- | --- | --- | --- | --- | --- |
| Muito Poucos (MP)      | 1   | 0.8 | 0.5 | 0.2 | 0   | 0   |
| Poucos (P)             | 0   | 0.6 | 1   | 0.8 | 0.4 | 0   |
| Alguns (ALG)           | 0   | 0   | 0.5 | 1   | 0.6 | 0   |
| Vários Amassados (VAM) | 0   | 0   | 0   | 0.6 | 1   | 0.8 |
| Muitos Amassados (MAM) | 0   | 0   | 0   | 0   | 0.5 | 1   |

#### Valor do Seguro

| Conjunto Nebuloso | 0   | 500 | 1000 | 2000 | 3000 | 5000 | 10000 |
| ----------------- | --- | --- | ---- | ---- | ---- | ---- | ----- |
| Muito Baixo (MB)  | 1   | 0.8 | 0.4  | 0    | 0    | 0    | 0     |
| Baixo (B)         | 0   | 0.6 | 1    | 0.8  | 0.4  | 0    | 0     |
| Médio (M)         | 0   | 0   | 0.6  | 1    | 0.8  | 0.4  | 0     |
| Alto (A)          | 0   | 0   | 0    | 0.6  | 1    | 0.8  | 0.4   |
| Muito Alto (MA)   | 0   | 0   | 0    | 0    | 0.5  | 1    | 0.8   |

## Regras

1. **R1**: Se o **Preço do Carro** é **Muito Baixo (MB)** e o **Número de Amassados** é **Muito Poucos (MP)**, então o **Valor do Seguro** é **Muito Baixo (MB)**.
2. **R2**: Se o **Preço do Carro** é **Muito Baixo (MB)** e o **Número de Amassados** é **Poucos (P)**, então o **Valor do Seguro** é **Baixo (B)**.
3. **R3**: Se o **Preço do Carro** é **Baixo (B)** e o **Número de Amassados** é **Muito Poucos (MP)**, então o **Valor do Seguro** é **Baixo (B)**.
4. **R4**: Se o **Preço do Carro** é **Baixo (B)** e o **Número de Amassados** é **Alguns (ALG)**, então o **Valor do Seguro** é **Médio (M)**.
5. **R5**: Se o **Preço do Carro** é **Médio (M)** e o **Número de Amassados** é **Poucos (P)**, então o **Valor do Seguro** é **Médio (M)**.
6. **R6**: Se o **Preço do Carro** é **Médio (M)** e o **Número de Amassados** é **Alguns (ALG)**, então o **Valor do Seguro** é **Alto (A)**.
7. **R7**: Se o **Preço do Carro** é **Alto (A)** e o **Número de Amassados** é **Poucos (P)**, então o **Valor do Seguro** é **Alto (A)**.
8. **R8**: Se o **Preço do Carro** é **Alto (A)** e o **Número de Amassados** é **Vários Amassados (VAM)**, então o **Valor do Seguro** é **Muito Alto (MA)**.
9. **R9**: Se o **Preço do Carro** é **Muito Alto (MA)** e o **Número de Amassados** é **Alguns (ALG)**, então o **Valor do Seguro** é **Alto (A)**.
10. **R10**: Se o **Preço do Carro** é **Muito Alto (MA)** e o **Número de Amassados** é **Muitos Amassados (MAM)**, então o **Valor do Seguro** é **Muito Alto (MA)**.

## Problema de Cálculo de Seguro Automotivo

### Dados

- **Preço do Carro**: R$ 30.000,00
- **Número de Amassados**: 3 amassados

### Pergunta

Com base nas regras e na tabela de pertinência definida para os preços dos carros e o impacto dos amassados no valor do seguro, determine qual seria o valor do seguro para um carro avaliado em R$ 30.000,00 que apresenta 3 amassados. Utilize as classificações fuzzy para "Preço do Carro" e "Condição Física" (número de amassados) para realizar o cálculo.
