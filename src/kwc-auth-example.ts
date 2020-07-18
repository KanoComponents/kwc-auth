import { LitElement, html, css, customElement, property, query } from 'lit-element/lit-element.js';
import { _ } from '@kano/i18n/dist/index.js';

import { IForm, IActions } from './actions.js';
import { View } from './view-type.js';
import { SingleInputElement } from './components/auth-single-form.js';
import { Login } from './components/kwc-auth-login.js';
import { KwcAuth } from './kwc-auth.js';
import './kwc-auth.js';

import * as icons from './icons.js';

export interface HeaderDetails {
    text: string;
    image: string;
}

interface IBackButton {
    text: string;
    link: string;
}

export interface IViewDefinition {
    id : string;
    backButton? : IBackButton;
}

const headerImage = `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIxIiBoZWlnaHQ9IjU3IiB2aWV3Qm94PSIwIDAgMjIxIDU3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMTMyIDEyLjlDMTMyIDcuMzAwMDEgMTM2LjYgMi43MDAwMSAxNDIuMiAyLjcwMDAxQzE0Ny44IDIuNzAwMDEgMTUyLjQgNy4zMDAwMSAxNTIuNCAxMi45QzE1Mi40IDE4LjUgMTQ3LjggMjMuMSAxNDIuMiAyMy4xQzEzNi42IDIzLjEgMTMyIDE4LjUgMTMyIDEyLjlaTTE0OS42IDEyLjlDMTQ5LjYgOC44MDAwMSAxNDYuMyA1LjUwMDAxIDE0Mi4yIDUuNTAwMDFDMTM4LjEgNS41MDAwMSAxMzQuOCA4LjgwMDAxIDEzNC44IDEyLjlDMTM0LjggMTcgMTM4LjEgMjAuMyAxNDIuMiAyMC4zQzE0Ni4zIDIwLjMgMTQ5LjYgMTcgMTQ5LjYgMTIuOVoiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMTM4LjQgMTIuOUMxMzguNCAxMC44IDE0MC4xIDkgMTQyLjMgOUMxNDQuNCA5IDE0Ni4yIDEwLjcgMTQ2LjIgMTIuOUMxNDYuMiAxNS4xIDE0NC41IDE2LjggMTQyLjMgMTYuOEMxNDAuMSAxNi44IDEzOC40IDE1IDEzOC40IDEyLjlaTTE0My4zIDEyLjlDMTQzLjMgMTIuMyAxNDIuOCAxMS44IDE0Mi4yIDExLjhDMTQxLjYgMTEuOCAxNDEuMSAxMi4zIDE0MS4xIDEyLjlDMTQxLjEgMTMuNSAxNDEuNiAxNCAxNDIuMiAxNEMxNDIuOCAxNCAxNDMuMyAxMy41IDE0My4zIDEyLjlaIiBmaWxsPSIjRkY2OTAwIi8+CjxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTE4OS4xIDI2LjJDMTg5LjEgMjMuMyAxOTEuNCAyMSAxOTQuMyAyMUMxOTcuMiAyMSAxOTkuNSAyMy4zIDE5OS41IDI2LjJDMTk5LjUgMjkuMSAxOTcuMiAzMS40IDE5NC4zIDMxLjRDMTkxLjQgMzEuNCAxODkuMSAyOS4xIDE4OS4xIDI2LjJaTTE5NS44IDI2LjJDMTk1LjggMjUuNCAxOTUuMiAyNC44IDE5NC40IDI0LjhDMTkzLjYgMjQuOCAxOTMgMjUuNCAxOTMgMjYuMkMxOTMgMjcgMTkzLjYgMjcuNiAxOTQuNCAyNy42QzE5NS4yIDI3LjYgMTk1LjggMjcgMTk1LjggMjYuMloiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNNjguNSAyNS40QzcwLjEgMjUuNCA3MS41IDI0LjEgNzEuNSAyMi40VjExLjVDNzEuNSA5LjkgNzAuMiA4LjUgNjguNSA4LjVDNjYuOSA4LjUgNjUuNSA5LjggNjUuNSAxMS41VjIyLjRDNjUuNSAyNC4xIDY2LjggMjUuNCA2OC41IDI1LjRaIiBmaWxsPSIjRkY2OTAwIi8+CjxnIG9wYWNpdHk9IjAuNiI+CjxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTEyNS40IDE5LjdDMTI1LjQgMjEuNCAxMjQuMSAyMi43IDEyMi40IDIyLjdDMTIwLjcgMjIuNyAxMTkuNCAyMS40IDExOS40IDE5LjdDMTE5LjQgMTggMTIwLjcgMTYuNyAxMjIuNCAxNi43QzEyNC4xIDE2LjcgMTI1LjQgMTguMSAxMjUuNCAxOS43WiIgZmlsbD0iI0ZGNjkwMCIvPgo8L2c+CjxwYXRoIGQ9Ik0yMTQuMSAwVjQuNkMyMTQuMSA2LjIgMjE1LjQgNy42IDIxNy4xIDcuNkMyMTguOCA3LjYgMjIwLjEgNi4zIDIyMC4xIDQuNlYwSDIxNC4xWiIgZmlsbD0iIzY3NjdFQyIvPgo8cGF0aCBkPSJNMTMyIDEyLjlDMTMyIDcuMzAwMDEgMTM2LjYgMi43MDAwMSAxNDIuMiAyLjcwMDAxQzE0Ny44IDIuNzAwMDEgMTUyLjQgNy4zMDAwMSAxNTIuNCAxMi45QzE1Mi40IDE4LjUgMTQ3LjggMjMuMSAxNDIuMiAyMy4xQzEzNi42IDIzLjEgMTMyIDE4LjUgMTMyIDEyLjlaTTE0OS42IDEyLjlDMTQ5LjYgOC44MDAwMSAxNDYuMyA1LjUwMDAxIDE0Mi4yIDUuNTAwMDFDMTM4LjEgNS41MDAwMSAxMzQuOCA4LjgwMDAxIDEzNC44IDEyLjlDMTM0LjggMTcgMTM4LjEgMjAuMyAxNDIuMiAyMC4zQzE0Ni4zIDIwLjMgMTQ5LjYgMTcgMTQ5LjYgMTIuOVoiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggZD0iTTEzOC40IDEyLjlDMTM4LjQgMTAuOCAxNDAuMSA5IDE0Mi4zIDlDMTQ0LjQgOSAxNDYuMiAxMC43IDE0Ni4yIDEyLjlDMTQ2LjIgMTUuMSAxNDQuNSAxNi44IDE0Mi4zIDE2LjhDMTQwLjEgMTYuOCAxMzguNCAxNSAxMzguNCAxMi45Wk0xNDMuMyAxMi45QzE0My4zIDEyLjMgMTQyLjggMTEuOCAxNDIuMiAxMS44QzE0MS42IDExLjggMTQxLjEgMTIuMyAxNDEuMSAxMi45QzE0MS4xIDEzLjUgMTQxLjYgMTQgMTQyLjIgMTRDMTQyLjggMTQgMTQzLjMgMTMuNSAxNDMuMyAxMi45WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNMTg5LjEgMjYuMkMxODkuMSAyMy4zIDE5MS40IDIxIDE5NC4zIDIxQzE5Ny4yIDIxIDE5OS41IDIzLjMgMTk5LjUgMjYuMkMxOTkuNSAyOS4xIDE5Ny4yIDMxLjQgMTk0LjMgMzEuNEMxOTEuNCAzMS40IDE4OS4xIDI5LjEgMTg5LjEgMjYuMlpNMTk1LjggMjYuMkMxOTUuOCAyNS40IDE5NS4yIDI0LjggMTk0LjQgMjQuOEMxOTMuNiAyNC44IDE5MyAyNS40IDE5MyAyNi4yQzE5MyAyNyAxOTMuNiAyNy42IDE5NC40IDI3LjZDMTk1LjIgMjcuNiAxOTUuOCAyNyAxOTUuOCAyNi4yWiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNNjguNSAyNS40QzcwLjEgMjUuNCA3MS41IDI0LjEgNzEuNSAyMi40VjExLjVDNzEuNSA5LjkgNzAuMiA4LjUgNjguNSA4LjVDNjYuOSA4LjUgNjUuNSA5LjggNjUuNSAxMS41VjIyLjRDNjUuNSAyNC4xIDY2LjggMjUuNCA2OC41IDI1LjRaIiBmaWxsPSIjRkY2OTAwIi8+CjxwYXRoIGQ9Ik0xMjUuNCAxOS43QzEyNS40IDIxLjQgMTI0LjEgMjIuNyAxMjIuNCAyMi43QzEyMC43IDIyLjcgMTE5LjQgMjEuNCAxMTkuNCAxOS43QzExOS40IDE4IDEyMC43IDE2LjcgMTIyLjQgMTYuN0MxMjQuMSAxNi43IDEyNS40IDE4LjEgMTI1LjQgMTkuN1oiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggZD0iTTAgMFY4LjRDMCAxMCAxLjMgMTEuNCAzIDExLjRDNC43IDExLjQgNiAxMC4xIDYgOC40VjBIMFoiIGZpbGw9IiNGRkIzMDAiLz4KPHBhdGggZD0iTTEzMiAxMi45QzEzMiA3LjMwMDAxIDEzNi42IDIuNzAwMDEgMTQyLjIgMi43MDAwMUMxNDcuOCAyLjcwMDAxIDE1Mi40IDcuMzAwMDEgMTUyLjQgMTIuOUMxNTIuNCAxOC41IDE0Ny44IDIzLjEgMTQyLjIgMjMuMUMxMzYuNiAyMy4xIDEzMiAxOC41IDEzMiAxMi45Wk0xNDkuNiAxMi45QzE0OS42IDguODAwMDEgMTQ2LjMgNS41MDAwMSAxNDIuMiA1LjUwMDAxQzEzOC4xIDUuNTAwMDEgMTM0LjggOC44MDAwMSAxMzQuOCAxMi45QzEzNC44IDE3IDEzOC4xIDIwLjMgMTQyLjIgMjAuM0MxNDYuMyAyMC4zIDE0OS42IDE3IDE0OS42IDEyLjlaIiBmaWxsPSIjRUY1Mjg1Ii8+CjxwYXRoIGQ9Ik0xMzguNCAxMi45QzEzOC40IDEwLjggMTQwLjEgOSAxNDIuMyA5QzE0NC40IDkgMTQ2LjIgMTAuNyAxNDYuMiAxMi45QzE0Ni4yIDE1LjEgMTQ0LjUgMTYuOCAxNDIuMyAxNi44QzE0MC4xIDE2LjggMTM4LjQgMTUgMTM4LjQgMTIuOVpNMTQzLjMgMTIuOUMxNDMuMyAxMi4zIDE0Mi44IDExLjggMTQyLjIgMTEuOEMxNDEuNiAxMS44IDE0MS4xIDEyLjMgMTQxLjEgMTIuOUMxNDEuMSAxMy41IDE0MS42IDE0IDE0Mi4yIDE0QzE0Mi44IDE0IDE0My4zIDEzLjUgMTQzLjMgMTIuOVoiIGZpbGw9IiNGRkIzMDAiLz4KPHBhdGggZD0iTTE4OS4xIDI2LjJDMTg5LjEgMjMuMyAxOTEuNCAyMSAxOTQuMyAyMUMxOTcuMiAyMSAxOTkuNSAyMy4zIDE5OS41IDI2LjJDMTk5LjUgMjkuMSAxOTcuMiAzMS40IDE5NC4zIDMxLjRDMTkxLjQgMzEuNCAxODkuMSAyOS4xIDE4OS4xIDI2LjJaTTE5NS44IDI2LjJDMTk1LjggMjUuNCAxOTUuMiAyNC44IDE5NC40IDI0LjhDMTkzLjYgMjQuOCAxOTMgMjUuNCAxOTMgMjYuMkMxOTMgMjcgMTkzLjYgMjcuNiAxOTQuNCAyNy42QzE5NS4yIDI3LjYgMTk1LjggMjcgMTk1LjggMjYuMloiIGZpbGw9IiNGRkIzMDAiLz4KPHBhdGggZD0iTTY4LjUgMjUuNEM3MC4xIDI1LjQgNzEuNSAyNC4xIDcxLjUgMjIuNFYxMS41QzcxLjUgOS45IDcwLjIgOC41IDY4LjUgOC41QzY2LjkgOC41IDY1LjUgOS44IDY1LjUgMTEuNVYyMi40QzY1LjUgMjQuMSA2Ni44IDI1LjQgNjguNSAyNS40WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNNzUuOTAwMiA0NS42QzcwLjMwMDIgNDUuNiA2NS43MDAyIDUwLjIgNjUuNzAwMiA1NS44SDY4LjUwMDJINzIuMDAwMkg3NC44MDAySDc2LjkwMDJINzkuNzAwMkg4My4yMDAySDg2LjAwMDJDODYuMTAwMiA1MC4yIDgxLjUwMDIgNDUuNiA3NS45MDAyIDQ1LjZaIiBmaWxsPSIjMDBDOUIyIi8+CjxwYXRoIGQ9Ik0yMTMuNiA1NlY1MS44QzIxMy42IDUwLjEgMjEyLjIgNDguNyAyMTAuNSA0OC43QzIwOC44IDQ4LjcgMjA3LjQgNTAuMSAyMDcuNCA1MS44VjU2SDIxMy42WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNMTI1LjQgMTkuN0MxMjUuNCAyMS40IDEyNC4xIDIyLjcgMTIyLjQgMjIuN0MxMjAuNyAyMi43IDExOS40IDIxLjQgMTE5LjQgMTkuN0MxMTkuNCAxOCAxMjAuNyAxNi43IDEyMi40IDE2LjdDMTI0LjEgMTYuNyAxMjUuNCAxOC4xIDEyNS40IDE5LjdaIiBmaWxsPSIjMDBDOUIyIi8+CjxwYXRoIGQ9Ik0xNzUuNSAwVjYuNUMxNzUuNSA4LjEgMTc2LjggOS41IDE3OC41IDkuNUMxODAuMSA5LjUgMTgxLjUgOC4yIDE4MS41IDYuNVYwSDE3NS41WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNNDMuNjAwNCAxMi45QzQ1LjIwMDQgMTEuMyA0Ni4xMDA0IDkuMSA0Ni4xMDA0IDYuOEM0Ni4xMDA0IDQuNSA0NS4yMDA0IDIuMyA0My42MDA0IDAuN0w0My4wMDA0IDBIMzguODAwNEMzOS4yMDA0IDAuOCAzOS43MDA0IDEuNSA0MC40MDA0IDIuMkw0MS4zMDA0IDMuMUM0Mi4zMDA0IDQuMSA0Mi44MDA0IDUuNCA0Mi44MDA0IDYuOEM0Mi44MDA0IDguMiA0Mi4zMDA0IDkuNSA0MS4zMDA0IDEwLjVMNDAuOTAwNCAxMC45QzM5LjMwMDQgMTIuNSAzOC40MDA0IDE0LjcgMzguNDAwNCAxN0MzOC40MDA0IDE5LjMgMzkuMzAwNCAyMS41IDQwLjkwMDQgMjMuMUM0MS42MDA0IDIzLjggNDIuNjAwNCAyMy44IDQzLjMwMDQgMjMuMUM0NC4wMDA0IDIyLjQgNDQuMDAwNCAyMS40IDQzLjMwMDQgMjAuN0M0Mi4zMDA0IDE5LjcgNDEuODAwNCAxOC40IDQxLjgwMDQgMTdDNDEuODAwNCAxNS42IDQyLjMwMDQgMTQuMyA0My4zMDA0IDEzLjNMNDMuNjAwNCAxMi45WiIgZmlsbD0iIzY3NjdFQyIvPgo8cGF0aCBkPSJNMTQ1LjIgNTZWNTAuOVY0MS40QzE0NS4yIDM5LjggMTQzLjkgMzguNSAxNDIuMyAzOC41QzE0MC43IDM4LjUgMTM5LjQgMzkuOCAxMzkuNCA0MS40VjUwLjlWNTZIMTQ1LjJaIiBmaWxsPSIjNjc2N0VDIi8+CjxwYXRoIGQ9Ik0xNzYuNSA1Mi4xQzE3Ni41IDUzLjUgMTc2IDU0LjggMTc1IDU1LjhMMTc0LjkgNTUuOUgxNzkuMUMxNzkuNyA1NC43IDE4MCA1My40IDE4MCA1Mi4xQzE4MCA0OS44IDE3OS4xIDQ3LjYgMTc3LjUgNDZDMTc2LjggNDUuMyAxNzUuOCA0NS4zIDE3NS4xIDQ2QzE3NC40IDQ2LjcgMTc0LjQgNDcuNyAxNzUuMSA0OC40QzE3NiA0OS40IDE3Ni41IDUwLjcgMTc2LjUgNTIuMVoiIGZpbGw9IiMwMEM5QjIiLz4KPHBhdGggZD0iTTExNy45IDU2VjM2LjVDMTE3LjkgMzQuOSAxMTYuNiAzMy41IDExNC45IDMzLjVDMTEzLjMgMzMuNSAxMTEuOSAzNC44IDExMS45IDM2LjVWNTZIMTE3LjlaIiBmaWxsPSIjRkY2OTAwIi8+CjxwYXRoIGQ9Ik0zNiA1Ni4xVjQ0LjNDMzYgNDIuNyAzNC43IDQxLjMgMzMgNDEuM0MzMS40IDQxLjMgMzAgNDIuNiAzMCA0NC4zVjU2LjFIMzZaIiBmaWxsPSIjRkY2OTAwIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iMjIwLjEiIGhlaWdodD0iNTYuMSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K')`;

