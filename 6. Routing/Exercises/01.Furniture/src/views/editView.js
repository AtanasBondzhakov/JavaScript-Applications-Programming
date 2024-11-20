import { html } from '../../node_modules/lit-html/lit-html.js';

import { editItem, getItemById } from '../services/dataServices.js';

const editTemplate = (onSubmit, errors, item) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control ${findHasError(errors, 'make')}" id="new-make" type="text" name="make" value=${item.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control ${findHasError(errors, 'model')}" id="new-model" type="text" name="model" value=${item.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control ${findHasError(errors, 'year')}" id="new-year" type="number" name="year" value=${item.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control ${findHasError(errors, 'description')}" id="new-description" type="text" name="description" value=${item.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control ${findHasError(errors, 'price')}" id="new-price" type="number" name="price" value=${item.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control ${findHasError(errors, 'img')}" id="new-image" type="text" name="img" value=${item.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control ${findHasError(errors, 'material')}" id="new-material" type="text" name="material" value=${item.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
`;

export const renderEdit = async (ctx) => {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        let hasError = false;

        const formData = new FormData(e.currentTarget);
        const { make,
            model,
            year,
            description,
            price,
            img,
            material
        } = Object.fromEntries(formData);

        if (make.length < 4) {
            errors.make = true;
            hasError = true;
        }

        if (model.length < 4) {
            errors.model = true;
            hasError = true;
        }

        if (year < 1950 || year > 2050) {
            errors.year = true;
            hasError = true;
        }

        if (description < 11) {
            errors.description = true;
            hasError = true;
        }

        if (price <= 0) {
            errors.price = true;
            hasError = true;
        }

        if (!img) {
            errors.img = true;
            hasError = true;
        }

        if (hasError) {
            return ctx.render(editTemplate(onSubmit, errors, item));
        }

        const itemData = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        }

        debugger
        await editItem(itemId, itemData);
        ctx.page.redirect('/');
    }

    ctx.render(editTemplate(onSubmit, {}, item));
}

function findHasError(errors, prop) {
    if (!errors) {
        return;
    }
    return errors[prop] ? 'is-invalid' : 'is-valid';
}