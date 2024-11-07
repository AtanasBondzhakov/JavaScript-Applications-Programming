import { html } from "lit-html";
import { editTattoo, getTattooById } from "../services/dataServices.js";

const editTemplate = (onSubmitClick, tattoo) => html`
<section id="edit">
  <div class="form">
    <h2>Edit tattoo</h2>
    <form @submit=${onSubmitClick} class="edit-form">
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Tattoo Type"
        .value=${tattoo.type}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${tattoo.imageUrl}
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
        .value=${tattoo.description}
      ></textarea>
      <select id="user-type" name="user-type">
        <option value="" disabled selected>Select your role</option>
        <option value="Tattoo Artist">Tattoo Artist</option>
        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
        <option value="First Time in Tattoo">
          First Time in Tattoo
        </option>
        <option value="Tattoo Collector">Tattoo Collector</option>
        .value=${tattoo.userType}
      </select>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>
`;

export const renderEdit = async (ctx) => {
    const tattooId = ctx.params.id;
    const tattoo = await getTattooById(tattooId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { type, 'image-url': imageUrl, description, 'user-type': userType } = Object.fromEntries(formData);

        if (!type || !imageUrl || !description || !userType) {
            return alert('All fields are required')
        }

        await editTattoo(tattooId, {type, imageUrl, description, userType});
        ctx.page.redirect(`/details/${tattooId}`);
    }

    ctx.render(editTemplate(onSubmit, tattoo));

    const selectEl = document.querySelector('select');
    selectEl.value = tattoo.userType;
}