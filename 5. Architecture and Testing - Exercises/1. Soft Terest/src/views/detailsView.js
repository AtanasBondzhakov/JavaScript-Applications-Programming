import { deleteIdea, getIdea } from "../services/dataServices.js";
import { getUser, hasOwner } from "../services/userUtils.js";
import { showView } from "../util.js";

const detailsSection = document.querySelector('div[data-section="details"]');

let context = null;

export async function showDetailsPage(ctx, id) {
    context = ctx;
    const user = getUser();

    showView(detailsSection);

    const idea = await getIdea(id);
    const isOwner = hasOwner(user?._id, idea._ownerId);

    renderDetails(idea, isOwner);
}

function renderDetails(idea, isOwner) {
    const img = createElement('img', 'det-img', null, idea.img);

    const divDesc = createElement('div', 'desc',);
    divDesc.appendChild(createElement('h2', 'display-5', idea.title));
    divDesc.appendChild(createElement('p', 'infoType', 'Description:'));
    divDesc.appendChild(createElement('p', 'idea-description', idea.description));

    const divCenter = createElement('div', 'text-center');

    const aEl = createElement('a');
    if (isOwner) {
        aEl.className = 'btn detb';
        aEl.href = '';
        aEl.textContent = 'Delete';
        aEl.dataset.id = idea._id;
        
        divCenter.appendChild(aEl);
    }
    aEl.addEventListener('click', onDelete);

    detailsSection.replaceChildren(img, divDesc, divCenter);
}

async function onDelete(e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    await deleteIdea(id);
    context.goTo('/dashboard');
}

function createElement(type, cssClass, content, imgSrc) {
    const element = document.createElement(type);
    if (cssClass) {
        element.className = cssClass;
    }
    element.textContent = content;

    if (imgSrc) {
        element.src = imgSrc;
    }

    return element;
}