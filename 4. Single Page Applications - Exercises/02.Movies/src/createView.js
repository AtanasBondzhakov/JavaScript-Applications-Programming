import { homePage } from "./homeView.js";
import { showView } from "./util.js";

const baseUrl = 'http://localhost:3030/data/movies';

const createSection = document.querySelector('#add-movie');
const form = createSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    showView(createSection);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {title, description, img} = Object.fromEntries(formData);

    await createMovie(title, description, img);
    form.reset();
    homePage();
}

async function createMovie(title, description, img) {
    const user = JSON.parse(localStorage.getItem('user'));
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({title, description, img})
    };

    await fetch(baseUrl, options);
}

