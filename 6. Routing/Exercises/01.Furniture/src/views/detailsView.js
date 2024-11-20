import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteItem, getItemById } from '../services/dataServices.js';
import { hasOwner } from '../utils.js';

const detailsTemplate = (item, isOwner) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img} />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            ${isOwner
                ? html`
                    <div>
                        <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
                        <a href="#" @click=${onDelete} class="btn btn-red">Delete</a>
                    </div>`
                : null}
            
        </div>
    </div>
`;

let context;
let itemId;

export const renderDetails = async (ctx) => {
    context = ctx;
    itemId = ctx.params.id;
    const userId = ctx.user?._id;
    
    const item = await getItemById(itemId);

    const ownerId = item._ownerId;

    const isOwner = hasOwner(userId, ownerId);

    ctx.render(detailsTemplate(item, isOwner));
}

const onDelete = async () => {
    if(confirm('Are you sure you want to delete this item?')) {
        await deleteItem(itemId);
        context.page.redirect('/');
    }
}