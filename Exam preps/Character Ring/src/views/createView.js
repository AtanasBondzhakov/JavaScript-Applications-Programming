import { html } from '../../node_modules/lit-html/lit-html.js';

import { createCharacter } from '../services/dataServices.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form @submit=${onSubmit} class="create-form">
            <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
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
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            ></textarea>
            <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>
`;

export const renderCreate = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { category, 'image-url': imageUrl, description, 'additional-info': moreInfo } = Object.fromEntries(formData);

        if (!category || !imageUrl || !description || !moreInfo) {
            return alert('All fields are required');
        }

        const newCharacter = {
            category,
            imageUrl,
            description,
            moreInfo
        };

        await createCharacter(newCharacter);
        ctx.page.redirect('/dashboard');
    }

    ctx.render(createTemplate(onSubmit));
}