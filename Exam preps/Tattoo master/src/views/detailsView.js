import { html } from "../../node_modules/lit-html/lit-html.js";

import { getTattooById, deleteTattoo } from "../services/dataServices.js";
import { getLikesByUser, getTotalLikesPerTattoo, likeTattoo } from "../services/likes.js";
import { getUserData, hasOwner } from "../utils.js";

const detailsTemplate = (tattoo, onLike, hasOwner, hasUser, likes, hasLiked) => html`
        <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${tattoo.imageUrl}
              alt="example1"
            />
            <div>
              <div id="info-wrapper">
                <p id="details-type">${tattoo.type}</p>
                <div id="details-description">
                  <p id="user-type">${tattoo.userType}</p>
                  <p id="description">
                    ${tattoo.description}
                  </p>
                </div>
                <h3>Like tattoo:<span id="like">${likes}</span></h3>
                ${hasUser ? html`
                <div id="action-buttons">
                    ${hasOwner ? html`
                                <a href="/edit/${tattoo._id}" id="edit-btn">Edit</a>
                                <a href="#" @click=${onDelete} id="delete-btn">Delete</a>`
            : html`
                                    ${!hasLiked ? html`<a href="#" @click=${onLike} id="like-btn">Like</a>` : null}`
        }
                </div>`: null}
              </div>
            </div>
          </div>
        </section>
`;

let context = null;
let tattooId = null;

export const renderDetails = async (ctx) => {
    context = ctx;

    tattooId = ctx.params.id;
    const userId = ctx.user?._id;

    const tattoo = await getTattooById(tattooId);
    const ownerId = tattoo._ownerId;

    const hasUser = !!getUserData();
    const likes = await getTotalLikesPerTattoo(tattooId);
    const hasLiked = await getLikesByUser(tattooId, userId);

    ctx.render(detailsTemplate(tattoo, onLike, hasOwner(userId, ownerId), hasUser, likes, hasLiked));

    async function onLike() {
        await likeTattoo({ tattooId });
    }
}

const onDelete = async () => {
    if (confirm('Are you sure delete it?')) {
        debugger
        await deleteTattoo(tattooId);
        context.page.redirect('/dashboard');
    }
}