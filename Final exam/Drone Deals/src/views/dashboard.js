import { html } from "../../node_modules/lit-html/lit-html.js";

import { getAllDrones } from "../services/data.js";

const dashboardTemplate = (drones) => html`
    <h3 class="heading">Marketplace</h3>
      <section id="dashboard">
 
        ${drones.length > 0
            ? drones.map(drone => droneTemplate(drone))
            : html`<h3 class="no-drones">No Drones Available</h3>`
        }
          
      </section>   
`;

const droneTemplate = (drone) => html`
    <div class="drone">
        <img src=${drone.imageUrl} alt="example1" />
        <h3 class="model">${drone.model}</h3>
        <div class="drone-info">
            <p class="price">Price: €${drone.price}</p>
            <p class="condition">Condition: ${drone.condition}</p>
            <p class="weight">Weight: ${drone.weight}g</p>
        </div>
        <a class="details-btn" href="/details/${drone._id}">Details</a>
    </div>
`;

export const renderDashboard = async (ctx) => {
    const allDrones = await getAllDrones();
    ctx.render(dashboardTemplate(allDrones));
}