import { html, render } from './node_modules/lit-html/lit-html.js';

import { cats } from './catSeeder.js'

const root = document.querySelector('#allCats');

const catCardTemplate = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${toggle} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

const createList = (cats) => html`
    <ul>
        ${cats.map(cat => catCardTemplate(cat))}
    </ul>        
`;

function toggle(e) {
    if(e.target.textContent === 'Show status code') {
        e.target.nextElementSibling.style.display = 'block';
        e.target.textContent = 'Hide status code';
    } else {
        e.target.nextElementSibling.style.display = 'none';
        e.target.textContent = 'Show status code'
    }
}

render(createList(cats), root);