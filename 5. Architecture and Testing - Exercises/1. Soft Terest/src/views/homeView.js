import { showView } from "../util.js";

const homeSection = document.querySelector('div[data-section="home"]');

export function showHomePage() {
    showView(homeSection);
}