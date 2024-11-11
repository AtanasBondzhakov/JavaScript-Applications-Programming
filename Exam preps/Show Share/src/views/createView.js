import { html } from '../../node_modules/lit-html/lit-html.js';
import { createShow } from '../services/dataServices.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
      <div class="form">
        <h2>Add Show</h2>
        <form @submit=${onSubmit} class="create-form">
          <input
          type="text"
          name="title"
          id="title"
          placeholder="TV Show title"
         />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <input
        type="text"
        name="genre"
        id="genre"
        placeholder="Genre"
         />
         <input
         type="text"
         name="country"
         id="country"
         placeholder="Country"
        />
        <textarea
          id="details"
          name="details"
          placeholder="Details"
          rows="2"
          cols="10"
        ></textarea>
          <button type="submit">Add Show</button>
        </form>
      </div>
    </section>
`;

export const renderCreate = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const {title, 'image-url': imageUrl, genre, country, details} = Object.fromEntries(formData);

        if(!title || !imageUrl || !genre || !country || !details) {
            return alert('All fields are required');
        }

        await createShow({title, imageUrl, genre, country, details});
        ctx.page.redirect('/dashboard');
    }

    ctx.render(createTemplate(onSubmit));
}