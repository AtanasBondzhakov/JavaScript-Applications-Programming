import { html } from "../../node_modules/lit-html/lit-html.js";

import { notify } from "../notify.js";
import { register } from "../services/user.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
        </div>
    </section>
`;

export const renderRegister = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password, 're-password': rePass } = Object.fromEntries(formData);

        if (!email || !password || !rePass) {
            return notify('All fields are required');
        }

        if (password !== rePass) {
            return notify('Passwords don\'t match');
        }

        await register(email, password);
        ctx.page.redirect('/');
    }

    ctx.render(registerTemplate(onSubmit));
}