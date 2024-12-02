import { render } from "../../node_modules/lit-html/lit-html.js";

const rootEl = document.querySelector('main');

export const renderMiddleware = (ctx, next) => {
    ctx.render = templateResult => render(templateResult, rootEl);
    next();
}