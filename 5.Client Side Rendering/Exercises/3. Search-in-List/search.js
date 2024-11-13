import { html, render } from './node_modules/lit-html/lit-html.js';

import { towns } from './towns.js';

const root = document.querySelector('#towns');
const input = document.querySelector('#searchText');
const resultRef = document.querySelector('#result');

document.querySelector('button').addEventListener('click', onSearch);

const createList = (towns, filtered) => html`
    <ul>
        ${towns.map(town => html`<li class=${filtered?.includes(town) ? 'active' : ''} >${town}</li>`)}
    </ul>
`;

render(createList(towns), root);

function onSearch(e) {
    if (!input.value) {
        return;
    }

    const filtered = towns.filter(t => t.includes(input.value));

    render(createList(towns, filtered), root);

    resultRef.textContent = `${filtered.length} matches found`;
}