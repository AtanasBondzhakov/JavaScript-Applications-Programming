import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteItem, getItemById } from '../services/dataServices.js';
import { getUserData, hasOwner } from '../utils.js';

const detailsTemplate = (item, hasUser, isOwner) => html`
    <section id="details">
    <div id="details-wrapper">
        <div>
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.item}</p>
        </div>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="details-price">Price: €${item.price}</p>
                <p class="details-availability">
                ${item.availability}
                </p>
                <p class="type">Type: ${item.type}</p>
                <p id="item-description">
                ${item.description}
                </p>
            </div>

                ${hasUser 
                    ?  html`<div id="action-buttons">
                                ${isOwner 
                                    ? html`
                                        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                                        <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
                                    : null} 
                            </div>`
                    : null
                }
        </div>
    </div>
    </section>
`;

let itemId;
let context;

export const renderDetails = async (ctx) => {
    itemId = ctx.params.id;
    context = ctx;

    const userId = ctx.user?._id;
    const item = await getItemById(itemId);
    const hasUser = !!getUserData();
    const ownerId = item._ownerId;
    
    const isOwner = hasOwner(userId, ownerId)

    ctx.render(detailsTemplate(item, hasUser, isOwner));
}

async function onDelete() {
    if(confirm('Are you sure you want to delete this item?')) {
        await deleteItem(itemId);
        context.page.redirect('/dashboard');
    }
}