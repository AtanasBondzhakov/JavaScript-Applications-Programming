import { render } from '../../node_modules/lit-html/lit-html.js';

import { renderNavigation } from "../views/navigationView.js"

const header = document.querySelector('header');

export const navigationMiddleware = (ctx, next) => {
    render(renderNavigation(ctx), header);
    next();
}