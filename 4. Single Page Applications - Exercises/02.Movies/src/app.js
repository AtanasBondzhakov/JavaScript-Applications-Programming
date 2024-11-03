import { homePage } from "./homeView.js";
import {loginPage} from "./loginView.js";
import {registerPage} from "./registerView.js";
import {createPage} from "./createView.js";
import { updateNav } from "./util.js";
import { editPage } from "./editView.js";

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logoutPage,
    '/register': registerPage,
    '/create': createPage,
    '/edit': editPage
};

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

function onNavigate(e) {
    if(e.target.tagName === 'A' && e.target.href) {
        e.preventDefault();
        const url = new URL(e.target.href);

        const view = routes[url.pathname];
        if(typeof view === 'function') {
            view();
        }
    }
}

function logoutPage() {
    localStorage.removeItem('user');
    updateNav();
}

updateNav();
homePage();