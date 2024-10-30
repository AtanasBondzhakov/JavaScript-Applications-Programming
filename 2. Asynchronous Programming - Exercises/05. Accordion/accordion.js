const articlesListUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
const articleDetailsUrl = `http://localhost:3030/jsonstore/advanced/articles/details`;

async function solution() {
    const mainEl = document.querySelector('#main');

    const response = await fetch(articlesListUrl);
    const result =  await response.json();

    result.forEach(article => {
        const newArticle = createAccordion(article);
        mainEl.appendChild(newArticle);
    })
}

function createAccordion(data) {
    const divAccordion = createElement('div', 'accordion');

    const divHead = createElement('div', 'head');
    divHead.appendChild(createElement('span', null, data.title));

    const showMoreBtn = createElement('button', 'button', 'More', data._id);
    showMoreBtn.addEventListener('click', showMoreInfoHandler);

    divHead.appendChild(showMoreBtn);

    const divExtra = createElement('div', 'extra');
    divExtra.appendChild(createElement('p'));

    divAccordion.append(divHead, divExtra);
    
    return divAccordion;
}

async function showMoreInfoHandler(e) {
    const id = e.target.id;
    const hiddenDiv = e.target.parentElement.parentElement.querySelector('div.extra');

    const response = await fetch(`${articleDetailsUrl}/${id}`);
    const result = await response.json();

    hiddenDiv.style.display = hiddenDiv.style.display === 'block' ? 'none' : 'block';
    e.target.textContent = e.target.textContent === 'More' ? 'Less' : 'More';

    hiddenDiv.querySelector('p').textContent = result.content;
}

function createElement(type, className, content, id) {
    const element = document.createElement(type);
    if(className) {
        element.classList.add(className);
    }
    element.textContent = content;

    if(id) {
        element.id = id;
    }

    return element;
}

solution()