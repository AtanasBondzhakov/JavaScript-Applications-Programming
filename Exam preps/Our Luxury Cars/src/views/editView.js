import { html } from '../../node_modules/lit-html/lit-html.js';

import { editCar, getCarById } from '../services/dataServices.js';

const editTemplate = (car, onSubmit) => html`
    <section id="edit">
        <div class="form form-auto">
        <h2>Edit Your Car</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="model" id="model" placeholder="Model" .value=${car.model} />
            <input
            type="text"
            name="imageUrl"
            id="car-image"
            placeholder="Your Car Image URL"
            .value=${car.imageUrl}
            />
            <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro"
            .value=${car.price}
            />
            <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Weight in Kg"
            .value=${car.weight}
            />
            <input
            type="text"
            name="speed"
            id="speed"
            placeholder="Top Speed in Kmh"
            .value=${car.speed}
            />
            <textarea
            id="about"
            name="about"
            placeholder="More About The Car"
            rows="10"
            cols="50"
            .value=${car.about}
            ></textarea>
            <button type="submit">Edit</button>
        </form>
        </div>
    </section>
`;

export const renderEdit = async (ctx) => {
    const carId = ctx.params.id;
    const car = await getCarById(carId);


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { model, imageUrl, price, weight, speed, about } = Object.fromEntries(formData);

        if (!model || !imageUrl || !price || !weight || !speed || !about) {
            return alert('All fields are required');
        }

        const carUpdates = {
            model,
            imageUrl,
            price,
            weight,
            speed,
            about
        }

        await editCar(carId, carUpdates);
        ctx.page.redirect(`/details/${carId}`);
    }

    ctx.render(editTemplate(car, onSubmit));
}