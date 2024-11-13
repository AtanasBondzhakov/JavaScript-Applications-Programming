import { html, render } from "./node_modules/lit-html/lit-html.js";

async function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/table';

    const container = document.querySelector('.container tbody');
    const input = document.querySelector('#searchField');

    document.querySelector('#searchBtn').addEventListener('click', onClick);

    const response = await fetch(baseUrl);
    const result = await response.json();

    const usersData = Object.values(result);

    const renderTable = (usersData, filteredUsers) => html`
        ${usersData.map(user => html`
        <tr class=${filteredUsers?.includes(user) ? 'select' : ''}>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.course}</td>
        </tr>  
        `)}
    `;

    render(renderTable(usersData), container)

    function onClick() {
        const searchedText = input.value.toLowerCase();

        if (!searchedText) {
            return;
        }

        const filteredUsers = usersData.filter(user => {
            return Object.values(user).some(value => {
                return value.toLowerCase().includes(searchedText);
            })
        });

        input.value = '';
        render(renderTable(usersData, filteredUsers), container);
    }
}

solve();