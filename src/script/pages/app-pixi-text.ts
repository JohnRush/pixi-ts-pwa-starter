import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
// import * as PIXI from "pixi.js";

@customElement('app-pixi-text')
export class AppPixiText extends LitElement {
  static get styles() {
    return css`
    section {
      height: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
    }
    #pixiTarget {
      background-color: antiquewhite;
      flex-grow: 1;
      min-height: 0;
    }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <section>
      <h1>Pixi Starter</h1>
      <div id="pixiTarget"></div>
    </section>
    `;
  }
}
