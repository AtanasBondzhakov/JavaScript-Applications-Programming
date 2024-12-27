import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import { notify } from "../notify.js";
import { editDrone, getDrone } from "../services/data.js";

const editTemplate = (drone, onSubmit) => html`
    <section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" .value=${drone.model} />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value=${drone.imageUrl}/>
            <input type="number" name="price" id="price" placeholder="Price" .value=${drone.price}/>
            <input type="number" name="weight" id="weight" placeholder="Weight" .value=${drone.weight}/>
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value=${drone.phone} />
            <input type="text" name="condition" id="condition" placeholder="Condition" .value=${drone.condition} />
            <textarea name="description" id="description" placeholder="Description" .value=${drone.description} ></textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`;

export const renderEdit = async (ctx) => {
    const droneId = ctx.params.id;
    const drone = await getDrone(droneId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(formData);

        if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
            return notify('All fields are required');
        }

        await editDrone(droneId, { model, imageUrl, price, condition, weight, phone, description });
        ctx.page.redirect(`/details/${droneId}`);
    }
    console.log(drone

    );
    

    ctx.render(editTemplate(drone, onSubmit));
}