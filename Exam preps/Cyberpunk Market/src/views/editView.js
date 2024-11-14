import { html } from '../../node_modules/lit-html/lit-html.js';

import { editItem, getItemById } from '../services/dataServices.js';
import { notify } from '../notify.js';

const editTemplate = (item, onSubmit) => html`
    <section id="edit">
        <div class="form form-item">
        <h2>Edit Your Item</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="item" id="item" placeholder="Item" .value=${item.item} />
            <input
            type="text"
            name="imageUrl"
            id="item-image"
            placeholder="Your item Image URL"
            .value=${item.imageUrl}
            />
            <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro"
            .value=${item.price}
            />
            <input
            type="text"
            name="availability"
            id="availability"
            placeholder="Availability Information"
            .value=${item.availability}
            />
            <input
            type="text"
            name="type"
            id="type"
            placeholder="Item Type"
            .value=${item.type}
            />
            <textarea
            id="description"
            name="description"
            placeholder="More About The Item"
            rows="10"
            cols="50"
            .value=${item.description}
            ></textarea>
            <button type="submit">Edit</button>
        </form>
        </div>
    </section>
`;

export const renderEdit = async (ctx) => {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { item, imageUrl, price, availability, type, description } = Object.fromEntries(formData);

        if (!item || !imageUrl || !price || !availability || !type || !description) {
            return notify('All fields are required');
        }

        await editItem(itemId, { item, imageUrl, price, availability, type, description });
        ctx.page.redirect(`/details/${itemId}`);

    }

    ctx.render(editTemplate(item, onSubmit));
}