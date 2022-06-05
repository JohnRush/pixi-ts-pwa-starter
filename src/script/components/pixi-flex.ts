import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('pixi-flex')
export class PixiFlex extends LitElement {
  static get styles() {
    return css`
    section {
      height: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      overflow: hidden;
    }
    pixi-view {
      flex-grow: 1;
      min-height: 0;
    }`;
  }

  constructor() {
    super();
  }

  render() {
    const headerText = "";
    const footerText = "";
    return html`
    <section>
      <header>${headerText}</header>
      <pixi-view></pixi-view>
      <footer>${footerText}</footer>
    </section>`;
  }
}