import { showView } from "./util.js";

const baseUrl = 'http://localhost:3030/users/register';

const registerSection = document.querySelector('#form-sign-up');
const form = registerSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(registerSection);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    await register(email, password, repeatPassword);
}

async function register(email, password, repeatPassword) {
    try {
        if(!email || !password || !repeatPassword) {
            throw new Error('All fields are required');
        }
        if(password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }
        
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
