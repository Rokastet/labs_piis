// 1. Создаем объект personalMovieDB
let personalMovieDB = {
    privat: false, // Значение поля privat
    movies: {      // Объект с фильмами и их оценками
        "Inception": 9.0,
        "The Matrix": 8.5,
        "Interstellar": 9.5
    }
};

// 2. Функция для вывода объектов movies в виде таблицы на страницу
function showMoviesTable(db) {
    // Проверяем, если свойство privat == true, функция не должна ничего выводить
    if (db.privat) {
        console.log("Доступ к базе данных закрыт.");
        return; // Прекращаем выполнение функции
    }

    // Создаем таблицу
    let table = `<table>
                    <tr>
                        <th>Название фильма</th>
                        <th>Оценка</th>
                    </tr>`;

    // Заполняем таблицу данными из объекта movies
    for (let movie in db.movies) {
        table += `<tr>
                    <td>${movie}</td>
                    <td>${db.movies[movie]}</td>
                  </tr>`;
    }

    table += `</table>`;

    // Добавляем таблицу на страницу
    document.getElementById('movieTableContainer').innerHTML = table;
}

// 3. Вызываем функцию вывода таблицы
showMoviesTable(personalMovieDB);
