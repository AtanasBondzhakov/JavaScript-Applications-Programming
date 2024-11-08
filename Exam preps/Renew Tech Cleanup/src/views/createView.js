import { html } from "../../node_modules/lit-html/lit-html.js";

import { createSolution } from "../services/dataServices.js";

const createTemplate = (onSubmit) => html`
    <section id="create">
      <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Add Solution</h2>
        <form @submit=${onSubmit} class="create-form">
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Solution Type"
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          ></textarea>
          <textarea
            id="more-info"
            name="more-info"
            placeholder="more Info"
            rows="2"
            cols="10"
          ></textarea>
          <button type="submit">Add Solution</button>
        </form>
      </div>
    </section>
`;

export const renderCreate = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { type, 'image-url': imageUrl, description, 'more-info': learnMore } = Object.fromEntries(formData);

        if (!type || !imageUrl || !description || !learnMore) {
            return alert('All fields are required');
        }

        await createSolution({ type, imageUrl, description, learnMore });
        ctx.page.redirect('/dashboard');
    }
    
    ctx.render(createTemplate(onSubmit));
}