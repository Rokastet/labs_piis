const canvas = document.getElementById('drawing-area');
const ctx = canvas.getContext('2d');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX = 0, startY = 0;

// Массив для хранения фигур
let shapes = [];

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

    // Очищаем холст и перерисовываем все фигуры
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Перерисовываем все фигуры из массива
    for (let shape of shapes) {
        if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        } else if (shape.type === 'rectangle') {
            ctx.beginPath();
            ctx.rect(shape.x, shape.y, shape.width, shape.height);
            ctx.stroke();
        }
    }

    // Рисуем текущую фигуру (не добавляем её в массив, пока не отпустим кнопку мыши)
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
canvas.addEventListener('mouseup', (event) => {
    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const shape = shapeSelector.value;
    
    let newShape = {};

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        newShape = { type: 'circle', x: startX, y: startY, radius: radius };
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        newShape = { type: 'rectangle', x: startX, y: startY, width: width, height: height };
    }

    // Добавляем текущую фигуру в массив
    shapes.push(newShape);

    // Завершаем рисование
    isDrawing = false;
});
