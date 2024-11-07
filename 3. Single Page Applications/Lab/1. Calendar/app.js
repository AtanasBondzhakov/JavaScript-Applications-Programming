const monthsMap = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};

const body = document.querySelector('body');
const years = document.querySelector('#years');
const sections = [...document.querySelectorAll('section')];

body.addEventListener('click', handleEvent);

function handleEvent(e) {
    if (e.target.closest('.monthCalendar')) {
        renderMonth(e);
    } else if (e.target.closest('.daysCalendar caption')) {
        renderYear(e);
    }
}

function renderYears(years) {
    body.replaceChildren(years);
    document.querySelector('table').addEventListener('click', renderYear);
}

function renderYear(e) {
    if (!isValidTarget(e.target)) {
        return;
    }

    let year = e.target.dataset.year || e.target.outerText;

    const yearSection = sections.find(s => s.id === `year-${year}`);

    if (!yearSection) {
        return;
    }
    body.replaceChildren(yearSection);
}

function renderMonth(e) {
    if (!isValidTarget(e.target)) {
        return;
    }

    if (e.target.tagName === 'CAPTION') {
        renderYears(years);
        return;
    }

    const year = e.target.closest('.calendar').querySelector('caption').textContent;
    const month = monthsMap[e.target.outerText];

    const monthSection = sections.find(s => s.id === `month-${year}-${month}`);

    if (!monthSection) {
        return;
    }

    body.replaceChildren(monthSection);

    const captionEl = document.querySelector('caption');
    captionEl.dataset.year = year;
}

function isValidTarget(target) {
    return ['TD', 'DIV', 'CAPTION'].includes(target.tagName);
}

renderYears(years);