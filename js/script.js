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
     // printSeries(InsertedFilm);
   }
  });

  $(document).on('click', '#search', function() {
    var InsertedFilm = $('#insert-film-name').val();
    printFilms(InsertedFilm);
    // printSeries(InsertedFilm);
  });

//   $('.poster').hover (
//     function(event) {
//     $(event.target).hide();
//     $('.retrocard').removeClass('display-none');
//   }, function(event) {
//     $(event.target).show();
//     $('.retrocard').addClass('display-none');
//   }
// );
$('.retrocard').hide();
$(document).on('mouseenter','.poster', function () {
    $( this ).hide();
    $(this).siblings('.retrocard').show();

}).on('mouseleave','.poster',  function(){
    $( this ).show();
    $('.retrocard').hide();
});



});

function printFilms(InsertedFilm) {
  $('#insert-film-name').val('');
  $('.container-film > ul').html('');
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
         $('.container-film ul').append(html);
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
         $('.container-series ul').append(html);
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}




function printStars (vote) {
  var star = '';

for (var i = 0; i < 5; i++) {
  if (i < vote) {
    star += '&#9733;';
  } else if (i >= vote && i < 5) {
    star += '&#9734;';
  }
}
return star;
}
