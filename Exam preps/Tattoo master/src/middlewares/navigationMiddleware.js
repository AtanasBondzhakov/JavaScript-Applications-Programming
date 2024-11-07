import { render } from "../../node_modules/lit-html/lit-html.js";

import { renderNavigation } from '../views/navigationView.js';

const rootEl = document.querySelector('header');

export const navigationMiddleware = (ctx, next) => { 
    render(renderNavigation(ctx), rootEl);
    next();
}