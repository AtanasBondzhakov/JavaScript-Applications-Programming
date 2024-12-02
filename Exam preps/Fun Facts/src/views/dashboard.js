import { html } from "../../node_modules/lit-html/lit-html.js";

import { getAllFacts } from "../services/data.js";

const dashboardTemplate = (facts) => html`
    <h2>Fun Facts</h2>
    <section id="dashboard">
        <!-- Display a div with information about every post (if any)-->
        ${facts.length > 0
            ? facts.map(fact => factTemplate(fact))
            : html`<h2>No Fun Facts yet.</h2>`
    }
    </section>
`;

const factTemplate = (fact) => html`
    <div class="fact">
        <img src=${fact.imageUrl} alt="example1" />
        <h3 class="category">${fact.category}</h3>
        <p class="description">${fact.description}</p>
        <a class="details-btn" href="/details/${fact._id}">More Info</a>
    </div>
`;

export const renderDashboard = async (ctx) => {
    const allFacts = await getAllFacts();
    ctx.render(dashboardTemplate(allFacts));
}