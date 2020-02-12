$(document).ready(function () {
  var UrlMovie = 'https://api.themoviedb.org/3/search/movie';
  var ContainerMovie = '.container-film > ul';
  var UrlSeries = 'https://api.themoviedb.org/3/search/tv';
  var ContainerSeries = '.container-series > ul';


  $( "#insert-film-name").keyup(function() {
   if (event.which == 13) {
     var InsertedFilm = $('#insert-film-name').val();
     printMovieTv(InsertedFilm, UrlMovie, ContainerMovie);
     printMovieTv(InsertedFilm, UrlSeries, ContainerSeries);
   }
  });

  $(document).on('click', '#search', function() {
    var InsertedFilm = $('#insert-film-name').val();
    printMovieTv(InsertedFilm, UrlMovie, ContainerMovie);
    printMovieTv(InsertedFilm, UrlSeries, ContainerSeries);
  });


  $('.retrocard').hide();
  $(document).on('mouseenter','.filmseries .poster', function () {
      $( this ).removeClass('z-index-1');
      $( this ).hide();
  }).on('mouseleave','.filmseries',  function(){
      $( this ).find('.poster').addClass('z-index-1');
      $( this ).find('.poster').show();
  });

});

function printMovieTv(InsertedFilm, url, container) {
  $('#insert-film-name').val('');
  $(container).html('');
  $.ajax({
    url: url,
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
      var movieId;
      var ThisResults;
      for (var i = 0; i < risposta.results.length; i++) {
        ThisResults = risposta.results[i];
        movieId = ThisResults.id;
        console.log(movieId);
        filmVote = parseInt(ThisResults.vote_average) / 2;
        filmVoteTo5 = Math.ceil(filmVote);
        var context = {
          poster_path: ThisResults.poster_path,
          // filmseries: 'film',
          title: ThisResults.title,
          original_title: ThisResults.original_title,
          language: ThisResults.original_language,
          name: ThisResults.name,
          original_name: ThisResults.original_name,
          vote_average: printStars(filmVoteTo5),
          overview: ThisResults.overview,
          cast: SearchActors(movieId),
         };
         var html = template(context);
         $(container).append(html);
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

function SearchActors(movieId) {
  var Cast = '';
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/' + movieId + '/credits',
    method: 'GET',
    data: {
    api_key: '25046906a5edc120a00e8cdb72843203',
    },
    success: function (risposta) {
      for (var i = 0; i < risposta.cast.length; i++) {
      Cast = risposta.cast[i].name;
      console.log(Cast);
    }
    },
    error: function (errors) {
      console.log(errors);
    }
  });
 setTimeout(function(){ return Cast; }, 500);
}
