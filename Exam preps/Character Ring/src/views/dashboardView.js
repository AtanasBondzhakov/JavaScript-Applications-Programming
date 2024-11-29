import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllCharacters } from '../services/dataServices.js';

const dashboardTemplate = (characters) => html`
        <h2>Characters</h2>
        <section id="characters"> 
            ${characters.length > 0
                ? characters.map(character => characterTemplate(character))
                : html`<h2>No added Heroes yet.</h2>` 
            }   
        </section>    
`;

const characterTemplate = (character) => html`
    <div class="character">
        <img src=${character.imageUrl} alt="example1" />
        <div class="hero-info">
            <h3 class="category">${character.category}</h3>
            <p class="description">${character.description}</p>
            <a class="details-btn" href="/details/${character._id}">More Info</a>
        </div>
    </div>
`;

export const renderDashboard = async (ctx) => {
    const allCharacters = await getAllCharacters();
    ctx.render(dashboardTemplate(allCharacters));
}