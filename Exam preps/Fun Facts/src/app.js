import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/auth.js';
import { navigationMiddleware } from './middlewares/nav.js';
import { renderMiddleware } from './middlewares/render.js';
import { onLogout } from './services/user.js';
import { renderDashboard } from './views/dashboard.js';

import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';

page(authMiddleware);
page(navigationMiddleware);
page(renderMiddleware);

page('/', renderHome);
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', onLogout);
page('/dashboard', renderDashboard);

page();