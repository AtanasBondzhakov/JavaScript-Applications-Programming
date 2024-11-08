import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllSolutions } from '../services/dataServices.js';

const dashboardTemplate = (solutions) => html`
        <h2>Solutions</h2>
        <section id="solutions">
          <!-- Display a div with information about every post (if any)-->
          
         ${solutions.length === 0
            ? html`<h2 id="no-solution">No Solutions Added.</h2>`
            : solutions.map(solution => solutionTemplate(solution))}
         }
     
        </section>

`;

const solutionTemplate = (solution) => html`
    <div class="solution">
        <img src=${solution.imageUrl} alt="example1" />
        <div class="solution-info">
            <h3 class="type">${solution.type}</h3>
            <p class="description">
            ${solution.description}
            </p>
            <a class="details-btn" href="/details/${solution._id}">Learn More</a>
        </div>
    </div>
`;

export const renderDashboard = async (ctx) => {
    const solutions = await getAllSolutions();

    ctx.render(dashboardTemplate(solutions));
}