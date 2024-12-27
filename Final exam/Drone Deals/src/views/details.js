import { html } from "../../node_modules/lit-html/lit-html.js";

import { deleteDrone, getDrone } from "../services/data.js";
import { hasOwner } from "../utils.js";

const detailsTemplate = (drone, isCreator) => html`
    <section id="details">
        <div id="details-wrapper">
        <div>
            <img id="details-img" src=${drone.imageUrl} alt="example1" />
            <p id="details-model">${drone.model}</p>
        </div>
        <div id="info-wrapper">
            <div id="details-description">
            <p class="details-price">Price: €${drone.price}</p>
            <p class="details-condition">Condition: ${drone.condition}</p>
            <p class="details-weight">Weight: ${drone.weight}g</p>
            <p class="drone-description">
                ${drone.description}
            </p>
            <p class="phone-number">Phone: ${drone.phone}</p>
            </div>

            <div class="buttons">
                ${isCreator 
                    ? html`
                        <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
                        <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
                    : null
                }
            </div>
        </div>
        </div>
    </section>
`;

let context = null;
let droneId = null;

export const renderDetails = async (ctx) => {
    droneId = ctx.params.id;
    context = ctx;

    const userId = ctx.user?._id;

    const drone = await getDrone(droneId);
    const ownerId = drone._ownerId;

    // const hasUser = !!getUserData();
    const isCreator = hasOwner(userId, ownerId);

    // const likes = await getTotalLikes(factId);
    // const hasLiked = await isLiked(factId, userId);

    ctx.render(detailsTemplate(drone, isCreator));
}

const onDelete = async () => {
    if (confirm('Are you sure you want to delete this drone?')) {
        await deleteDrone(droneId);
        context.page.redirect('/dashboard');
    }
}