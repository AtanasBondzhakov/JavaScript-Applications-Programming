import { html } from "../../node_modules/lit-html/lit-html.js";

import { deleteFact, getFact } from "../services/data.js";
import { getTotalLikes, isLiked, like } from "../services/likes.js";
import { getUserData, hasOwner } from "../utils.js";

const detailsTemplate = (fact, hasUser, isCreator, onLike, likes, hasLiked) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${fact.imageUrl} alt="example1" />
            <p id="details-category">${fact.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">
                    ${fact.description}
                    </p>
                    <p id ="more-info">
                        ${fact.moreInfo}
                            </p>
                </div>

                <h3>Likes:<span id="likes">${likes}</span></h3>

                    ${hasUser
                        ? html`
                            <div id="action-buttons">
                                ${isCreator
                                    ? html`
                                        <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                                        <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
                                    : html`
                                        ${!hasLiked 
                                            ? html`
                                                <a href=""  @click=${onLike} id="like-btn">Like</a>`
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

let context = null;
let factId = null;

export const renderDetails = async (ctx) => {
    factId = ctx.params.id;
    context = ctx;

    const userId = ctx.user?._id;

    const fact = await getFact(factId);
    const ownerId = fact._ownerId;


    const hasUser = !!getUserData();
    const isCreator = hasOwner(userId, ownerId);

    const likes = await getTotalLikes(factId);
    const hasLiked = await isLiked(factId, userId);


    ctx.render(detailsTemplate(fact, hasUser, isCreator, onLike, likes, hasLiked));

    async function onLike() {
        await like(factId);
    }
}

const onDelete = async () => {
    if (confirm('Are you sure you want to delete this fact?')) {
        await deleteFact(factId);
        context.page.redirect('/dashboard');
    }
}