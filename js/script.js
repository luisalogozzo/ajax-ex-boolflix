// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function () {

  $(document).on('click', '#search', function() {
    var InsertedFilm = $('#insert-film-name').val();
    console.log(InsertedFilm);
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
      api_key: '25046906a5edc120a00e8cdb72843203',
      query: InsertedFilm,
      language: 'it-IT',
      },
      success: function (risposta) {
        console.log(risposta.results[0].original_title);
      },
      error: function (request, state, errors) {
        console.log(errors);
      }
    })




  });

});

function PrintFilms () {

}
