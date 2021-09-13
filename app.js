const APIKEY = "04c35731a5ee918f014970082a0088b1";
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=upcoming.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280"

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let count = 10;
const mainEl = document.querySelector('.main')
const formEl = document.getElementById('form')
const searchEl = document.querySelector('.search')

async function upcomingMovie(url){
    const respond = await fetch(url);
    const respondData = await respond.json();

    showMovies(respondData.results);

}

async function getMovieByTopRated(){
    const topRated = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=top_rated.desc&api_key=04c35731a5ee918f014970082a0088b1&page='+count);
    
    const respondData = await topRated.json();
    showMovies(respondData.results);
}

async function getMoviesByPopularity(){
    const respond = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");

    const respondData = await respond.json()
    console.log(respondData);
    showMovies(respondData.results);

}

async function getMoviesByRevenue(){
    const revenue = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
    const respondData = await revenue.json();
    showMovies(respondData.results);
}

function showMovies(movies){

    //clean movies first
    mainEl.innerHTML = '';

    movies.forEach(movie => {

        const {title, vote_average, poster_path, overview} = movie;
        
        const movieCard = document.createElement('div');

        movieCard.classList.add('movies-card');

        movieCard.innerHTML = `
        
            <img src="${IMGPATH + poster_path}" alt=""
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getRatingClass(vote_average)}">
                ${vote_average}</span>
            </div>
            
            <div class="overview">
                <h2>Overview:</h2>
            ${overview}</div>    
         
        `;
        mainEl.appendChild(movieCard);
    });

}

function getRatingClass(rating){
    if(rating >= 8){
        return 'green'

    }else if(rating >= 5 ){
        return 'orange'
    }
    else{ return 'red'}

    
}


//searching for movies
formEl.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const searchTerm = searchEl.value;

    if(searchTerm){

        upcomingMovie(SEARCHAPI + searchTerm);
        searchEl.value = "";
        console.log(searchTerm)
    }
    else{
        const notFound = document.createElement('div')
        notFound.classList.add('not-found');

        notFound.innerHTML = `
            <div class="not-found>
                <img src="not_found.jpg" alt=""/>
                <h2>Sorry we couldn't find any matches for<b>not found</b>
                <p> Please try search with another term</p>
            </div>"
        
        `;
        mainEl.appendChild(notFound);
    }
    

})




//navigation bar

const nav = document.querySelector('.nav')
const iconBar = document.querySelector('.icon i')

function navToggler(){
    iconBar.classList.toggle('fa-bars');
    iconBar.classList.toggle('fa-times');
    nav.classList.toggle('nav-active');

}

iconBar.addEventListener('click', ()=>{
    navToggler();
});


upcomingMovie(APIURL + count);