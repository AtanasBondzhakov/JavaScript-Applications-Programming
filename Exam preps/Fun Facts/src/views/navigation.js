import { html } from "../../node_modules/lit-html/lit-html.js";

const navigationTemplate = (user) => html`
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/dashboard">Fun Facts</a>
          </div>

          ${user ? userNavTemplate() : guestNavTemplate()}
          
        </nav>
`;

const userNavTemplate = () => html`
         <div class="user">
            <a href="/create">Add Fact</a>
            <a href="/logout">Logout</a>
          </div>
`;

const guestNavTemplate = () => html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            
          </div>
`;

export const renderNavigation = ({user}) => navigationTemplate(user);