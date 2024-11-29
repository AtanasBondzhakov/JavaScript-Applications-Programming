import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteCharacter, getCharacterById } from '../services/dataServices.js';
import { getUserData, hasOwner } from '../utils.js';

const detailsTemplate = (character, hasUser, isOwner) => html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${character.imageUrl} alt="example1" />
                <div>
                <p id="details-category">${character.category}</p>
                <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">
                    ${character.description}
                    </p>
                    <p id ="more-info">
                        ${character.moreInfo}
                            </p>
                </div>
                </div>
                <h3>Is This Useful:<span id="likes">0</span></h3>
                    ${hasUser
                        ? html`
                            <div id="action-buttons">
                                ${isOwner 
                                    ? html`
                                        <a href="/edit/${character._id}" id="edit-btn">Edit</a>
                                        <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
                                    : html`
                                        <a href="" id="like-btn">Like</a>`
                                }
                            </div>`
                        : null
                    }
                </div>
            </div>
        </section>
`;

let characterId;
let context;

export const renderDetails = async (ctx) => {
    characterId = ctx.params.id;
    context = ctx;

    const userId = ctx.user?._id;

    const character = await getCharacterById(characterId);
    const ownerId = character._ownerId;

    const hasUser = !!getUserData();
    const isOwner = hasOwner(userId, ownerId);

    ctx.render(detailsTemplate(character, hasUser, isOwner));
}

async function onDelete() {
    if (confirm('Are you sure you want to delete this character?')) {
        await deleteCharacter(characterId);
        context.page.redirect('/dashboard');
    }
}