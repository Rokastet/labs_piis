// Получаем элементы
const container = document.getElementById("products-container");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalOverlay = document.getElementById("modal-overlay");
const closeModal = document.getElementById("close-modal");

// Функция для закрытия модального окна
function hideModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
}

// Добавляем обработчик на кнопку закрытия
closeModal.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", hideModal);

// Функция для создания карточки
function createShirtCard(shirt) {

    const colors = Object.keys(shirt.colors);
    const defaultFrontImage = shirt.default.front;
    const firstColor = colors[0];
    const frontImage = shirt.colors[firstColor]?.front || defaultFrontImage;

    const card = document.createElement("div");
    card.className = "shirt";
    const shirtImage = document.createElement("img");
    shirtImage.className = "shirt-image";
    shirtImage.src = frontImage;
    shirtImage.alt = shirt.name;
    const details = document.createElement("div");
    details.className = "details";
    const h3 = document.createElement("h3");
    h3.textContent = shirt.name;
    const price = document.createElement("p");
    price.textContent = `Price: ${shirt.price}`
    const quickView = document.createElement("button");
    quickView.className = "button quick-view";
    quickView.textContent = 'Quick View';

    details.appendChild(h3);
    details.appendChild(price);
    details.appendChild(quickView);

    card.appendChild(shirtImage);
    card.appendChild(details);

    // Quick View
    card.querySelector(".quick-view").addEventListener("click", () => {

        modalContent.querySelector(".shirt-name__modal").textContent = shirt.name;
        modalContent.querySelector(".shirt-img__modal").src = frontImage;
        modalContent.querySelector(".shirt-img__modal").alt = shirt.name;
        modalContent.querySelector(".shirt-description__modal").textContent = shirt.description;
        modalContent.querySelector(".shirt-price__modal").textContent = `Price: ${shirt.price}`;

        modal.style.display = "block";
        modalOverlay.style.display = "block";
    });

    return card;
}

// Функция для рендера продуктов
function renderProducts(products) {
    products.forEach(shirt => {
        const card = createShirtCard(shirt);
        container.appendChild(card);
    });
}

renderProducts(shirts);

