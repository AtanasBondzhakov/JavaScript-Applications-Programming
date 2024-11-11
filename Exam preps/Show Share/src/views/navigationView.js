import { html } from '../../node_modules/lit-html/lit-html.js';

const navigationTemplate = (user) => html`
       <a id="logo" href="#"
          ><img id="logo-img" src="./images/show_logo.png" alt="logo" />
        </a>
        <nav>
          <div>
            <a href="#">TV Shows</a>
            <a href="#">Search</a>
          </div>
            ${user ? userNavTemplate() : guestNavTemplate()}
        </nav>
`;

const userNavTemplate = () => html`
    <div class="user">
      <a href="#">Add Show</a>
      <a href="#">Logout</a>
    </div>
`;

const guestNavTemplate = () => html`
    <div class="guest">
      <a href="#">Login</a>
      <a href="#">Register</a>
    </div>
`;

export const renderNavigation = ({ user }) => navigationTemplate(user); 