// globals suite, test, fixture, assert 
import './kwc-auth.js';
import { KwcAuth } from './kwc-auth.js';

const basic = fixture<KwcAuth>`
    <kwc-auth></kwc-auth>
`;
suite('kwc-auth', () => {
    let el: HTMLElement;
    setup(() => {
        el = document.createElement('kwc-auth-kidsignup');
        document.body.appendChild(el);
    });

    teardown(() => {
        document.body.removeChild(el);
    })

    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-auth'));
    });
})