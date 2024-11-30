const container = document.getElementById("products-container");

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
    quickView.className = "button see-page";
    quickView.textContent = 'See page';

    details.appendChild(h3);
    details.appendChild(price);
    details.appendChild(quickView);

    card.appendChild(shirtImage);
    card.appendChild(details);

    card.querySelector(".see-page").addEventListener("click", () => {
        localStorage.setItem("selectedShirt", JSON.stringify(shirt));
        window.location.href = "details.html";
    });

    return card;
}

function renderProducts(products) {
    products.forEach(shirt => {
        const card = createShirtCard(shirt);
        container.appendChild(card);
    });
}


renderProducts(shirts);