@customElement('kwc-auth-example')
export class AuthView extends LitElement {
    
    @property ({type: Object})
    public view : View = { id: '' };
    
    public views : Map<string, View> = new Map<string, View>();
    
    @property ({type: String})
    public headerText : string = '';

    @property ({type: Boolean})
    public allowExit : boolean = false;

    public actions? : IActions;

    set flowDefinition(value : IViewDefinition[]) {
        if (this.flowDefinition) {
            throw new Error('Cant define twice');
        }
        value.forEach(el => {
            this.views.set(el.id, el);
        });
        this.view = this.views.get('login') || value[0];
    }

    @query('kwc-auth') authElement? : KwcAuth;

    static get styles() {
        return [
            css`
            :host {
                display: block;
            }
            kwc-auth {
                height: 100%;
            }
            h1,
            h2,
            h3,
            h4,
            p,
            a,
            input {
                font-family: 'Bariol', sans-serif;
                line-height: 1em;
            }

            h2, h3 {
                color: #414a51;
                text-align: left;
            }
            h2 {
                font-size: 24px;
            }

            h3 {
                font-size: 20px;
            }

            p {
                font-size: 20px;
                margin: 0;
            }

            p.color-grey {
                color: #9FA4A8;
            }

            a {
                color: #FF6900;
                text-decoration: none;
            }

            button {
                font-family: var(--font-body);
                text-align: center;
                margin-top: 20px;
            }
            .play {
                width: 100%;
                height: 100%;
                background-color: #2C3D4E;
            }
            .page-content,
            .login-page {
                display: flex;
                flex-flow: column;
                width: 100%;
                margin: 0 auto;
                max-width: 420px;
                align-items: stretch;
                flex-grow: 1;
                justify-content: space-between;
            }
            .page-content {
                height: calc(100vh - 56px);
                padding-top: 26px;
                box-sizing: border-box;
            }
            .login-page {
                background-color: var(--color-black);
                max-width: 100%;
                height: 100vh;
            }
            .login-page__container {
                display: flex;
                flex-flow: column;
                align-items: stretch;
                justify-content: center;
                height: 100%;
            }
            .login-page__container kwc-auth {
                height: auto;
                width: 100%;
                max-width: 360px;
            }
            .login-page footer {
                max-width: 420px;
                align-self: center;
            }
            .back-button {
                display: flex;
            }
            .back-button a {
                display: flex;
                align-items: center;
                color: #414A51;
                font-weight: bold;
                text-decoration: none;
            }
            .back-button a img {
                margin-right: 10px;
            }
            .back-button:hover a {
                color: #2a3035;
                text-decoration: underline;
                cursor: pointer;
            }
            header {
                position: relative;
                height: 56px;
                width: 100%;
                background-color: #D95000;
                display: flex;
                flex-direction: column;
                justify-content: center;
                overflow: hidden;
                background-color: #E9EBEC;
                background-repeat: no-repeat;
                background-position: calc(100% - 6px) 0px;
                background-size: contain;
            }
            .header-content {
                display: flex;
                align-items: center;
                position: relative;
                max-width: 420px;
                width: 420px;
                margin: 0 auto;
                box-sizing: border-box;
            }
            header h3,
            header img {
                display: inline-block;
                color: #434A50;
                font-size: 24px;
                margin: 0;
            }
            .world-logo {
                width: 56px;
                margin-right: 12px;
            }
            footer {
                width: 100%;
                border-top: 1px solid #E9EBEC;
                text-align: center;
                max-height: 60px;
                align-self: flex-end;
                flex-grow: 0;
                margin-top: 18px;
                box-sizing: border-box;
            }
            footer a {
                display: inline-block;
                color: darkgray;
                text-decoration: none;
                padding: 14px 10px 20px;
                font-weight: bold;
            }
            footer a:hover {
                text-decoration: underline;
            }
            .button-wrapper {
                text-align: center;
            }

            @media (max-width: 600px) {
                header {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .login-page__container {
                    height: 100vh;
                    box-sizing: border-box;
                }
                .login-page__container kwc-auth {
                    height: inherit;
                    width: 100%;
                    max-width: none;
                }
                .login-page footer {
                    max-width: none;
                    align-self: center;
                }
            }
        `,
        ];
    }
    headerTemplate() {
        const { id } = this.view;
        const privacyHeader = _('UPDATED_PRIVACY_SETTINGS', 'We\'ve updated our privacy settings');
        const signupHeader = _('SIGNUP', 'Signup');


        let header = html``;
        switch(id) {
            case 'username':
                header = this.headerContentTemplate(signupHeader);
                break;
            case 'update-username':
                header = this.headerContentTemplate(privacyHeader);
                break;
            case 'password':
                header = this.headerContentTemplate(signupHeader);
                break;
            case 'email':
                header = this.headerContentTemplate(signupHeader);
                break;
            case 'update-email':
                header = this.headerContentTemplate(privacyHeader);
                break;
            case 'success':
                header = this.headerContentTemplate(_('WELCOME_TO_KANO', 'Welcome to Kano'));
                break;
            default:
                break;
        }
        return html`
            <header id="header" style="background-image:${headerImage}" >
                ${header}
            </header>
        `;
    }

