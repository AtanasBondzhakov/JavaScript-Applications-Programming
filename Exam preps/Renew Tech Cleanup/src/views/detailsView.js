import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSolutionById } from "../services/dataServices.js";
import { getUserData, hasOwner } from "../utils.js";

const detailsTemplate = (solution, hasUser, isOwner) => html`
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
              <h3>Like Solution:<span id="like">0</span></h3>

            ${hasUser ? html`
                <div id="action-buttons">
                    ${isOwner ? html`
                        <a href="#" id="edit-btn">Edit</a>
                        <a href="#" id="delete-btn">Delete</a>
                    `: html`
                        <a href="#" id="like-btn">Like</a>
                    `}
                </div>
            `: null}
            </div>
          </div>
        </section>
`;

export const renderDetails = async (ctx) => {
    const solutionId = ctx.params.id;
    const userId = ctx.user?._id;

    const solution = await getSolutionById(solutionId);
    const ownerId = solution._ownerId;

    const hasUser = !!getUserData;
    const isOwner = hasOwner(userId, ownerId);

    ctx.render(detailsTemplate(solution, hasUser, isOwner));
}