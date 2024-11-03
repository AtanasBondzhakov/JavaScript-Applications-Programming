const baseUrl = 'http://localhost:3030/jsonstore/collections/books';

const formRef = document.querySelector('form');
const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const submitBtn = document.querySelector('form button');
const tableBody = document.querySelector('table tbody');
const loadBooksBtn = document.querySelector('#loadBooks');

loadBooksBtn.addEventListener('click', handleLoadBooks);

formRef.addEventListener('submit', handleCreateBook);

let currentId;

async function handleLoadBooks() {
    tableBody.replaceChildren();

    try {
        const response = await fetch(baseUrl);
        const resultData = await response.json();
        console.log(Object.entries(resultData));
        Object.entries(resultData).forEach(([id, info]) => {
            const newBook = createBookItem(id, info);
            tableBody.appendChild(newBook);
        });
    } catch (error) {
        alert(error.message);
    }

}

async function handleCreateBook(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        return;
    }

    try {
        if (submitBtn.textContent === 'Submit') {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, title })
            }

            const response = await fetch(baseUrl, options);
            const result = await response.json();

        } else if (submitBtn.textContent === 'Save') {
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, title })
            }

            const response = await fetch(`${baseUrl}/${currentId}`, options);
            const result = await response.json();
        }
    } catch (error) {
        alert(error.message);
    }

    formRef.reset();
}

function createBookItem(id, book) {
    const trEL = document.createElement('tr');
    const tdTitle = document.createElement('td');
    tdTitle.textContent = book.title;

    const tdAuthor = document.createElement('td');
    tdAuthor.textContent = book.author;

    const tdButtons = document.createElement('td');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.dataset.id = id;
    editBtn.dataset.title = book.title;
    editBtn.dataset.author = book.author;
    editBtn.addEventListener('click', handleEdit);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = id;
    deleteBtn.dataset.title = book.title;
    deleteBtn.dataset.author = book.author;
    deleteBtn.addEventListener('click', handleDelete);

    tdButtons.append(editBtn, deleteBtn);

    trEL.append(tdTitle, tdAuthor, tdButtons);

    return trEL;
}

function handleEdit(e) {
    currentId = e.target.dataset.id;

    titleInput.value = e.target.dataset.title;
    authorInput.value = e.target.dataset.author;
    document.querySelector('form h3').textContent = 'Edit FORM';
    submitBtn.textContent = 'Save';
}

async function handleDelete(e) {
    currentId = e.target.dataset.id;

    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        await fetch(`${baseUrl}/${currentId}`, options);
    } catch (error) {
        alert(error.message);
    }
}