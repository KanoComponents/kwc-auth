import { css } from 'lit-element/lit-element.js';

export const styles = css`

:host {
    font-family: var(--font-body);
    display: flex;
    flex-flow: column;
    align-items: center;
    border: 1px solid grey;
    padding: 12px;
    border-radius: 12px;
}
h2 {
    color: #414a51;
    font-size: 24px;
    text-align: left;
}

h4 {
    text-align: center;
}
button {
    font-family: var(--font-body);
    justify-content: center;
}

.back-button {
    padding-bottom: 20px;
}

input {
    display: block;
    border: 1px solid #ccc;
    outline: none;
    font-size: 16px;
    font-family: 'Bariol', sans-serif;
    font-weight: bold;
}
input[type="text"],
input[type="email"],
input[type="password"] {
    // width: 387px;
    color: #414A51;
    box-sizing: border-box;
    height: 39px;
    width: 100%;
    padding-left: 2%;
    border-radius: 6px;
    border: 1px solid #1093F5
}

.input-wrapper {
    padding-bottom: 83px;
}

.a {
    color: grey;
    text-decoration: underline;
    margin-bottom: 20px;
}
.link-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
}

.linkToLogin{
    height: 20px;
    width: 251px;
    color: #9FA4A8;
    font-family: Bariol;
    font-size: 20px;
    line-height: 20px;
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

.input-password-wrapper {
    position: relative
}

.privacy-wrapper {
    text-align: center;
}

.privacy-policy {
    color: #9FA4A8;
    font-family: Bariol;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
}
`