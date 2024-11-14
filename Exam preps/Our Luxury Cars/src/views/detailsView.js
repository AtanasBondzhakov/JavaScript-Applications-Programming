import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteCar, getCarById } from '../services/dataServices.js';
import { getUserData, hasOwner } from '../utils.js';

const detailsTemplate = (car, hasUser, isOwner) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${car.imageUrl} alt="example1" />
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: €${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">
                  ${car.about}</p>
              </div>
            
                ${hasUser
                    ? html`
                        ${isOwner
                            ? html`<div id="action-buttons">
                                        <a href="/edit/${car._id}" id="edit-btn">Edit</a>
                                         <a href="" @click=${onDelete} id="delete-btn">Delete</a>
                                    </div>`
                            : null}`
                    : null}
            </div>
          </div>
        </section>
`;

let carId;
let context;

export const renderDetails = async (ctx) => {
    carId = ctx.params.id;
    context = ctx;

    const car = await getCarById(carId);

    const userId = ctx.user?._id;
    const ownerId = car._ownerId;

    const hasUser = !!getUserData();
    const isOwner = hasOwner(userId, ownerId);

    ctx.render(detailsTemplate(car, hasUser, isOwner));
}

async function onDelete() {
    if (confirm('Are you sure you want to delete this car?')) {
        await deleteCar(carId);
        context.page.redirect('/dashboard');
    }
}