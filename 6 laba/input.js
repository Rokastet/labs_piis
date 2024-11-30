// Получаем элементы
const targets = document.querySelectorAll('.target');
let draggedElement = null; // Элемент, который перетаскивается
let initialPosition = {}; // Начальная позиция элемента
let offset = { x: 0, y: 0 }; // Смещение мыши относительно элемента
let stuckElement = null; // Элемент, который приклеен к пальцу
let resizingElement = null; // Элемент, который изменяется
let workspace = document.getElementById('workspace');

// Функция перемещения элемента
function moveElement(event, element, offsetX = 0, offsetY = 0) {
    const rect = workspace.getBoundingClientRect();
    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;
    element.style.left = `${x - rect.left - offsetX}px`;
    element.style.top = `${y - rect.top - offsetY}px`;
}

// Начало перетаскивания
function onPointerDown(event) {
    draggedElement = event.target;
    if (!draggedElement.classList.contains('target')) return;

    // Сохраняем начальную позицию
    initialPosition = {
        left: draggedElement.style.left,
        top: draggedElement.style.top,
    };

    // Рассчитываем смещение относительно указателя
    const rect = draggedElement.getBoundingClientRect();
    offset.x = (event.clientX || event.touches[0].clientX) - rect.left;
    offset.y = (event.clientY || event.touches[0].clientY) - rect.top;

    if (event.type === 'touchstart' && event.touches.length > 1) {
        // Если второй палец касается экрана, сбрасываем перемещение
        resetDragging();
    }
}

// Перетаскивание
function onPointerMove(event) {
    if (draggedElement) {
        moveElement(event, draggedElement, offset.x, offset.y);
    } else if (stuckElement) {
        moveElement(event, stuckElement);
    }
}

// Завершение перетаскивания
function onPointerUp() {
    draggedElement = null;
}

// Двойное нажатие для приклеивания
function onDoubleTouch(event) {
    const element = event.target;
    if (!element.classList.contains('target')) return;

    // Если элемент уже приклеен, открепляем его
    if (stuckElement === element) {
        stuckElement = null;
        element.style.backgroundColor = 'red'; // Возвращаем цвет
    } else {
        stuckElement = element;
        element.style.backgroundColor = 'blue'; // Меняем цвет
    }
}

// Завершение режима приклеивания
function onTap(event) {
    if (stuckElement) {
        stuckElement = null;
    }
}

// Сброс действий
function resetDragging() {
    if (draggedElement) {
        draggedElement.style.left = initialPosition.left;
        draggedElement.style.top = initialPosition.top;
        draggedElement = null;
    }

    if (stuckElement) {
        stuckElement.style.left = initialPosition.left;
        stuckElement.style.top = initialPosition.top;
        stuckElement.style.backgroundColor = 'red'; // Возвращаем цвет
        stuckElement = null;
    }
}

// Изменение размера
function onResize(event) {
    resizingElement = event.target;
    if (!resizingElement.classList.contains('target')) return;

    resizingElement.style.cursor = 'nwse-resize';
    const rect = resizingElement.getBoundingClientRect();

    resizingElement.style.width = `${Math.max(rect.width + event.movementX, 20)}px`;
    resizingElement.style.height = `${Math.max(rect.height + event.movementY, 20)}px`;
}

// Установка обработчиков событий
document.addEventListener('mousedown', onPointerDown);
document.addEventListener('mousemove', onPointerMove);
document.addEventListener('mouseup', onPointerUp);

document.addEventListener('touchstart', onPointerDown);
document.addEventListener('touchmove', onPointerMove);
document.addEventListener('touchend', onPointerUp);

document.addEventListener('dblclick', onDoubleTouch);
document.addEventListener('touchstart', onTap);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') resetDragging();
});

// Добавляем возможность изменения размера
targets.forEach(target => {
    target.addEventListener('mousedown', onResize);
    target.addEventListener('mousemove', onResize);
    target.addEventListener('mouseup', () => {
        resizingElement = null;
    });
});
