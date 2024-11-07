import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllTattoo } from "../services/dataServices.js";

const dashboardTemplate = (tattoos) => html`
        <h2>Collection</h2>
        <section id="tattoos">
            ${tattoos.length === 0
                ? html`<h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>`
                : tattoos.map(tattoo => tattooTemplate(tattoo))}
        </section>     
`;

const tattooTemplate = (tattoo) => html`
<div class="tattoo">
    <img src=${tattoo.imageUrl} alt="example3" />
    <div class="tattoo-info">
      <h3 class="type">${tattoo.type}</h3>
      <span>Uploaded by </span>
      <p class="user-type">${tattoo.userType}</p>
      <a class="details-btn" href="/details/${tattoo._id}">Learn More</a>
    </div>
</div>
`;

export const renderDashboard = async (ctx) => {
    const tattoos = await getAllTattoo();
    ctx.render(dashboardTemplate(tattoos));
}