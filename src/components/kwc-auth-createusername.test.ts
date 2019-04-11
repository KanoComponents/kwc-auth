/* globals suite, test, assert, teardown, setup */
import { CreateUsername } from  './kwc-auth-createusername.js';
import { AuthTestUtil } from '../test/util.js';

const createusername = fixture<CreateUsername>`
    <kwc-auth-createusername></kwc-auth-createusername>
`;

const testUsername = 'usernametest';
const invalidUsername = 'user &.name';
const shortUsername = 'u';

suite('kwc-auth-createusername', () => {
    test('Input and submit username', (done) => {
        const el = createusername();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createusername.username, testUsername);

            el.addEventListener('submit', ((e : CustomEvent) => {
                assert.equal(e.detail.username, testUsername);
                done();
            }) as EventListener);

            testUtil.createusername.form.dispatchEvent(new CustomEvent('submit'));
        });
    });

    test('Username cannot be empty', () => {
        const el = createusername();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createusername.username, '');
            testUtil.blur(testUtil.createusername.username);

            const errors = el.errors;
            assert.equal(errors.username, 'Username is required.');
        });
    });

    test('Username is too short', () => {
        const el = createusername();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createusername.username, shortUsername);
            testUtil.blur(testUtil.createusername.username);

            const errors = el.errors;
            assert.equal(errors.username, 'Username must be at least 6 characters long.')
        });
    });

    test('Username can only contain letters, numbers dashes, underscores and dots', () => {
        const el = createusername();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createusername.username, invalidUsername);
            testUtil.blur(testUtil.createusername.username);

            const errors = el.errors;
            assert.equal(errors.username, 'Username must only contain letters, numbers, dashes, underscores or dots.')
        })
    })
});
