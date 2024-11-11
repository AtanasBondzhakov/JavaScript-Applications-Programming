import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllShows } from '../services/dataServices.js';

const dashboardTemplate = (shows) => html`
        <h2>Users Recommendations</h2>
        <section id="shows">
          ${shows.length === 0
            ? html`<h2 id="no-show">No shows Added.</h2>`
            : shows.map(show => showTemplate(show))}
      
`;

const showTemplate = (show) => html`
    <div class="show">
        <img src="${show.imageUrl}" alt="example1" />
        <div class="show-info">
          <h3 class="title">${show.title}</h3>
          <p class="genre">Genre: ${show.genre}</p>
          <p class="country-of-origin">Country of Origin: ${show.country}</p>
          <a class="details-btn" href="/details/${show._id}">Details</a>
        </div>
    </div>
`;

export const renderDashboard = async (ctx) => {
    const shows = await getAllShows();
    ctx.render(dashboardTemplate(shows));
}