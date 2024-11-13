import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.querySelector('#root');

document.querySelector('form').addEventListener('submit', loadTowns);

const createList = (towns) => html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
`;

function loadTowns(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const towns = formData.get('towns').split(', ');

    render(createList(towns), root)
}