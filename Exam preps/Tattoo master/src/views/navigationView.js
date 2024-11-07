import { html } from "../../node_modules/lit-html/lit-html.js";

const navigationTemplate = (user) => html`
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt="logo" />
        </a>
        <nav>
          <a href="/dashboard">Collection</a>

          ${user ? userNavTemplate() : guestNavTemplate()}
        </nav>
`;

const userNavTemplate = () => html`
         <div class="user">
            <a href="/create">Add Tattoo</a>
            <a id="logout" href="/logout">Logout</a>
          </div>
`;

const guestNavTemplate = () => html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
</div>
`;

export const renderNavigation = ({user}) => navigationTemplate(user);