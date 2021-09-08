const APIKEY = "04c35731a5ee918f014970082a0088b1";
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=upcoming.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280"



const mainEl = document.querySelector('.main')
async function getMovieByTopRated (){
    const topRated = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=top_rated.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
}

async function getMoviesByPopularity(){
    const respond = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");

    const respondData = await respond.json()
    console.log(respondData);


    respondData.results.forEach(movie => {

        const {title, vote_average, poster_path} = movie;
        
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
         
        `;
        mainEl.appendChild(movieCard);


        
    });


}

async function getMoviesByRevenue(){
    const revenue = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");

}

function getRatingClass(rating){
    if(rating >= 8){
        return 'green'

    }else if(rating >= 5 ){
        return 'orange'
    }
    else{ return 'red'}

    
}

getMoviesByPopularity()