    backButtonTemplate() {
        if (typeof this.view.backButton === 'undefined') {
            return;
        }
        const button = this.view.backButton;
        return html`
            <div class="back-button">
                <a @click=${() => this.changeTemplate(button.link)} >
                    <img src=${icons.back} />
                    ${button.text}
                </a>
            </div>
        `;
    }

    headerContentTemplate(text? : string) {
        const showButton = typeof this.view.backButton !== 'undefined';
        return html`
            <div class="header-content">
                ${showButton ? this.backButtonTemplate() : this.header(text)}
            </div>
        `;
    }
    header(text?: string) {
        return html `
            <img src=${icons.world} class="world-logo" />
            <h3>${text}</h3>
        `;
    }
    handleClick(id: string) {
        this.changeTemplate(id);
    }
    handleChangeView(e: CustomEvent) {
        this.changeTemplate(e.detail.nextView);
    }
    changeTemplate(id: string) {
        this.view = this.views.get(id) || { id: 'login'};
        this.dispatchEvent(new CustomEvent('view-changed', { detail: this.view, bubbles: true, composed: true }));
    }
    renderTemplate() {
        switch(this.view.id) {
            case 'play':
                return html`
                    <div class="play"></div>
                `;
            case 'login':
                return html`
                    <div class="login-page">
                        <div class="login-page__container">
                            <kwc-auth
                            .view='${this.view.id}'
                            @changeView=${this.handleChangeView}
                            @login=${this.handleLogin}
                            ></kwc-auth>
                        </div>
                    </div>
                `;
            default:
                return html`
                    ${this.headerTemplate()}
                    <div class="page-content page-content--${this.view.id}">
                        <kwc-auth 
                            .view='${this.view.id}'
                            .allowExit=${this.allowExit}
                            @changeView=${this.handleChangeView}
                            @submit-username=${this.handleSubmitUsername}
                            @submit-password=${this.handleSubmitPassword}
                            @login=${this.handleLogin}
                            @register=${this.handleRegister}
                            @update-username=${this.handleUpdateUsername}
                            @update-email=${this.handleUpdateEmail}
                            @forgot-password=${this.handleForgotPassword}
                            @forgot-username=${this.handleForgotUsername}
                            @forgot-email=${this.handleForgotEmail}
                            @finished-flow=${this.handleFinishedFlow}
                            @exit=${this.handleExit}
                        ></kwc-auth>
                    </div>
                `;
        }
    }

