import { html } from "../../node_modules/lit-html/lit-html.js";

import { notify } from "../notify.js";
import { createDrone } from "../services/data.js";

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form form-item">
        <h2>Add Drone Offer</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
            <button type="submit">Add</button>
        </form>
        </div>
    </section>
`;

export const renderCreate = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(formData);

        if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
            return notify('All fields are required');
        }

        await createDrone({ model, imageUrl, price, weight, phone, condition, description });
        ctx.page.redirect('/dashboard');
    }

    ctx.render(createTemplate(onSubmit));
}