import { render } from '../../node_modules/lit-html/lit-html.js';

const root = document.querySelector('.container');

export const renderMiddleware = (ctx, next) => {
    ctx.render = templateResult => render(templateResult, root);
    next();
}