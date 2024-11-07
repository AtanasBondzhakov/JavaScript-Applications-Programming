import { html } from "../../node_modules/lit-html/lit-html.js";

import { getTattooById } from "../services/dataServices.js";
import { getUserData, hasOwner } from "../utils.js";

const detailsTemplate = (tattoo, hasOwner, hasUser) => html`
        <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src="./images/japanese dragon.png"
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
                <h3>Like tattoo:<span id="like">0</span></h3>
                ${hasUser ? html`
                <div id="action-buttons">
                    ${hasOwner ? html`
                                <a href="/edit/${tattoo._id}" id="edit-btn">Edit</a>
                                <a href="#" @click=${onDelete} id="delete-btn">Delete</a>`
                               : html `<a href="#" id="like-btn">Like</a>`
                    }
                
                </div>`: null}
              </div>
            </div>
          </div>
        </section>
`;

export const renderDetails = async (ctx) => {
    const tattooId = ctx.params.id;
    const userId = ctx.user?._id;

    const tattoo = await getTattooById(tattooId);
    const ownerId = tattoo._ownerId;

    const hasUser = !!getUserData();
    debugger

    ctx.render(detailsTemplate(tattoo, hasOwner(userId, ownerId), hasUser));
}

const onDelete = async () => {
    if (confirm('Are you sure delete it?')) {
        await deleteTattoo(tattooId);
        context.page.redirect('/dashboard');
    }
}