import { html } from '../../node_modules/lit-html/lit-html.js';

import { searchShow } from '../services/dataServices.js';

const searchTemplate = (onSubmit, results) => html`
    <section id="search">
        <div class="form">
          <h2>Search</h2>
          <form @submit=${onSubmit} class="search-form">
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4>Results:</h4>
        <div class="search-result">
            
            ${renderResults(results)}
         
        </div>
    </section>
`;

const resultShowTemplate = (show) => html`
    <div class="show">
        <img src=${show.imageUrl} alt="example1" />
        <div class="show">
          <h3 class="title">${show.title}</h3>
          <p class="genre">Genre: ${show.genre}</p>
          <p class="country-of-origin">Country of Origin: ${show.country}</p>
          <a class="details-btn" href="/details/${show._id}">Details</a>
        </div>
    </div>    
`;

export const renderSearch = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const searchText = new FormData(e.currentTarget).get('search');

        if(!searchText) {
            return alert('Search field cannot be empty!');
        }
        
        const results = await searchShow(searchText);
        
        ctx.render(searchTemplate(onSubmit, results));
    }

    ctx.render(searchTemplate(onSubmit));
}

function renderResults(results) {
    if (!results || results.length === 0) {
        return html`<p class="no-result">There is no TV show with this title</p>`;
    }

    return html`${results.map(show => resultShowTemplate(show))}`;
}