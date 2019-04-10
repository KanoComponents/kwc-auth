// globals suite, test, fixture, assert 
import './kwc-auth.js';
import { KwcAuth } from './kwc-auth.js';


const basic = fixture<KwcAuth>`
    <kwc-auth></kwc-auth>
`;
suite('kwc-auth', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-auth'));
    });
})