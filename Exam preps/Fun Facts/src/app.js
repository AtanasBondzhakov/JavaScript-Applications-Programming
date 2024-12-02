import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/auth.js';
import { navigationMiddleware } from './middlewares/nav.js';
import { renderMiddleware } from './middlewares/render.js';

import { renderHome } from './views/home.js';

page(authMiddleware);
page(navigationMiddleware);
page(renderMiddleware);

page('/', renderHome);

page();