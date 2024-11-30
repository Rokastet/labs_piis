const svg = document.getElementById('drawing-area');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX = 0, startY = 0;
let currentElement = null;

// Начало рисования
svg.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;

    const shape = shapeSelector.value;

    if (shape === 'circle') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        currentElement.setAttribute('cx', startX);
        currentElement.setAttribute('cy', startY);
        currentElement.setAttribute('r', 0);
        currentElement.setAttribute('fill', 'transparent');
        currentElement.setAttribute('stroke', 'black');
    } else if (shape === 'rectangle') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        currentElement.setAttribute('x', startX);
        currentElement.setAttribute('y', startY);
        currentElement.setAttribute('width', 0);
        currentElement.setAttribute('height', 0);
        currentElement.setAttribute('fill', 'transparent');
        currentElement.setAttribute('stroke', 'black');
    }

    if (currentElement) {
        svg.appendChild(currentElement);
    }
});

// Рисование
svg.addEventListener('mousemove', (event) => {
    if (!isDrawing || !currentElement) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    if (currentElement.tagName === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        currentElement.setAttribute('r', radius);
    } else if (currentElement.tagName === 'rect') {
        const width = currentX - startX;
        const height = currentY - startY;

        currentElement.setAttribute('width', Math.abs(width));
        currentElement.setAttribute('height', Math.abs(height));
        currentElement.setAttribute('x', width < 0 ? currentX : startX);
        currentElement.setAttribute('y', height < 0 ? currentY : startY);
    }
});

// Завершение рисования
svg.addEventListener('mouseup', () => {
    isDrawing = false;
    currentElement = null;
});
