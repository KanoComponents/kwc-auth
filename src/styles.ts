import { css } from 'lit-element/lit-element.js';

export const styles = css`

:host {
    font-family: var(--font-body);
    display: flex;
    flex-flow: column;
    align-items: center;
}

.main-section {
    display: flex;
    justify-content: center;
    height: 100%;
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
    font-family: 'Bariol', sans-serif;
    font-size: 20px;
    line-height: 1em;
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
    font-family: 'Bariol', sans-serif;
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
    border: 1px solid #1093F5;
}

label {
    font-size: 12px;
    color: #9FA4A8;
}

.footer p, .footer a {
    font-size: 14px;
    font-weight: 700;
}

.back-button {
    padding-bottom: 20px;
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

.privacy-wrapper {
    text-align: center;
}
`