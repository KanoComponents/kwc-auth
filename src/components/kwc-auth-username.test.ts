/* globals suite, test, assert, teardown, setup */
import { UsernameInput } from  './kwc-auth-username.js';
import { AuthTestUtil } from '../test/util.js';

const username = fixture<UsernameInput>`
    <kwc-auth-username></kwc-auth-username>
`;

const testUsername = 'usernametest';
const invalidUsername = 'user &.name';
const shortUsername = 'u';
const longUsername = 'abcdefghijklmnopqrstuvwxyz';

suite('kwc-auth-username', () => {
    test('Input and submit username', (done) => {
        const el = username();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.username.username, testUsername);

            el.addEventListener('submit', ((e : CustomEvent) => {
                assert.equal(e.detail.payload.username, testUsername);
                done();
            }) as EventListener);

            testUtil.username.button.dispatchEvent(new CustomEvent('mousedown'));
        });
    });

    test('Username cannot be empty', () => {
        const el = username();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.username.username, '');
            testUtil.blur(testUtil.username.username);

            assert.equal(el.error, 'Username is required.');
        });
    });

    test('Username is too short', () => {
        const el = username();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.username.username, shortUsername);
            testUtil.blur(testUtil.username.username);

            assert.equal(el.error, 'Username must be at least 3 characters long.')
        });
    });

    test('Username is too long', () => {
        const el = username();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.username.username, longUsername);
            testUtil.blur(testUtil.username.username);

            assert.equal(el.error, 'Username must be at most 25 characters long.')
        });
    });

    test('Username can only contain letters, numbers dashes, underscores and dots', () => {
        const el = username();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.username.username, invalidUsername);
            testUtil.blur(testUtil.username.username);

            assert.equal(el.error, 'Username must only contain letters, numbers, dashes, underscores or dots.')
        })
    })
});
