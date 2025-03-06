//Nessa segunda versão, utilizei splits ao invés de replaces + regex para extrair o valor necessário do elemento.
let produtoId = 0;
let produtosNoCarrinho = [];
function adicionar(){
    let campoProduto = document.getElementById('produto'); //Campo de seleção do produto.
    let nomeProduto = campoProduto.value.split('-')[0].trim(); //Nome do produto.
    let quantidadeProduto = parseInt(document.getElementById('quantidade').value); //Quantidade do produto.
    let precoProduto = parseInt(campoProduto.value.split('R$')[1]) * quantidadeProduto; //Preço do produto.
    let campoCarrinho = document.getElementById('lista-produtos'); //Campo do carrinho.
    let campoValorTotal = document.getElementById('valor-total'); //Campo do valor total.
    let valorTotal = parseInt(campoValorTotal.textContent.split('R$')[1]); //Valor total.

    //Validação da quantidade do produto.
    if(quantidadeProduto <= 0){
        alert("Insira apenas valores positivos!");
        return;
    }

    if(isNaN(quantidadeProduto)){
        alert("Campo de quantidade não pode ficar vazio!");
        return;
    }



    //Adiciona o produto no carrinho.
    if(produtosNoCarrinho.includes(nomeProduto)){ //Bloco de código que atualiza o carrinho já existente.
        
        for(let i = 1; i <= produtosNoCarrinho.length;i++){
            
            let produtoNoCarrinho = document.getElementById(`produto-${i}`).querySelectorAll('span');
            let nome = produtoNoCarrinho[1].textContent;

            if(nome == nomeProduto){
                let quantidadeAntiga = produtoNoCarrinho[0].textContent[0];
                quantidadeAntiga = parseInt(quantidadeAntiga);
                let novaQuantidade = quantidadeAntiga + quantidadeProduto;
                produtoNoCarrinho[0].textContent = `${novaQuantidade}x`;


                let precoAntigo = produtoNoCarrinho[2].textContent.slice(2);
                precoAntigo = parseInt(precoAntigo);
                console.log(precoAntigo);
                let novoPreco = precoAntigo + precoProduto;
                produtoNoCarrinho[2].textContent = `R$ ${novoPreco}`;
                break;
            }
            
        }
    }else{ //Bloco de código que coloca um novo produto no carrinho.
        produtosNoCarrinho.push(nomeProduto);
        campoCarrinho.innerHTML += `<section class="carrinho__produtos__produto" id=produto-${produtoId += 1}>
    <span class="texto-azul" >${quantidadeProduto}x</span> <span>${nomeProduto}</span> </span> <span class="texto-azul">R$${precoProduto}</span>
  </section>`;
        
    
    }
    
    //Adiciona o preço atual ao total do carrinho.
    campoValorTotal.innerHTML = `<span class="texto-azul" id="valor-total">R$${valorTotal + precoProduto}</span>`;

    //Zera a quantidade ao adicionar o produto no carrinho.
    document.getElementById('quantidade').value = '';
}


//Função que limpa todos os campos do e-commerce.
function limpar(){
    produtoId = 0;
    produtosNoCarrinho = [];
    document.getElementById('quantidade').value = '';
    document.getElementById('lista-produtos').innerHTML =  '';
    document.getElementById('valor-total').textContent = 'R$0';
    document.getElementById('quantidade').value = '';
}