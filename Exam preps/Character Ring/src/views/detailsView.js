import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteCharacter, getCharacterById } from '../services/dataServices.js';
import { getTotalLikes, isLiked, like } from '../services/likes.js';
import { getUserData, hasOwner } from '../utils.js';

const detailsTemplate = (character, onLike, hasUser, isOwner, likes, hasLike) => html`
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
                <h3>Is This Useful:<span id="likes">${likes}</span></h3>
                    ${hasUser
                        ? html`
                            <div id="action-buttons">
                                ${isOwner
                                    ? html`
                                        <a href="/edit/${character._id}" id="edit-btn">Edit</a>
                                        <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
                                    : html`
                                        ${!hasLike
                                            ? html`
                                                <a href="" @click=${onLike} id="like-btn">Like</a>`
                                            : null
                                        }`
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

    const likes = await getTotalLikes(characterId);

    const hasLike = await isLiked(characterId, userId);

    ctx.render(detailsTemplate(character, onLike, hasUser, isOwner, likes, hasLike));

    async function onLike() {
        await like({ characterId });
    }
}

async function onDelete() {
    if (confirm('Are you sure you want to delete this character?')) {
        await deleteCharacter(characterId);
        context.page.redirect('/dashboard');
    }
}