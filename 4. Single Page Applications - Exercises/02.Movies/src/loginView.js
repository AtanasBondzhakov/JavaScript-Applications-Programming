import { homePage } from "./homeView.js";
import { showView, updateNav } from "./util.js";

const baseUrl = 'http://localhost:3030/users/login';

const loginSection = document.querySelector('#form-login');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onsubmit);

export function loginPage() {
    showView(loginSection);
}

async function onsubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { email, password } = Object.fromEntries(formData);

    await login(email, password);
    updateNav();
    homePage();
}

async function login(email, password) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }
        const response = await fetch(baseUrl, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        alert(error.message);
        throw error;
    }
}