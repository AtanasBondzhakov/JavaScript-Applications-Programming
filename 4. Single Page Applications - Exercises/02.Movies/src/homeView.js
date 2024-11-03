import { detailsPage } from "./detailsView.js";
import { showView } from "./util.js";

const baseUrl = 'http://localhost:3030/data/movies';

const homeSection = document.querySelector('#home-page');
const catalog = homeSection.querySelector('#movies-list');

catalog.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const id = e.target.dataset.id;
        console.log(id);
        detailsPage(id);
    }
})

export function homePage() {
    catalog.replaceChildren();
    showView(homeSection);
    renderMovies();
}

async function renderMovies() {
    const movies = await getAllMovies();
    movies.forEach(movie => catalog.appendChild(createMovieCard(movie)));
    // homeSection.replaceChildren([...movies.map(createMovieCard)]);
}

async function getAllMovies() {
    const response = await fetch(baseUrl);
    const data = await response.json();

    return data;
}

function createMovieCard(movie) {
    const element = document.createElement('li');
    element.className = 'card mb-4';
    element.innerHTML = `
    <img class="card-img-top"
        src=${movie.img}
        alt="Card image cap" width="400" />
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
        <a data-id="${movie._id}" href="/details/${movie._id}">
        </a>
    </div>
    <div class="card-footer">
        <button data-id=${movie._id} type="button" class="btn btn-info">Details</button>
    </div>`;

    return element;
}

/**
 * <li class="card mb-4">
                                <img class="card-img-top"
                                    src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
                                    alt="Card image cap" width="400" />
                                <div class="card-body">
                                    <h4 class="card-title">Movie Title</h4>
                                    <a href="#">
                                    </a>
                                </div>
                                <div class="card-footer">
                                    <button type="button" class="btn btn-info">Details</button>
                                </div>
                            </li>
 */