import { editPage } from "./editView.js";
import { homePage } from "./homeView.js";
import { showView } from "./util.js";

const baseUrl = 'http://localhost:3030/data';

const detailsSection = document.querySelector('#movie-example');


export function detailsPage(id) {
    showView(detailsSection);
    renderMovie(id);
}

async function renderMovie(id) {
    detailsSection.replaceChildren();

    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ])

    detailsSection.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {


    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src=${movie.img}
                alt="Movie" />
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3">Movie Description</h3>
            <p>
                ${movie.description}
            </p>
            ${createControls(movie, user, likes, ownLike)}  
        </div>
    </div>
    `

    const likeBtn = element.querySelector('.like-btn');
    if(likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    const delBtn = element.querySelector('.del-btn');
    if(delBtn){
        delBtn.addEventListener('click', () => deleteMovie(movie._id));
    }

    const editBtn = element.querySelector('.edit-btn');
    if(editBtn) {
        editBtn.addEventListener('click', () => editMovie(movie._id));
    }

    return element;
}

function createControls(movie, user, likes, ownLike) {

    const isOwner = user && user._id === movie._ownerId;

    let controls = [];

    if (isOwner) {
        controls.push(`<a class="btn btn-danger del-btn" href="#">Delete</a>`);
        controls.push(`<a class="btn btn-warning edit-btn" href="#">Edit</a>`);
    } else if (user && !ownLike) {
        controls.push(`<a class="btn btn-primary like-btn" href="#">Like</a>`);
    }

    controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);

    return controls.join('');
}

export async function getMovie(id) {
    const response = await fetch(`${baseUrl}/movies/${id}`);
    const movie = await response.json();

    return movie;
}


async function getLikes(id) {
    const response = await fetch(`${baseUrl}/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await response.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const response = await fetch(`${baseUrl}/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await response.json();
        return like.length > 0;
    }
}

async function likeMovie(e, movieId) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({movieId})
    };

    await fetch(`${baseUrl}/likes`, options);

    detailsPage(movieId);
}

async function deleteMovie(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        }
    };
    await fetch(`${baseUrl}/movies/${id}`, options);
    homePage();
}

async function editMovie(movieId) {
 showView(document.querySelector('#edit-movie'));
 editPage(movieId);
 console.log(movieId);
}