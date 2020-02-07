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
        var source = document.getElementById("films-template").innerHTML;
        var template = Handlebars.compile(source);
        for (var i = 0; i < risposta.results.length; i++) {
          // console.log(risposta.results[i].original_title);
          // console.log(risposta.results[i].title);
          // console.log(risposta.results[i].original_language);
          // console.log(risposta.results[i].vote_average);
          var context = {
            title: risposta.results[i].title,
            original_title: risposta.results[i].original_title,
            original_language: risposta.results[i].original_language,
            vote_average: risposta.results[i].vote_average
           };
           var html = template(context);
           $('.container').append(html);

        }

      },
      error: function (request, state, errors) {
        console.log(errors);
      }
    })




  });

});

function PrintFilms () {

}
