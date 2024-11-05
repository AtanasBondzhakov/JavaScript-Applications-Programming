import { register } from "../services/userServices.js";
import { showView, updateNav } from "../util.js";

const registerSection = document.querySelector('div[data-section="register"]');
const form = registerSection.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;

export function showRegisterPage(ctx) {
    context = ctx;
    showView(registerSection);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    try {
        if(!email || !password || !repeatPassword) {
            throw new Error('All fields are required');
        }

        if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }

        if(email.length < 3) {
            throw new Error('Email should be at least 3 characters long');
        }

        if (password.length < 3) {
            throw new Error('Password should be at least 3 characters long');
        }

        await register(email, password);
        
        updateNav();
        context.goTo('/');
    } catch (error) {
        alert(error.message);
    }
}