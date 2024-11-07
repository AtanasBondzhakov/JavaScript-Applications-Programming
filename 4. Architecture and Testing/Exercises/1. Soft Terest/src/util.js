const sections = [...document.querySelectorAll('div[data-section]')];

// function hideAll() {
//     sections.forEach(section => section.style.display = 'none');
// }

export function showView(section) {
    document.querySelector('main').replaceChildren(section);
}

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userNav = [...document.querySelectorAll('[data-nav="user"]')];
    const guestNav = [...document.querySelectorAll('[data-nav="guest"]')];

    if(user) {
        guestNav.forEach(el => el.style.display = 'none');
        userNav.forEach(el => el.style.display = 'block');
    } else {
        userNav.forEach(el => el.style.display = 'none');
        guestNav.forEach(el => el.style.display = 'block');
    }
}