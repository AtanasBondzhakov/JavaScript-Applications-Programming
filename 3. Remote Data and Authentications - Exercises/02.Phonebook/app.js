function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const loadBtn = document.querySelector('#btnLoad');
    const createBtn = document.querySelector('#btnCreate');
    const phonebookUl = document.querySelector('#phonebook');
    const personInput = document.querySelector('#person');
    const phoneInput = document.querySelector('#phone');

    loadBtn.addEventListener('click', handleLoadClick);
    createBtn.addEventListener('click', handleCreateClick);


    async function handleLoadClick() {
        phonebookUl.replaceChildren();

        try {
            const response = await fetch(baseUrl);
            const result = await response.json();

            Object.values(result).forEach(el => {
                const liEl = document.createElement('li');
                liEl.textContent = `${el.person}: ${el.phone}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.dataset.id = el._id;
                deleteBtn.addEventListener('click', handleDeleteClick);

                liEl.appendChild(deleteBtn);
                phonebookUl.appendChild(liEl);
            });
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleDeleteClick(e) {
        const key = e.target.dataset.id;

        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        try {
            await fetch(`${baseUrl}/${key}`, options);

            handleLoadClick();
        } catch (error) {
            alert(error.message);
        }

    }

    async function handleCreateClick() {
        const person = personInput.value;
        const phone = phoneInput.value;

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        };

        try {
            await fetch(baseUrl, options);

            personInput.value = '';
            phoneInput.value = '';

            handleLoadClick();
        } catch (error) {
            alert(error.message);
        }
    }
}

attachEvents();