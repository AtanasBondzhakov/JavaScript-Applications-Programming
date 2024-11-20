import { html, render } from '../../node_modules/lit-html/lit-html.js';

const root = document.querySelector('header');

const navigationTemplate = (user) => html`
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/" >Dashboard</a>          
            ${user ? userNavTemplate() : guestNavTemplate()}
        </nav>
`;

const userNavTemplate = () => html`
    <div id="user">
        <a id="createLink" href="/create" class="active">Create Furniture</a>
        <a id="profileLink" href="/myFurniture" >My Publications</a>
        <a id="logoutBtn" href="/logout">Logout</a>
    </div>
`;

const guestNavTemplate = () => html`
    <div id="guest">
        <a id="loginLink" href="/login">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>
`;

export const renderNavigation = ({ user }) => navigationTemplate(user);