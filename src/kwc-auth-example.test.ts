import { assert, fixture } from '@kano/web-tester/helpers.js';
import * as sinon from 'sinon/pkg/sinon-esm.js'
import { SinonStub } from 'sinon';
import { AuthView } from './kwc-auth-example.js';
import { Link } from './view-type.js'
import './kwc-auth-example.js';

import { Actions } from './examples/actions.js';
import { flowDefinition } from './examples/flow-definition.js';

const basic = fixture<AuthView>`
    <kwc-auth-example></kwc-auth-example>
`;

suite('kwc-auth-example', () => {

    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-auth-example'));
    });

    suite('headerTemplate', () => {
        let element: AuthView;

        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
        });

        teardown(() => {
            sinon.restore();
        });

        test('header template to return a HTML template', (done) => {
            const headerHtml = element.headerTemplate();
            assert.exists(headerHtml);
            done();
        });
        
        test('header template to create header element', () => {
            element.view.id = 'landing'
            const headerHtml = element.headerTemplate();
            const templateEl = headerHtml.getTemplateElement();
            const headerEl = templateEl.content.querySelector('header');
            assert.exists(headerEl);
        });
    });

    suite('backButtonTemplate', () => {
        let element: AuthView;

        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
        });

        teardown(() => {
            sinon.restore();
        });

        test('function returns html if backButton data exists', () => {
            element.view.backButton = {text: 'back', link: ''};
            const el = element.backButtonTemplate();
            if (!el) {
                assert.fail();
                return;
            }
            const content = el.getTemplateElement().content;
            assert.exists(content)
        })

        test('function returns null if backButton data doesn\'t exist', () => {
            element.view.backButton = undefined;
            const el = element.backButtonTemplate();
            assert.notExists(el);
        })
    });

    suite('footerTemplate', () => {
        let element: AuthView;
        let links: Link[];
        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
            links = [
                {
                    text: 'link1',
                    link: 'link1',
                },
                {
                    text: 'link2',
                    link: 'link2',
                },
                {
                    text: 'link3',
                    link: 'link3',
                },
            ]
        });

        teardown(() => {
            sinon.restore();
        });

        test('function renders html template', () => {
            const el = element.footerTemplate(links);
            const innerHtml = el.getTemplateElement().content;
            assert.exists(innerHtml);
        })
    });

    suite('handleClick', () => {
        let element: AuthView;
        let changeTemplateStub: SinonStub;
        let id: string;

        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
            changeTemplateStub = sinon.stub(element, 'changeTemplate');
            id = 'password';
        });

        teardown(() => {
            sinon.restore();
        });

        test('handleChangeView to call changeTemplate', () => {
            element.handleClick(id);
            assert(changeTemplateStub.called);
        })
    });

    suite('handleChangeView', () => {
        let element: AuthView;
        let changeTemplateStub: SinonStub;
        let event: CustomEvent;

        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
            changeTemplateStub = sinon.stub(element, 'changeTemplate');
            event = new CustomEvent('test', { detail: { nextView: 'password' }});
        });

        teardown(() => {
            sinon.restore();
        });

        test('handleChangeView to call changeTemplate', () => {
            element.handleChangeView(event);
            assert(changeTemplateStub.called);
        })
    });

    suite('changeTemplate', () => {
        let element: AuthView;

        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
        });

        teardown(() => {
            sinon.restore();
        });

        test('view is changed if id provided exists', () => {
            const oldView = element.view;
            const id = 'username';
            if (!element.views.get(id)) {
                assert.fail();
                return;
            }
            element.changeTemplate(id);
            assert.notEqual(oldView, element.view);
        })
        
        test('view is set to landing if id provided does not exist', () => {
            element.changeTemplate('username');
            const id = 'somethingFake';
            if (element.views.get(id)) {
                assert.fail();
                return;
            }
            element.changeTemplate(id);
            assert.equal(element.view.id, 'landing');
        })
    });

    suite('renderTemplate', () => {
        let element: AuthView;

        setup(() => {
            element = basic();
            element.flowDefinition = flowDefinition;
            element.actions = Actions;
        })

        teardown(() => {
            sinon.restore();
        })

        test('function returns html', () => {
            const el = element.renderTemplate();
            const template = el.getTemplateElement().content;
            assert.exists(template);
        })
    })
})
