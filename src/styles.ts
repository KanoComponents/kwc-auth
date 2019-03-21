import { css } from 'lit-element';

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
    margin-bottom: 32px;
}

h4 {
    text-align: center;
}

button {
    font-family: var(--font-body);
    justify-content: center;
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
    font-size: 16px;
    border-radius: 6px;
    margin: 6px 0 16px;
    width: 98%;
    padding-left: 2%;
    height: 32px;
    color: #414A51;
}

.a {
    color: #FF6900;
    text-decoration: underline;
}

.link-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
}


`