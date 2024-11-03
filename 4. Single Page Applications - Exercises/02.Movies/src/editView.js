import { showView } from "./util.js";

const editSection = document.querySelector('#edit-movie');
const form = editSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function editPage() {
    showView(editSection);
}

async function onSubmit(e) {
    e.preventDefault();

    
}