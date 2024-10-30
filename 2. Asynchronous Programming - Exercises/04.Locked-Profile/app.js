function lockedProfile() {
    const rootEl = document.querySelector('#main');

    const url = 'http://localhost:3030/jsonstore/advanced/profiles'

    fetch(url)
        .then(response => response.json())
        .then(data => {
            rootEl.innerHTML = ''
            Object.values(data).forEach(el => createProfile(el))
        })

    function createProfile(data) {
        const divEl = createEl('div', { class: 'profile' });

        const img = createEl('img', { src: './iconProfile2.png', class: 'userIcon' });
        divEl.appendChild(img);

        divEl.appendChild(createEl('label', {}, 'Lock'));
        const inputLock = createEl('input', {
            type: 'radio',
            name: `user${data._id}Locked`,
            value: 'lock',
            checked: true
        });

        divEl.appendChild(inputLock);

        divEl.appendChild(createEl('label', {}, 'Unlock'));
        const inputUnlock = createEl('input', {
            type: 'radio',
            name: `user1Locked`,
            value: 'unlock'
        });
        divEl.appendChild(inputUnlock);

        divEl.appendChild(document.createElement('br'));
        divEl.appendChild(document.createElement('hr'));

        divEl.appendChild(createEl('label', {}, 'Username'));
        divEl.appendChild(createEl('input', {
            type: 'text',
            name: `user1Username`,
            value: data.username,
            disabled: true,
            readOnly: true
        }));

        const divHiddenEl = createEl('div', { id: `user1HiddenFields`, style: 'display: none' });
        divHiddenEl.appendChild(document.createElement('hr'));

        divHiddenEl.appendChild(createEl('label', {}, 'Email:'));
        divHiddenEl.appendChild(createEl('input', {
            type: 'email',
            name: `user1Email`,
            value: data.email,
            disabled: true,
            readOnly: true
        }));

        divHiddenEl.appendChild(createEl('label', {}, 'Age:'));
        divHiddenEl.appendChild(createEl('input', {
            type: 'number',
            name: `user1Age`,
            value: data.age,
            disabled: true,
            readOnly: true
        }));

        divEl.appendChild(divHiddenEl);

        const showMoreBtn = createEl('button', {}, 'Show more');
        showMoreBtn.addEventListener('click', () => {
            if (inputUnlock.checked) {
                if (divHiddenEl.style.display === 'none') {
                    divHiddenEl.style.display = 'block';
                    showMoreBtn.textContent = 'Hide it';
                } else {
                    divHiddenEl.style.display = 'none';
                    showMoreBtn.textContent = 'Show more';
                }
            }
        });
        divEl.appendChild(showMoreBtn);

        rootEl.appendChild(divEl);
    }

    function createEl(tag, attributes = {}, text = '') {
        const element = document.createElement(tag);

        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }

        if (text) {
            element.textContent = text;
        }

        return element;
    }
}