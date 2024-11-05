import { login } from "../services/userServices.js";
import { showView, updateNav } from "../util.js";

const loginSection = document.querySelector('div[data-section="login"]');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;

export function showLoginPage(ctx) {
    context = ctx;
    showView(loginSection);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {email, password} = Object.fromEntries(formData);

    try {
        if(!email || !password) {
            throw new Error('All fields are required');
        }

        await login(email, password);
        
        updateNav();
        context.goTo('/');
    } catch (error) {
        alert(error.message);
    }
}