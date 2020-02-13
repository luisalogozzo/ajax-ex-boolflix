$(document).ready(function () {
  var UrlMovie = 'https://api.themoviedb.org/3/search/movie';
  var ContainerMovie = '.container-film > ul';
  var UrlSeries = 'https://api.themoviedb.org/3/search/tv';
  var ContainerSeries = '.container-series > ul';


// CERCA CON TASTIERA//////////////////////
  $( "#insert-film-name").keyup(function() {
   if (event.which == 13) {
     var InsertedFilm = $('#insert-film-name').val();
     printMovieTv(InsertedFilm, UrlMovie, ContainerMovie);
     printMovieTv(InsertedFilm, UrlSeries, ContainerSeries);
   }
  });

  // CLICK SUL CERCA//////////////////////////////
  $(document).on('click', '#search', function() {
    var InsertedFilm = $('#insert-film-name').val();
    printMovieTv(InsertedFilm, UrlMovie, ContainerMovie);
    printMovieTv(InsertedFilm, UrlSeries, ContainerSeries);
  });


// HOVER SU FILM E SERIE///////////////////////////
  $('.retrocard').hide();
  $(document).on('mouseenter','.filmseries .poster', function () {
      $( this ).removeClass('z-index-1');
      $( this ).hide();
  }).on('mouseleave','.filmseries',  function(){
      $( this ).find('.poster').addClass('z-index-1');
      $( this ).find('.poster').show();
  });


});


// FUNZIONE STAMPA FILM E SERIE//////////////////////
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
      var movieId;
      var ThisResults;
      for (var i = 0; i < risposta.results.length; i++) {
        ThisResults = risposta.results[i];
        movieId = ThisResults.id;
        console.log(movieId);
        var context = {
          poster_path: printPoster(ThisResults.poster_path),
          title: ThisResults.title,
          original_title: ThisResults.original_title,
          language: ThisResults.original_language,
          name: ThisResults.name,
          original_name: ThisResults.original_name,
          vote_average: printStars(ThisResults),
          overview: ThisResults.overview,
          movieId: movieId
         };
         var html = template(context);
         $(container).append(html);
         SearchActors(movieId);
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}

// FUNZIONE STAMPA POSTER///////////////////////////
function printPoster(path) {
  var urlPoster = '';
  var urlImg = "https://image.tmdb.org/t/p/w342/";
  if (path == null) {
    urlPoster = "img/background.jpg";
  } else {
    urlPoster = urlImg + path;
  }
  return urlPoster;
}

// FUNZIONE STAMPA STELLE VOTO/////////////////////
function printStars (risultati) {
  var filmVote = Math.ceil(parseInt(risultati.vote_average) / 2);
  var star = '';
  for (var i = 0; i < 5; i++) {
    if (i < filmVote) {
      star += '&#9733;';
    } else if (i >= filmVote && i < 5) {
      star += '&#9734;';
    }
  }
  return star;
}

// FUNZIONE RICERCA ATTORI////////////////////////
function SearchActors(movieId) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/' + movieId + '/credits',
    method: 'GET',
    data: {
    api_key: '25046906a5edc120a00e8cdb72843203',
    },
    success: function (risposta) {
      var Cast = '';
      var i = 0;

      while(i < 5 && i < risposta.cast.length) {

        if (i < 4 && i < risposta.cast.length - 1) {
          Cast += risposta.cast[i].name + ', ';
        } else {
          Cast += risposta.cast[i].name;
        }
        i++;
      }
      if (risposta.cast.length == 0) {
        $('[data-id="'+ movieId +'"]').find('.cast-wrap').html(' ');
      }
      $('[data-id="'+ movieId +'"]').find('.cast').html(Cast);
    },
    error: function (errors) {
      console.log(errors);
    }
  });
}
