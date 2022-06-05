import { LitElement, css, html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-pixi-text')
export class AppPixiText extends LitElement {
  static get styles() {
    return css`
    div {
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
    return html`<div><pixi-view></pixi-view></div>`
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
  }
}