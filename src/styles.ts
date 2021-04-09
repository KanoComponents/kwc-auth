import { css } from 'lit-element/lit-element.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';

export const styles = css`

:host {
    font-family: "proxima", Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 auto;
}

.main-section {
    display: flex;
    justify-content: center;
    height: 100%;
    flex-wrap: wrap;
}

.form-template {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1;
}
.form-template > div {
    width: 100%;
}

.form-wrapper {
    position: relative;
}

h1,
h2,
h3,
h4,
p,
a,
input {
    font-family: "proxima", Helvetica, Arial, sans-serif;
    line-height: 1.25em;
}


p,
span {
    color: #9FA4A8;
}

h2, h3, h4 {
    color: #414a51;
    text-align: left;
}
h2 {
    font-size: 24px;
}

h3 {
    font-size: 20px;
    margin: 0;
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
    margin-bottom: 20px;
    text-decoration: none;
}

button {
    font-family: "proxima", Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 20px;
}

input {
    display: block;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    margin: 6px 0 15px;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder {
    color: var(--color-grey);
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    color: #414A51;
    box-sizing: border-box;
    width: 100%;
    min-height: 39px;
    padding-left: 10px;
    border-radius: 6px;
    border: 1px solid var(--color-stone);
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    border-color: #1093F5;
}

label {
    font-weight: bold;
    font-size: 12px;
    color: #9FA4A8;
}

.error {
    color: var(--color-kano-orange);
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    max-width: 275px;
}

.eye-toggle {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    padding: 8px 10px;
    cursor: pointer;
}

.input-wrapper {
    position: relative;
}
.link-wrapper a.privacy {
    margin-bottom: 0px;
    font-weight: bold;
    color: var(--color-grey);
}

.link-wrapper p {
    font-weight: bold;
    font-size: 14px;
    padding: 0;
    color: var(--color-grey);
}

.link-wrapper {
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 32px;
    margin: 16px 0 12px;
    padding: 0 10px;
    font-size: 14px;
}
.link-wrapper__info {
    display: flex;
    align-items: center;
}
.link-wrapper__info img {
    margin-right: 14px;
}

[hidden] {
    display: none;
}

.privacy-wrapper {
    text-align: center;
}

.intro {
    font-weight: bold;
    font-size: 16px;
    color: var(--color-kano-orange);
}
.password__username {
    font-size: 40px;
    color: #6767EC;
    margin: 8px 0 1px;
    max-width: 420px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.password__input {
    margin: 6px 0 0;
}
.breaker {
    height: 1px;
    background-color: #C4C4C4;
    border-radius: 6px;
}
.instruction {
    font-size: 16px;
    font-weight: 500;
    margin: 6px 0px 16px;
}
.input-title {
    font-weight: bold;
    font-size: 14px;
    color: #6767EC;
}

.header {
    background-color: var(--color-stone);
    border-radius: 6px 6px 0 0;
    padding: 20px;
}
.button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}
.button-wrapper button {
    min-width: min-content;
    margin: 0;
    font-family: "proxima", Helvetica, Arial, sans-serif;
}
.button-wrapper__exit {
    font-weight: bold;
    float: right;
    margin: 10px 0;
}
`;
