import { css } from 'lit-element/lit-element.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';

export const styles = css`

:host {
    font-family: var(--font-body);
    display: block;
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
    font-family: var(--font-body);
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
    font-family: var(--font-body);
    text-align: center;
    margin-top: 20px;
}

input {
    display: block;
    outline: none;
    font-size: 16px;
    font-weight: bold;
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
    color: red;
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    left: 130px;
    font-weight: bold;
}

.eye-toggle {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
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
    font-size: 16px;
    padding: 0;
}

.link-wrapper {
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 16px 0 0;
    border-top: 1px solid #E9EBEC;
    height: 32px;
    font-size: 16px;
}

[hidden] {
    display: none;
}

.privacy-wrapper {
    text-align: center;
}

.header {
    background-color: var(--color-stone);
    border-radius: 6px 6px 0 0;
    padding: 20px;
}
`;
