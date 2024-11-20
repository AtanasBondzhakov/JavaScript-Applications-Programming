import { render } from "../../node_modules/lit-html/lit-html.js";

import { renderNavigation } from "../views/navigationView.js";

const root = document.querySelector('header');

export const navigationMiddleware = (ctx, next) => {
    render(renderNavigation(ctx), root);
    next();
}