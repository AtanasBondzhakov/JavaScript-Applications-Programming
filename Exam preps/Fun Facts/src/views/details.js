import { html } from "../../node_modules/lit-html/lit-html.js";

import { getFact } from "../services/data.js";
import { getUserData, hasOwner } from "../utils.js";

const detailsTemplate = (fact, hasUser, isCreator) => html`
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

                <h3>Likes:<span id="likes">0</span></h3>

                    ${hasUser
                        ? html`
                            <div id="action-buttons">
                                ${isCreator 
                                    ? html`
                                        <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                                        <a href="" id="delete-btn">Delete</a>`
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

export const renderDetails = async (ctx) => {
    const factId = ctx.params.id;
    const userId = ctx.user?._id;

    const fact = await getFact(factId);
    const ownerId = fact._ownerId;


    const hasUser = !!getUserData();
    const isCreator = hasOwner(userId, ownerId);


    ctx.render(detailsTemplate(fact, hasUser, isCreator));
}