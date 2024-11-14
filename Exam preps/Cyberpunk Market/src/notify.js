const element = document.querySelector('#errorBox');
const output = element.querySelector('span');

export const notify = (msg) => {
    element.style.display = 'block';
    output.textContent = msg;

    setTimeout(() => element.style.display = 'none', 3000);
} 