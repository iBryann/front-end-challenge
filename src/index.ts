import { html, render } from 'lit';
const header = document.querySelector<HTMLElement>('.header')!;

const element = html`
  <h1>Olá!</h1>
`;

render(element, header);
