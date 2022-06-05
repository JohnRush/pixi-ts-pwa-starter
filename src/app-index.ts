import { LitElement, html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { registerSW } from 'virtual:pwa-register';

import './styles/global.css';
import './script/components/pixi-flex';
import './script/components/pixi-view';

@customElement('app-index')
export class AppIndex extends LitElement {
  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    registerSW({ immediate: true });
  }

  render() {
    return html`<pixi-flex></pixi-flex>`;
  }
}
