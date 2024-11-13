import { html, render } from './node_modules/lit-html/lit-html.js';

const baseUrl = 'http://localhost:3030/jsonstore/collections';
const rootEl = document.querySelector('tbody');

document.querySelector('#loadBooks').addEventListener('click', getAllBooks)

const addForm = document.querySelector('#add-form');
addForm.addEventListener('submit', createBook);

const editForm = document.querySelector('#edit-form');
editForm.style.display = 'none';

const bookRowsTemplate = (books) => html`
    ${books.map(([id, book]) => html`
        <tr id=${id}>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button @click=${onEdit}>Edit</button>
                <button @click=${onDelete}>Delete</button>
            </td>
        </tr>
    `)}
`;

async function getAllBooks() {
    const books = await requester('GET', '/books');
    render(bookRowsTemplate(Object.entries(books)), rootEl);
}

async function createBook(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        return alert('All fields are required');
    }

    await requester('POST', '/books', { title, author });
    e.target.reset();
}

async function onDelete(e) {
    const bookId = e.target.parentElement.parentElement.id;
    await requester('DELETE', `/books/${bookId}`);
}

async function onEdit(e) {
    addForm.style.display = 'none';
    editForm.style.display = 'block';

    const bookId = e.target.parentElement.parentElement.id;
    const book = await requester('GET', `/books/${bookId}`);

    editForm.querySelector('input[name="title"]').value = book.title;
    editForm.querySelector('input[name="author"]').value = book.author;

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { title, author } = Object.fromEntries(formData);

        await requester('PUT', `/books/${bookId}`, { title, author });
        editForm.reset();

        editForm.style.display = 'none';
        addForm.style.display = 'block';
    })
}

async function requester(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(baseUrl + url, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        alert(error);
        throw error;
    }
}