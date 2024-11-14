import { html } from '../../node_modules/lit-html/lit-html.js';

import { createItem } from '../services/dataServices.js';
import { notify } from '../notify.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
      <div class="form form-item">
        <h2>Share Your item</h2>
        <form @submit=${onSubmit} class="create-form">
          <input type="text" name="item" id="item" placeholder="Item" />
          <input
            type="text"
            name="imageUrl"
            id="item-image"
            placeholder="Your item Image URL"
          />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro"
          />
          <input
            type="text"
            name="availability"
            id="availability"
            placeholder="Availability Information"
          />
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Item Type"
          />
          <textarea
            id="description"
            name="description"
            placeholder="More About The Item"
            rows="10"
            cols="50"
          ></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
`;

export const renderCreate = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { item, imageUrl, price, availability, type, description } = Object.fromEntries(formData);

        if (!item || !imageUrl || !price || !availability || !type || !description) {
            return notify('All fields are required');
        }

        await createItem({ item, imageUrl, price, availability, type, description });
        ctx.page.redirect('/dashboard');
    }

    ctx.render(createTemplate(onSubmit));
}