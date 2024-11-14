import { html } from '../../node_modules/lit-html/lit-html.js';

import { searchCar } from '../services/dataServices.js';

const searchTemplate = (onSubmit, cars) => html`
        <section id="search">
          <div class="form">
            <h4>Search</h4>
            <form @submit=${onSubmit} class="search-form">
              <input type="text" name="search" id="search-input" />
              <button class="button-list">Search</button>
            </form>
          </div>
          <div class="search-result">
                ${!cars || cars.length === 0
                    ? html`<h2 class="no-avaliable">No result.</h2>`
                    : cars.map(car => carTemplate(car))}       
          </div>
        </section>
`;

const carTemplate = (car) => html`
    <div class="car">
        <img src=${car.imageUrl} alt="example1"/>
        <h3 class="model">${car.model}</h3>
        <a class="details-btn" href="/details/${car._id}">More Info</a>
    </div>
`;

export const renderSearch = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { search } = Object.fromEntries(formData);

        if (!search) {
            return alert('Search field cannot be empty');
        }

        const resultCars = await searchCar(search);
        ctx.render(searchTemplate(onSubmit, resultCars));
    }
    debugger
    ctx.render(searchTemplate(onSubmit));
}