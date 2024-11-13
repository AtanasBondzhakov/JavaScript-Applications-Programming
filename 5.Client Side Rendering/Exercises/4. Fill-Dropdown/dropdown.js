import { html, render } from './node_modules/lit-html/lit-html.js';

const baseUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';

const input = document.querySelector('#itemText');
const optionMenu = document.querySelector('#menu')

document.querySelector('form').addEventListener('submit', addItem);

const getOptions = async () => {
    const response = await fetch(baseUrl);
    return await response.json();
}

const optionsResult = Object.values(await getOptions());

const renderOptions = (data) => html`
    ${data.map(el => html`<option value=${el._id}>${el.text}</option>`)}
`;

render(renderOptions(optionsResult), optionMenu);

async function addItem(e) {
    e.preventDefault();

    const data = {
        text: input.value
    }

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

        const result = await response.json();
        optionsResult.push(result);

        input.value = '';

    render(renderOptions(optionsResult), optionMenu);
}