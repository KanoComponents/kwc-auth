import { css } from 'lit-element/lit-element.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';

export const styles = css`

:host {
    font-family: var(--font-body);
    display: flex;
    flex-flow: row;
    margin: 0 auto;
    justify-content: center;
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

h2, h3 {
    color: #414a51;
    text-align: left;
}
h2 {
    font-size: 24px;
}

h3 {
    font-size: 18px;
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
    margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    color: #414A51;
    box-sizing: border-box;
    width: 100%;
    min-height: 39px;
    padding-left: 2%;
    border-radius: 6px;
    border: 1px solid var(--color-grey);
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    border-color: #1093F5;
}

label {
    font-size: 12px;
    color: #9FA4A8;
}

.error {
    color: red;
    margin-bottom: 5px;
    font-size: 14px;
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

.link-wrapper {
    align-self: flex-end;
    display: block;
    width: 100%;
}

.privacy-wrapper {
    text-align: center;
}
`