import { html, render } from './node_modules/lit-html/lit-html.js';

import { contacts } from './contacts.js';

const container = document.querySelector('#contacts');

const contactTemplate = (contact) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${contact.name}</h2>
            <button @click=${toggle} class="detailsBtn">Details</button>
            <div class="details" id=${contact.id}>
                <p>Phone number: ${contact.phoneNumber}</p>
                <p>Email: ${contact.email}</p>
            </div>
        </div>
    </div>
`;

function renderContacts(contacts) {
    return html`
        ${contacts.map(contact => contactTemplate(contact))}
    `
}

function toggle(e) {
    const detailsDiv = e.target.closest('.info').querySelector('.details');
    detailsDiv.style.display = (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') ? 'block' : 'none';
}

render(renderContacts(contacts), container);