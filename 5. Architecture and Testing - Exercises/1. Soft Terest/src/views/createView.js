import { createIdea } from "../services/dataServices.js";
import { showView } from "../util.js";

const createSection = document.querySelector('div[data-section="create"]');
const form = createSection.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;

export function showCreatePage(ctx) {
    context = ctx;
    showView(createSection);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { title, description, 'imageURL': img } = Object.fromEntries(formData);

    try {
        if (title.length < 6) {
            throw new Error('Title should be at least 6 characters long');
        }

        if (description.length < 10) {
            throw new Error('Description should be at least 10 characters long');
        }

        if (img.length < 5) {
            throw new Error('Image should be at least 5 characters long');
        }

        await createIdea(title, description, img);

        form.reset();
        context.goTo('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}