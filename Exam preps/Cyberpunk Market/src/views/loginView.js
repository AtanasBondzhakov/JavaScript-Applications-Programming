import { html } from '../../node_modules/lit-html/lit-html.js';

import { login } from '../services/userServices.js';
import { notify } from '../notify.js'

const loginTemplate = (onSubmit) => html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
            </form>
        </div>
    </section>
`;

export const renderLogin = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);

        if (!email || !password) {
            return notify('All fields are required');
        }

        await login({ email, password });
        ctx.page.redirect('/');
    }

    ctx.render(loginTemplate(onSubmit));
}