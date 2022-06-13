const elMovieList = document.querySelector('.movie__list');
const elSearNumbers = document.querySelector('.movie__result-num');
const elSelectMenu = document.querySelector('.genres');
const elForm = document.querySelector('.movie__form');
const filteredArray = [];
let sortedOptions=[];

// search result
elSearNumbers.textContent = films.length
// sort genres
let sortGenres = (filmArray) => {
  filmArray.forEach(element => {
    element.genres.forEach(innerElement => {
      if (!(sortedOptions.includes(innerElement))) sortedOptions.push(innerElement);
    })
  });
}
sortGenres(films);

// select menu
let selectMenu = (filmGenres) => {
  for (item of filmGenres) {
    let elOption = document.createElement('option');
    elOption.textContent = item;
    elSelectMenu.appendChild(elOption);
  }
}
selectMenu(sortedOptions);

//sort cards
let sortedCards = (arrayList) => {
  for (item of arrayList) {
    item.genres.forEach(innergenre => {
      if (innergenre === elSelectMenu.value) {
        filteredArray.push(item);
      }
    })
  }
}

// btn on click
elForm.addEventListener('submit', evt => {
  evt.preventDefault();
  elMovieList.innerHTML = null;
  filteredArray.length = 0;
  sortedCards(films)
  renderMovies(filteredArray);
  elSearNumbers.textContent = filteredArray.length;
})

// render Movies
let renderMovies = (fullArray) => {
  for (item of fullArray) {
    // create elements
    let cardList = document.createElement('li');
    let cardImg = document.createElement('img');
    let cardBody = document.createElement('div');
    let cardTitle = document.createElement('h5');
    let cardText = document.createElement('p');
    let cardBtn = document.createElement('a');
    let elCardGenresList = document.createElement('ul');

    // set attributes
    cardList.setAttribute('class', 'card mt-3');
    cardImg.setAttribute('src', item.poster);
    cardBody.setAttribute('class', 'card-body');
    cardTitle.setAttribute('class', 'card-title');
    cardText.setAttribute('class', 'card-text');
    cardBtn.setAttribute('href','https://picsum.photos');
    cardBtn.setAttribute('class', 'btn btn-danger')
    elCardGenresList.style.marginTop = '20px';

    // card genres list
    item.genres.forEach(elgenres => {
      let cardGenresList = document.createElement('li');
      cardGenresList.style.width='100%'
      cardGenresList.textContent = elgenres;
      elCardGenresList.appendChild(cardGenresList);
    })
    
    // set values
    cardTitle.textContent = item.title;
    cardText.textContent = item.overview;
    cardBtn.textContent = 'Watch Trailer';

    // initialize elements
    elMovieList.appendChild(cardList);
    cardList.appendChild(cardImg);
    cardList.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardBtn);
    cardBody.appendChild(elCardGenresList);
  }
}
renderMovies(films);