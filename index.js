"use strict";
class Produto {
    constructor(id, titulo, valor) {
        this.id = id;
        this.titulo = titulo;
        this.valor = valor;
    }
}
class PilhaOperacoes {
    constructor() {
        this.items = [];
    }
    insere(item) {
        this.items.push(item);
    }
    remove() {
        return this.items.pop();
    }
}
class TabelaHash {
    constructor() {
        this.tabela = {};
    }
    insere(produto) {
        if (this.verificaExistencia(produto.id)) {
            if (this.tabela[produto.id] instanceof Array) {
                this.tabela[produto.id].push(produto);
            }
            else {
                this.tabela[produto.id] = [this.tabela[produto.id], produto];
            }
        }
        else {
            this.tabela[produto.id] = [produto];
        }
    }
    verificaExistencia(id) {
        return this.tabela[id] ? true : false;
    }
    remove(id) {
        if (this.verificaExistencia(id)) {
            const arrayComProduto = this.tabela[id];
            if (arrayComProduto) {
                arrayComProduto.splice(0, 1);
                if (arrayComProduto.length === 0) {
                    delete tabelaHashProduto.tabela[id];
                }
            }
        }
    }
}
const tabelaHashProduto = new TabelaHash();
const logEstoque = [];
function criarLinhaProduto(produto) {
    const corpoTabelaProdutos = document.getElementById("corpoTabelaProdutos");
    const linha = document.createElement("tr");
    linha.id = JSON.stringify(produto);
    const tituloCell = document.createElement("td");
    tituloCell.textContent = produto.titulo;
    linha.appendChild(tituloCell);
    const valorCell = document.createElement("td");
    valorCell.textContent = String(produto.valor);
    linha.appendChild(valorCell);
    const buttonCell = document.createElement("td");
    buttonCell.classList.add("d-flex", "justify-content-end", "gap-2");
    const removerButton = document.createElement("button");
    removerButton.classList.add("btn", "btn-danger");
    removerButton.textContent = "Remover";
    removerButton.onclick = function () {
        remover(JSON.stringify(produto));
    };
    buttonCell.appendChild(removerButton);
    linha.appendChild(buttonCell);
    corpoTabelaProdutos.appendChild(linha);
}
function adicionar() {
    const titulo = document.getElementById("titulo");
    const valor = document.getElementById("valor");
    const produto = new Produto(criaIdProduto(titulo.value), titulo.value, Number(valor.value));
    tabelaHashProduto.insere(produto);
    titulo.value = "";
    valor.value = "";
    criarLinhaProduto(produto);
    insereLog(produto, "Adicionado");
}
function criaIdProduto(titulo) {
    const tituloNumero = calcularValorNumerico(titulo);
    const id = multiplicacaoHash(tituloNumero);
    return `${id}`;
}
function calcularValorNumerico(texto) {
    let valor = 0;
    for (let i = 0; i < texto.length; i++) {
        valor += texto.charCodeAt(i);
    }
    return valor;
}
function multiplicacaoHash(valor) {
    const A = 4;
    const multiplicacao = valor * A;
    const id = Math.floor(multiplicacao);
    return id;
}
function remover(produtoInfoString) {
    const produtoInfo = JSON.parse(produtoInfoString);
    const linhaProduto = document.getElementById(JSON.stringify(produtoInfo));
    if (linhaProduto)
        linhaProduto.remove();
    tabelaHashProduto.remove(produtoInfo.id);
    insereLog(produtoInfo, "Removido");
}
function encontraArrayComProduto(produto) {
    const id = produto.id;
    return tabelaHashProduto.tabela[id];
}
const pilhaOperacoes = new PilhaOperacoes();
function insereLog(produto, operacao) {
    pilhaOperacoes.insere({ produto, operacao });
    const corpoTabelaLog = document.getElementById("corpoTabelaLog");
    const linha = document.createElement("tr");
    const operacaoCell = document.createElement("td");
    operacaoCell.textContent = operacao;
    linha.appendChild(operacaoCell);
    const produtoCell = document.createElement("td");
    produtoCell.textContent = JSON.stringify(produto);
    linha.appendChild(produtoCell);
    corpoTabelaLog.insertBefore(linha, corpoTabelaLog.firstChild);
}
function pesquisar() {
    const titulo = document.getElementById("tituloPesquisa");
    const posicao = criaIdProduto(titulo.value);
    const produtos = tabelaHashProduto.tabela[posicao];
    if (produtos) {
        alert(`Produtos encontrados: ${JSON.stringify(produtos)}`);
    }
    else {
        alert("Produto não encontrado");
    }
}
