import { html, demo } from '@kano/demo-helpers/index.js';
import '../dist/kwc-auth.js';

const login = html`
<kwc-auth view="login"></kwc-auth>
`;
const username = html`
<kwc-auth view="username"></kwc-auth>
`;
const password = html`
<kwc-auth view="password"></kwc-auth>
`;
const email = html`
<kwc-auth view="email"></kwc-auth>
`;
const success = html`
<kwc-auth view="success"></kwc-auth>
`;
const forgotUsername = html`
<kwc-auth view="forgot-username"></kwc-auth>
`;
const forgotPassword = html`
<kwc-auth view="forgot-password"></kwc-auth>
`;
const forgotEmail = html`
<kwc-auth view="forgot-email"></kwc-auth>
`;

demo('Login', login);
demo('Username', username);
demo('Password', password);
demo('Parent email', email);
demo('Success', success);
demo('Forgot Username', forgotUsername);
demo('Forgot Password', forgotPassword);
demo('Forgot Email', forgotEmail);
