import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteShow, getShowById } from '../services/dataServices.js';
import { getUserData, hasOwner } from '../utils.js';

const detailsTemplate = (show, hasUser, isOwner) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${show.imageUrl} alt="example1" />
            <div id="details-text">
              <p id="details-title">${show.title}</p>
              <div id="info-wrapper">
                <div id="description">
                  <p id="details-description">
                    ${show.details}
                  </p>
                </div>
              </div>

              ${hasUser ? html`
              <div id="action-buttons">
                ${isOwner ? html`
                <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
                ` : null}
              </div>
              ` : null}

            </div>
          </div>
        </section>
`;

let showId;
let context;

export const renderDetails = async (ctx) => {
  context = ctx;

  showId = ctx.params.id;
  const userId = ctx.user?._id;

  const show = await getShowById(showId);

  const ownerId = show._ownerId;

  const hasUser = !!getUserData();
  const isOwner = hasOwner(userId, ownerId);

  ctx.render(detailsTemplate(show, hasUser, isOwner));
}

async function onDelete(e) {

  if (confirm('Are you sure delete it?')) {
    await deleteShow(showId);
    context.page.redirect('/dashboard');
  }
}