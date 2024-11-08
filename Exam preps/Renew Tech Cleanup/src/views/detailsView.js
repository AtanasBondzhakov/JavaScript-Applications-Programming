import { html } from "../../node_modules/lit-html/lit-html.js";

import { deleteSolution, getSolutionById } from "../services/dataServices.js";
import { getAllLikesPerSolution, getLikesPerUser, likeSolution } from "../services/likes.js";
import { getUserData, hasOwner } from "../utils.js";

const detailsTemplate = (solution, onLike, isOwner, totalLikes, hasLiked, hasUser) => html`
       <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${solution.imageUrl}
              alt="example1"
            />
            <div>
              <p id="details-type">${solution.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">
                    ${solution.description}
                  </p>
                  <p id="more-info">
                    ${solution.learnMore}
                  </p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${totalLikes}</span></h3>

            ${hasUser ? html`
                <div id="action-buttons">
                    ${isOwner ? html`
                        <a href="/edit/${solution._id}" id="edit-btn">Edit</a>
                        <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
                    `: html`
                        ${!hasLiked ? html`
                            <a href="#" @click=${onLike} id="like-btn">Like</a>
                        ` : null}
                    `}
                </div>
            `: null}
            </div>
          </div>
        </section>
`;

let solutionId;
let context;

export const renderDetails = async (ctx) => {
    context = ctx;

    solutionId = ctx.params.id;
    const userId = ctx.user?._id;

    const solution = await getSolutionById(solutionId);
    const ownerId = solution._ownerId;

    const hasUser = !!getUserData();
    const totalLikes = await getAllLikesPerSolution(solutionId);
    const hasLiked = await getLikesPerUser(solutionId, userId);

    ctx.render(detailsTemplate(solution, onLike, hasOwner(userId, ownerId), totalLikes, hasLiked, hasUser));

    async function onLike() {
        await likeSolution({ solutionId });
    }
}

async function onDelete() {
    if (confirm('Are you sure delete it?')) {
        await deleteSolution(solutionId);
        context.page.redirect('/dashboard');
    }
}