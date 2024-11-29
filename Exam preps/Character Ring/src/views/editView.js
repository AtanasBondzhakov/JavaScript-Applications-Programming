import { html } from '../../node_modules/lit-html/lit-html.js';

import { editCharacter, getCharacterById } from '../services/dataServices.js';

const editTemplate = (character, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form @submit=${onSubmit} class="edit-form">
            <input
            type="text"
            name="category"
            id="category"
            placeholder="Character Type"
            .value=${character.category}
            />
            <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            .value=${character.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
            .value=${character.description}
        ></textarea>
        <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            .value=${character.moreInfo}
        ></textarea>
            <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>
`;

export const renderEdit = async (ctx) => {
    const characterID = ctx.params.id;
    const character = await getCharacterById(characterID);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { category, 'image-url': imageUrl, description, 'additional-info': moreInfo } = Object.fromEntries(formData);

        if (!category || !imageUrl || !description || !moreInfo) {
            return alert('All fields are required');
        }

        const characterUpdates = {
            category,
            imageUrl,
            description,
            moreInfo
        }

        await editCharacter(characterID, characterUpdates);
        ctx.page.redirect(`/details/${characterID}`);
    }

    ctx.render(editTemplate(character, onSubmit));
}