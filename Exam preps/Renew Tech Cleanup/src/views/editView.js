import { html } from "../../node_modules/lit-html/lit-html.js";
import { editSolution, getSolutionById } from "../services/dataServices.js";

const editTemplate = (solution, onSubmit) => html`
        <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
                .value=${solution.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${solution.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                .value=${solution.description}
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
                .value=${solution.learnMore}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

export const renderEdit = async (ctx) => {
    const solutionId = ctx.params.id;
    const solution = await getSolutionById(solutionId);


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { type, 'image-url': imageUrl, description, 'more-info': learnMore } = Object.fromEntries(formData);

        if (!type || !imageUrl || !description || !learnMore) {
            return alert('All fields are required');
        }

        await editSolution(solutionId, { type, imageUrl, description, learnMore });
        ctx.page.redirect(`/details/${solutionId}`);
    }

    ctx.render(editTemplate(solution, onSubmit));
}