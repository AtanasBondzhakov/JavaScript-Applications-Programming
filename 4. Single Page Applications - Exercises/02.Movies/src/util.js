const allSections = [...document.querySelectorAll('.view-section')];


function hideAll() {
    allSections.forEach(view => view.style.display = 'none');
}

export function showView(section) {
    hideAll();
    section.style.display = 'block';
}

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userNav = document.querySelectorAll('.user');
    const guestNav = document.querySelectorAll('.guest');
    const messageContainer = document.querySelector('#welcome-msg');

    if(user) {
        guestNav.forEach(el => el.style.display = 'none');
        userNav.forEach(el => el.style.display = 'inline-block');
        messageContainer.textContent = `Welcome, ${user.email}`;
    } else {
        userNav.forEach(el => el.style.display = 'none');
        guestNav.forEach(el => el.style.display = 'inline-block');
        messageContainer.textContent = '';
    }
}