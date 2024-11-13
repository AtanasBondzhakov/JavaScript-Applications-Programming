import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllItems } from '../services/dataServices.js';

const dashboardTemplate = (items) => html`
        <h3 class="heading">Market</h3>
        <section id="dashboard">        
          ${items.length === 0
            ? html`<h3 class="empty">No Items Yet</h3>`
            : items.map(item => itemTemplate(item))
            }
        </section>
`;

const itemTemplate = (item) => html`
    <div class="item">
        <img src=${item.imageUrl} />
        <h3 class="model">${item.item}</h3>
        <div class="item-info">
          <p class="price">Price: €${item.price}</p>
          <p class="availability">
            ${item.availability}
          </p>
          <p class="type">Type: ${item.type}</p>
        </div>
        <a class="details-btn" href="/details/${item._id}">Uncover More</a>
    </div>
`;

export const renderDashboard = async (ctx) => {
    const items = await getAllItems();
    ctx.render(dashboardTemplate(items))
}