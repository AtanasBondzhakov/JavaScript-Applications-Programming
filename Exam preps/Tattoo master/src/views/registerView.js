import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../services/userServices.js";

const registerTemplate = (onSubmitClick) => html`
<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmitClick} class="register-form">
      <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
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
            return alert('All fields are required');
        }

        if (password !== rePass) {
            return alert('Password do not match');
        }

        await register({ email, password });
        ctx.page.redirect('/');
    }

    ctx.render(registerTemplate(onSubmit));
}