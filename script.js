// Seleciona os elementos do DOM
const products = document.querySelectorAll('.product'); // Todas as divs de produtos
const modal = document.getElementById('product-modal'); // Modal
const modalImage = modal.querySelector('.modal-image'); // Imagem do modal
const modalTitle = modal.querySelector('.modal-body h3'); // Título do modal
const modalDescription = modal.querySelector('.modal-body p'); // Descrição do modal
const modalPrice = modal.querySelector('.modal-body .price h4:nth-child(2)'); // Preço do modal
const closeModal = modal.querySelector('.close-modal'); // Botão de fechar o modal

// Adiciona o evento de clique para cada produto
products.forEach(product => {
  product.addEventListener('click', () => {
    // Captura os dados do produto
    const productImage = product.dataset.image;
    const productName = product.querySelector('h3').innerText;
    const productDescription = product.dataset.description;
    const productPrice = product.dataset.price;

    // Atualiza os elementos do modal
    modalImage.src = productImage;
    modalImage.alt = productName;
    modalTitle.innerText = productName;
    modalDescription.innerText = productDescription;
    modalPrice.innerText = `R$${productPrice}`;

    // Exibe o modal
    modal.classList.remove('hidden');
    modal.classList.add('visible');
  });
});

// Adiciona evento para fechar o modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('visible');
  modal.classList.add('hidden');
});

// Fecha o modal ao clicar fora do conteúdo
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
  }
});

// Array para armazenar os itens e valor total
var arrayItems = [];
let totalValue = 0;

// Função para lidar com o clique do botão e enviar informações do modal para o backend
function sendItemFromModal() {
    // Capturando o modal aberto
    const modal = document.getElementById("product-modal");

    // Capturando os dados do modal
    const itemName = modal.querySelector(".modal-body h3").textContent;
    const itemPrice = parseFloat(modal.querySelector(".price h4:nth-child(2)").textContent);
    const itemQuantity = parseInt(modal.querySelector(".input-quantity").value || "1"); // Padrão para 1

    // Atualizando o array de itens e o valor total
    arrayItems.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
    totalValue += itemPrice * itemQuantity;

    // Enviando para o backend
    sentToBackend(itemName, itemPrice, itemQuantity);
}

// Função para enviar dados para a API
function sentToBackend(name, price, quantity) {
    console.log("Enviando dados para o backend...");

    fetch("http://localhost:8080/snack-order", {
        method: "POST",
        body: JSON.stringify({ item: name, price: price, quantity: quantity }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })
        .then(response => {
            if (response.ok) {
                console.log("Pedido criado com sucesso");
                alert("Produto adicionado ao carrinho!");
            } else {
                console.error("Erro ao criar o pedido:", response.statusText);
                alert("Erro ao adicionar o produto. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro de rede:", error);
            alert("Erro de rede ao se conectar com o servidor.");
        });
}

// Selecionando o botão "Adicionar ao Carrinho" dentro do modal
document.querySelector(".btn.btn-add").addEventListener("click", function () {
    sendItemFromModal();
});



document.getElementById('searchInput').addEventListener('input', function () {
  const searchQuery = this.value.toLowerCase(); // Texto da pesquisa
  const sections = document.querySelectorAll('section'); // Seleciona todas as seções

  sections.forEach(section => {
    const products = section.querySelectorAll('.product'); // Produtos da seção
    let hasVisibleProduct = false; // Flag para rastrear se a seção tem produtos visíveis

    products.forEach(product => {
      const productName = product.querySelector('h3').textContent.toLowerCase();
      const productDescription = product.dataset.description.toLowerCase();

      // Verifica se o nome ou descrição contém o texto da pesquisa
      if (productName.includes(searchQuery) || productDescription.includes(searchQuery)) {
        product.style.display = ''; // Mostra o produto
        hasVisibleProduct = true; // Marca a seção como visível
      } else {
        product.style.display = 'none'; // Esconde o produto
      }
    });

    // Mostra ou oculta o título da seção com base na visibilidade dos produtos
    const sectionTitle = section.querySelector('.title');
    if (hasVisibleProduct) {
      sectionTitle.style.display = ''; // Mostra o título
      section.style.display = ''; // Garante que a seção esteja visível
    } else {
      sectionTitle.style.display = 'none'; // Esconde o título
      section.style.display = 'none'; // Esconde a seção inteira
    }
  });
});

