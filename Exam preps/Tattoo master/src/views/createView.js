import { html } from "../../node_modules/lit-html/lit-html.js";
import { createTattoo } from "../services/dataServices.js";

const createTemplate = (onSubmitClick) => html`
<section id="create">
  <div class="form">
    <h2>Add tattoo</h2>
    <form @submit=${onSubmitClick} class="create-form">
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Tattoo Type"
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
      <select id="user-type" name="user-type">
        <option value="" disabled selected>Select your role</option>
        <option value="Tattoo Artist">Tattoo Artist</option>
        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
        <option value="First Time in Tattoo">
          First Time in Tattoo
        </option>
        <option value="Tattoo Collector">Tattoo Collector</option>
      </select>
      <button type="submit">Add tattoo</button>
    </form>
  </div>
</section>
`;

export const renderCreate = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { type, 'image-url': imageUrl, description, 'user-type': userType} = Object.fromEntries(formData);

        if(!type || !imageUrl || !description || !userType) {
            return alert('All fields are required');
        }

        await createTattoo({type, imageUrl, description, userType});
        ctx.page.redirect('/dashboard');
    }

    ctx.render(createTemplate(onSubmit));
}