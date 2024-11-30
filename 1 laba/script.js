// 1. Спрашиваем у пользователя, сколько фильмов он уже посмотрел
let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');

// 2. Создаем объект для хранения данных о фильмах
let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    private: false
};

// 3. Спрашиваем у пользователя название фильма и оценку два раза
for (let i = 0; i < 2; i++) {
    let lastWatchedMovie = prompt('Один из последних просмотренных фильмов?', '');
    let movieRating = prompt('На сколько оцените его?', '');

    // 4. Проверка условий на валидные ответы
    if (lastWatchedMovie != null && movieRating != null && 
        lastWatchedMovie !== '' && movieRating !== '' && 
        lastWatchedMovie.length < 50) {
        
        // 5. Записываем ответы в объект movies
        personalMovieDB.movies[lastWatchedMovie] = movieRating;
    } else {
        console.log('Ошибка!');
        i--; // Возвращаем цикл обратно, чтобы заново задать вопросы
    }
   
}

// 6. Выводим объект в консоль
console.log(personalMovieDB);
