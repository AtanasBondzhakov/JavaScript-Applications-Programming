import { html } from "../../node_modules/lit-html/lit-html.js";

import { editFact, getFact } from "../services/data.js";

const editTemplate = (onSubmit, fact) => html`
    <section id="edit">
        <div class="form">
        <h2>Edit Fact</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            .value=${fact.category}
        />
        <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            .value=${fact.imageUrl}
        />
        <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${fact.description}
        ></textarea>
        <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${fact.moreInfo}
        ></textarea>
            <button type="submit">Post</button>
        </form>
        </div>
    </section>
`;

export const renderEdit = async (ctx) => {
    const factId = ctx.params.id;
    const fact = await getFact(factId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { category, 'image-url': imageUrl, description, 'additional-info': moreInfo } = Object.fromEntries(formData);

        if (!category || !imageUrl || !description || !moreInfo) {
            return alert('All fields are required')
        }

        await editFact(factId, {category, imageUrl, description, moreInfo});
        ctx.page.redirect(`/details/${factId}`);
    }

    ctx.render(editTemplate(onSubmit, fact));
}