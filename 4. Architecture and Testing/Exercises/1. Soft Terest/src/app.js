import { showHomePage } from "./views/homeView.js";
import { showLoginPage } from "./views/loginView.js";
import { showRegisterPage } from "./views/registerView.js";
import { showDashboardPage } from "./views/dashboardView.js";
import { showCreatePage } from "./views/createView.js";
import { showDetailsPage } from "./views/detailsView.js";

import { logout } from "./services/userServices.js";
import { updateNav } from "./util.js";

const routes = {
    '/': showHomePage,
    '/register': showRegisterPage,
    '/login': showLoginPage,
    '/logout': onLogout,
    '/dashboard': showDashboardPage,
    '/create': showCreatePage,
    '/details': showDetailsPage,
}

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('div[data-section="register"] a').addEventListener('click', onNavigate);
document.querySelector('div[data-section="login"] a').addEventListener('click', onNavigate);
document.querySelector('div[data-section="home"] a').addEventListener('click', onNavigate);

function onNavigate(e) {
    e.preventDefault();

    let target = e.target;

    if (e.target.tagName !== "A") {
        target = e.target.parentElement;
    }

    if (!target.href) {
        return;
    }

    const url = new URL(target.href);
    const viewName = url.pathname;

    goTo(viewName);
}

const ctx = {
    goTo,
}

function goTo(viewName, ...params) {
    const handler = routes[viewName];
    handler(ctx, params);
}

async function onLogout(ctx) {
    await logout();
    updateNav();
    ctx.goTo('/');
}

goTo('/');
updateNav();