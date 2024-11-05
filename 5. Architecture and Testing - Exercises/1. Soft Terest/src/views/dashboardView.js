import { getAllIdeas } from "../services/dataServices.js";
import { showView } from "../util.js";

const dashboardSection = document.querySelector('div[data-section="dashboard"]');

let context = null;

export function showDashboardPage(ctx) {
    context = ctx;
    dashboardSection.replaceChildren();
    showView(dashboardSection);
    renderDashboard();
}

async function renderDashboard() {
    const ideas = await getAllIdeas();

    if (ideas.length === 0) {
        const h1El = document.createElement('h1');
        h1El.textContent = 'No ideas yet! Be the first one :)';

        return dashboardSection.replaceChildren(h1El);
    }

    ideas.forEach(idea => {
        const currIdea = createIdeaCard(idea);
        dashboardSection.appendChild(currIdea);
    });
}

function createIdeaCard(idea) {
    const div = document.createElement('div');
    div.className = 'card overflow-hidden current-card details';
    div.style = 'width: 20rem; height: 18rem;';
    div.dataset.id = idea._id;
    div.innerHTML = `
        <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;" data-id=${idea._id}>
            <div class="card-body">
                <p class="card-text">${idea.title}</p>
            </div>
            <img class="card-image" src=${idea.img} alt="Card image cap">
            <a class="btn" data-id=${idea._id} href="/details/${idea._id}">Details</a>
        </div>
        `
    div.querySelector('a').addEventListener('click', onDetails);

    return div;
}


function onDetails(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    context.goTo('/details', id);
}