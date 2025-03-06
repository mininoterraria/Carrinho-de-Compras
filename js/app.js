//Nessa primeira versão, utilizei funções replace + regex para pegar os valores certos do elemento html.
let produtoId = 0;
let produtosNoCarrinho = [];
//Aprendi que replace pega a primeira ocorrencia de algo que queremos tirar, não a posição em que está.
function adicionar(){
    let nomeProduto = document.getElementById('produto').value; //Campo do produto.
    let quantidadeProduto = parseInt(document.getElementById('quantidade').value); //Quantidade do produto.
    let precoProduto = nomeProduto.replace(/\D/g, '') * quantidadeProduto; //Utiliza regex para pegar apenas a parte numérica do text content de produto e multplica com a quantidade.
    let campoCarrinho = document.getElementById('lista-produtos'); //Campo do carrinho.
    let campoValorTotal = document.getElementById('valor-total'); //Campo do preço total.
    let valorTotal = parseInt(campoValorTotal.textContent.replace(/\D/g, '')); //Preço total.

    nomeProduto = nomeProduto.replace(/[^a-zA-Z\s]/g, '').slice(0,-1); //O nome do produto é pego posteriormente para não prejudicar a pegada do preço do produto, o slice serve para remover o R do cifrão.
   
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
   