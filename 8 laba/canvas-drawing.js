const canvas = document.getElementById('drawing-area');
const ctx = canvas.getContext('2d');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX = 0, startY = 0;

// Начало рисования
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

// Рисование
canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    const shape = shapeSelector.value;

    // Очищаем холст и рисуем текущую фигуру
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.stroke();
    }
});

// Завершение рисования
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});
