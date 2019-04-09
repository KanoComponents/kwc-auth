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
    margin-top: 20px;
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
    width: 100%;
    padding-left: 2%;
    box-sizing: border-box;
    padding-left: 2%;
    height: 32px;
    color: #414A51;
}
.a {
    color: #FF6900;
    text-decoration: underline;
    margin-bottom: 20px;
}
.link-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
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
`