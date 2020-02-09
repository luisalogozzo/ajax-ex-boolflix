// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function () {
  $( "#insert-film-name").keyup(function() {
   if (event.which == 13) {
     var InsertedFilm = $('#insert-film-name').val();
     printFilms(InsertedFilm);
     printSeries(InsertedFilm);
   }
  });

  $(document).on('click', '#search', function() {
    var InsertedFilm = $('#insert-film-name').val();
    printFilms(InsertedFilm);
    printSeries(InsertedFilm);
  });

});

function printFilms(InsertedFilm) {
  $('#insert-film-name').val('');
  $('.container').html('');
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
      var filmVote;
      var filmVoteTo5;
      for (var i = 0; i < risposta.results.length; i++) {
        filmVote = parseInt(risposta.results[i].vote_average) / 2;
        filmVoteTo5 = Math.round(filmVote);
        var context = {
          poster_path: risposta.results[i].poster_path,
          filmseries: 'film',
          title: risposta.results[i].title,
          original_title: risposta.results[i].original_title,
          language: risposta.results[i].original_language,
          vote_average: printStars(filmVoteTo5),
         };
         var html = template(context);
         $('.container').append(html);
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}
function printSeries(InsertedFilm) {
  $('#insert-film-name').val('');
  $('.container-series').html('');
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {
    api_key: '25046906a5edc120a00e8cdb72843203',
    query: InsertedFilm,
    language: 'it-IT',
    },
    success: function (risposta) {
      var source = document.getElementById("films-template").innerHTML;
      var template = Handlebars.compile(source);
      var filmVote;
      var filmVoteTo5;
      for (var i = 0; i < risposta.results.length; i++) {
        filmVote = parseInt(risposta.results[i].vote_average) / 2;
        filmVoteTo5 = Math.round(filmVote);
        var context = {
          poster_path: risposta.results[i].poster_path,
          filmseries: 'series',
          name: risposta.results[i].name,
          original_name: risposta.results[i].original_name,
          language: risposta.results[i].original_language,
          vote_average: printStars(filmVoteTo5),
         };
         var html = template(context);
         $('.container-series').append(html);
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}




function printStars (vote) {
  // switch (vote) {
  //   case 0 :
  //   star = '&#9734;&#9734;&#9734;&#9734;&#9734;';
  //     break;
  //   case 1 :
  //   star = '&#9733;&#9734;&#9734;&#9734;&#9734;';
  //     break;
  //   case 2 :
  //   star = '&#9733;&#9733;&#9734;&#9734;&#9734;';
  //     break;
  //   case 3 :
  //   star = '&#9733;&#9733;&#9733;&#9734;&#9734;';
  //     break;
  //   case 4 :
  //   star = '&#9733;&#9733;&#9733;&#9733;&#9734;';
  //     break;
  //   default:
  //   star = '&#9733;&#9733;&#9733;&#9733;&#9733;';
  // }
  var star = '';

  for (var i = 0; i < vote; i++) {
  star += '&#9733;';

  }
  for (var i = vote; i < 5; i++) {
  star += '&#9734;';
  }
  console.log(star);
  return star;
}
