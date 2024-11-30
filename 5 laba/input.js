// Получаем все элементы с классом "target"
const targets = document.querySelectorAll('.target');
let draggedElement = null; // Элемент, который перетаскивается
let initialPosition = {}; // Начальная позиция элемента
let offset = { x: 0, y: 0 }; // Смещение мыши относительно элемента
let stuckElement = null; // Элемент, который приклеен к мыши
let workspace = document.getElementById('workspace');

// Функция для перемещения элемента
function moveElement(event, element, offsetX = 0, offsetY = 0) {
    const rect = workspace.getBoundingClientRect();
    element.style.left = `${event.clientX - rect.left - offsetX}px`;
    element.style.top = `${event.clientY - rect.top - offsetY}px`;
}

// Начало перетаскивания
function onMouseDown(event) {
    draggedElement = event.target;
    if (!draggedElement.classList.contains('target')) return;

    // Сохраняем начальную позицию
    initialPosition = {
        left: draggedElement.style.left,
        top: draggedElement.style.top,
    };

    // Рассчитываем смещение мыши относительно элемента
    const rect = draggedElement.getBoundingClientRect();
    offset.x = event.clientX - rect.left;
    offset.y = event.clientY - rect.top;
}

// Перетаскивание
function onMouseMove(event) {
    if (draggedElement) {
        moveElement(event, draggedElement, offset.x, offset.y);
    } else if (stuckElement) {
        moveElement(event, stuckElement);
    }
}

// Завершение перетаскивания
function onMouseUp() {
    draggedElement = null;
}

// Двойной клик для приклеивания
function onDoubleClick(event) {
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

// Нажатие клавиши ESC для отмены действий
function onKeyDown(event) {
    if (event.key === 'Escape') {
        // Если есть перетаскиваемый элемент
        if (draggedElement) {
            draggedElement.style.left = initialPosition.left;
            draggedElement.style.top = initialPosition.top;
            draggedElement = null;
        }

        // Если есть приклеенный элемент
        if (stuckElement) {
            stuckElement.style.left = initialPosition.left;
            stuckElement.style.top = initialPosition.top;
            stuckElement.style.backgroundColor = 'red'; // Возвращаем цвет
            stuckElement = null;
        }
    }
}

// Добавляем обработчики событий
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('dblclick', onDoubleClick);
document.addEventListener('keydown', onKeyDown);
