import { html } from '../../node_modules/lit-html/lit-html.js';

import { editShow, getShowById } from '../services/dataServices.js';

const editTemplate = (show, onSubmit) => html`
    <section id="edit">
      <div class="form">
        <h2>Edit Show</h2>
        <form @submit=${onSubmit} class="edit-form">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="TV Show title"
            .value=${show.title}
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            .value=${show.imageUrl}
          />
          <input
          type="text"
          name="genre"
          id="genre"
          placeholder="Genre"
          .value=${show.genre}
          />
          <input
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          .value=${show.country}
          />
          <textarea
            id="details"
            name="details"
            placeholder="Details"
            rows="2"
            cols="10"
            .value=${show.details}
          ></textarea>
          <button type="submit">Edit Show</button>
        </form>
      </div>
    </section>
`;

export const renderEdit = async (ctx) => {
    const showId = ctx.params.id;
    const show = await getShowById(showId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { title, 'image-url': imageUrl, genre, country, details } = Object.fromEntries(formData);

        if (!title || !imageUrl || !genre || !country || !details) {
            return alert('All fields are required');
        }

        await editShow(showId, { title, imageUrl, genre, country, details });
        ctx.page.redirect(`/details/${showId}`);
    }

    ctx.render(editTemplate(show, onSubmit));
}