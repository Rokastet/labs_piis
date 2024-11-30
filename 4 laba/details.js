const detailsContainer = document.getElementById("details-container");
const shirt = JSON.parse(localStorage.getItem("selectedShirt"));

if (shirt) {
    const firstColor = Object.keys(shirt.colors)[0] || "default";
    let currentColor = firstColor;
    let showingFront = true;

    const h1 = document.createElement("h1");
    h1.textContent = shirt.name;

    const shirtImage = document.createElement("img");
    shirtImage.className = "shirt-image";
    shirtImage.src = shirt.colors[firstColor]?.front || shirt.default.front;
    shirtImage.alt = shirt.name;

    const description = document.createElement("p");
    description.textContent = shirt.description;

    const price = document.createElement("p");
    price.textContent = `Price: ${shirt.price}`;

    const colorButtons = document.createElement("div");
    colorButtons.className = "color-buttons";

    Object.keys(shirt.colors).forEach(color => {
        const colorButton = document.createElement("button");
        colorButton.className = "color-button";
        colorButton.style.background = color;
        colorButton.textContent = color;

        colorButtons.appendChild(colorButton);
    });

    const toggleView = document.createElement("button");
    toggleView.className = "button toggle-view";
    toggleView.textContent = 'View Back';

    detailsContainer.appendChild(h1);
    detailsContainer.appendChild(shirtImage);
    detailsContainer.appendChild(description);
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(colorButtons);
    detailsContainer.appendChild(toggleView);

    toggleView.addEventListener("click", () => {
        showingFront = !showingFront;
        shirtImage.src = showingFront
            ? shirt.colors[currentColor]?.front || shirt.default.front
            : shirt.colors[currentColor]?.back || shirt.default.back;
            toggleView.textContent = showingFront ? "View Back" : "View Front";
    });

    document.querySelectorAll(".color-button").forEach(button => {
        button.addEventListener("click", () => {
            currentColor = button.textContent;
            shirtImage.src = showingFront
                ? shirt.colors[currentColor]?.front || shirt.default.front
                : shirt.colors[currentColor]?.back || shirt.default.back;
        });
    });
} else {
    alert("Error: No shirt data found. Please return to the main page.") ;
}