    render() {
        return this.renderTemplate();
    }
    validateForm(form: IForm) {
        return form && form.username && form.password && form.email;
    }
    getActions() {
        if (!this.actions) {
            throw new Error('Could not configure auth: actions id not defined');
        }
        return this.actions;
    }

    setLoading(state : boolean) {
        const el = this.authElement;
        if (!el) {
            return;
        }
        el.loading = state;
    }

    displayError(message : string, getter : (el : KwcAuth) => SingleInputElement|Login|undefined) {
        const auth = this.authElement;
        if (!auth) {
            return;
        }
        const el = getter(auth);
        if (!el) {
            return;
        }
        el.error = message || _('SOMETHING_WENT_WRONG', 'Something went wrong, please try again later');
    }

    wrapTask(task : () => Promise<any>) {
        this.setLoading(true);
        return task()
            .then((v : any) => {
                this.setLoading(false);
                return v;
            })
            .catch((e) => {
                this.setLoading(false);
                throw e;
            });
    }

    handleSubmitUsername(e : CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().checkUsernameAvailability(e.detail)
                .then(() => this.changeTemplate('password'))
                .catch((e) => this.displayError(e.message, (el) => el.username));
        });        
    }

    handleSubmitPassword() {
        return this.wrapTask(() => {
            return new Promise((resolve) => setTimeout(resolve, 500))
                .then(() => this.changeTemplate('email'))
        });        
    }

    handleLogin(e: CustomEvent) {
        // Reset error initially
        this.displayError(' ', (el) => el.login)
        return this.wrapTask(() => {
            return this.getActions().login(e.detail)
                .then((user) => {
                    if (user.attributes && user.attributes.username && user.attributes.username === 'invalid') {
                        this.changeTemplate('update-username');
                    } else if (user.attributes && user.attributes.email && (user.attributes.email === 'invalid' || user.attributes.email === 'removed')) {
                        this.changeTemplate('update-email');
                    } else {
                        this.changeTemplate('play');
                    }
                })
                .catch((e) => {
                    this.displayError(e.message, (el) => el.login);
                });
        });
    }
    handleRegister(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().register(e.detail.form)
                .then(() => this.changeTemplate('success'))
                .catch((e) => {
                    // TODO: Handle error codes here
                    this.displayError(e.message, (el) => el.forgotPassword);
                });
        });
    }
    handleUpdateUsername(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().updateUsername(e.detail)
                .then(() => this.changeTemplate('update-email'))
                .catch((e) => this.displayError(e.message, (el) => el.username));
        });
    }
    handleUpdateEmail(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().updateEmail(e.detail)
                .then(() => this.changeTemplate('play'))
                .catch((e) => this.displayError(e.message, (el) => el.email));
        });
    }
    handleForgotPassword(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().forgotPassword(e.detail)
                .then(() => this.changeTemplate('login'))
                .catch((e) => this.displayError(e.message, (el) => el.forgotPassword));
        });
    }
    handleForgotUsername(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().forgotUsername(e.detail)
                .then(() => this.changeTemplate('login'))
                .catch((e) => this.displayError(e.message, (el) => el.forgotUsername));
        });
    }
    handleForgotEmail(e: CustomEvent) {
        this.getActions().forgotEmail(e.detail)
            .then(() => this.changeTemplate('play'));
    }
    handleFinishedFlow() {
        this.getActions().finish()
            .then(() => this.changeTemplate('play'));
    }
    handleResendEmail() {
        this.getActions().resendEmail('userId')
            .then(() => this.changeTemplate('play'));
    }
    handleExit() {
        this.getActions().exit();
    }
}

export default AuthView;
