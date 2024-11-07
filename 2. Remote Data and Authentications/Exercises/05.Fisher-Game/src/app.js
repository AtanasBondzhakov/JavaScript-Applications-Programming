const endpoints = {
    catches: 'http://localhost:3030/data/catches',
    logout: 'http://localhost:3030/users/logout',
}

const userNav = document.querySelector('#user');
const guestNav = document.querySelector('#guest');
const greeting = document.querySelector('nav p span');

const catches = document.querySelector('#catches');
const addBtn = document.querySelector('button.add');
const addForm = document.querySelector('#addForm');

addForm.addEventListener('submit', onSubmit);

const loadBtn = document.querySelector('.load');
loadBtn.addEventListener('click', handleLoadClick);

const userData = JSON.parse(localStorage.getItem('userData'));
const token = userData ? userData.accessToken : null;

if (token) {
    guestNav.style.display = 'none';
    addBtn.removeAttribute('disabled');
    greeting.textContent = userData.email;
} else {
    userNav.style.display = 'none';
    greeting.textContent = 'guest';
}


async function handleLoadClick() {
    catches.replaceChildren();

    try {
        const response = await fetch(endpoints.catches);
        const data = await response.json();

        data.forEach(fish => {

            const isOwner = userData?._id === fish._ownerId;
            const newFish = renderCatch(fish, isOwner);
            catches.appendChild(newFish);
        });
    } catch (error) {
        alert(error.message);
    }
}

document.querySelector('#logout').addEventListener('click', async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    };

    try {
        const response = await fetch(endpoints.logout, options);
        localStorage.clear();
        location.href = 'index.html';
        return response;

    } catch (error) {
        alert(error.message);
    }
})

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    } = Object.fromEntries(formData);

    try {
        if (!angler || !weight || !species || !location || !bait || !captureTime) {
            throw new Error('All fields are required');
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
        };

        await fetch(endpoints.catches, options);

        addForm.reset();
        handleLoadClick();
    } catch (error) {
        alert(error.message);
    }
}

function renderCatch(data, isOwner) {
    const divCatch = document.createElement('div');
    divCatch.classList.add('catch');

    divCatch.appendChild(createLabelEl('Angler'));
    divCatch.appendChild(createInputEl('text', 'angler', data.angler));

    divCatch.appendChild(createLabelEl('Weight'));
    divCatch.appendChild(createInputEl('text', 'weight', data.weight));

    divCatch.appendChild(createLabelEl('Species'));
    divCatch.appendChild(createInputEl('text', 'species', data.species));

    divCatch.appendChild(createLabelEl('Location'));
    divCatch.appendChild(createInputEl('text', 'location', data.location));

    divCatch.appendChild(createLabelEl('Bait'));
    divCatch.appendChild(createInputEl('text', 'bait', data.bait));

    divCatch.appendChild(createLabelEl('Capture Time'));
    divCatch.appendChild(createInputEl('number', 'captureTime', data.captureTime));

    const updateBtn = document.createElement('button');
    updateBtn.dataset.id = data._id;
    updateBtn.classList.add('update');
    updateBtn.textContent = 'Update';

    updateBtn.addEventListener('click', handleUpdateClick);

    const deleteBtn = document.createElement('button');
    deleteBtn.dataset.id = data._id;
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        };

        await fetch(`${endpoints.catches}/${id}`, options);
        handleLoadClick();
    })

    if (!isOwner) {
        updateBtn.setAttribute('disabled', 'disabled');
        deleteBtn.setAttribute('disabled', 'disabled');
    }

    divCatch.appendChild(updateBtn);
    divCatch.appendChild(deleteBtn);

    return divCatch;
}

async function handleUpdateClick(e) {
    const id = e.target.dataset.id;

    const inputs = Array.from(e.target.parentElement.querySelectorAll('input'));
    const [angler, weight, species, location, bait, captureTime] = inputs;

    const updatedCatch = {
        angler: angler.value,
        weight: weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: captureTime.value
    }

    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(updatedCatch)
        };

        await fetch(`${endpoints.catches}/${id}`, options);
    } catch (error) {
        alert(error.message);
    }
}

function createInputEl(type, className, value) {
    const element = document.createElement('input');
    element.type = type;
    element.classList.add(className);
    element.value = value;

    return element;
}

function createLabelEl(content) {
    const element = document.createElement('label');
    element.textContent = content;

    return element;
}