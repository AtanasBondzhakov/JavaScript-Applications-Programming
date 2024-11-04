import { getMovie } from "./detailsView.js";
import { homePage } from "./homeView.js";
import { showView } from "./util.js";

const baseUrl = 'http://localhost:3030/data/movies';

const editSection = document.querySelector('#edit-movie');
const form = editSection.querySelector('form');
form.addEventListener('submit', onSubmit);

let id;

export async function editPage(movieId) {
    id = movieId;
    showView(editSection);
    const movie = await getMovie(movieId)
    editSection.querySelector('input[name="title"]').value = movie.title;
    editSection.querySelector('textarea[name="description"]').value = movie.description;
    editSection.querySelector('input[name="img"]').value = movie.img;
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {title, description, img} = Object.fromEntries(formData);

    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({title, description, img})
        }

        await fetch(`${baseUrl}/${id}`, options);
        homePage();
    } catch (error) {
        
    }
}