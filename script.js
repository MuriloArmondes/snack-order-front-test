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
