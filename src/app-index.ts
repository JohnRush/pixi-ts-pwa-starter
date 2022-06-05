import { LitElement, css, html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { registerSW } from 'virtual:pwa-register';

import './script/components/pixi-view';
import './script/components/app-pixi-text';
import './styles/global.css';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`
    :host {
      background-color: blue;
    }`
  }

  constructor() {
    super();
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    registerSW({ immediate: true });
  }

  render() {
    return html`</div><app-pixi-text></app-pixi-text>`;
  }
}
