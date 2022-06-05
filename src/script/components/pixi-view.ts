import * as PIXI from 'pixi.js';
import { LitElement, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { handleResizeComplete } from '../../pixi/HandleResizeComplete';
import { textDemo } from '../../pixi/TextDemo';
import { spriteDemo } from '../../pixi/SpriteDemo';

@customElement('pixi-view')
export class PixiView extends LitElement {
  private app: PIXI.Application | undefined;
  private readonly resizeMonitor: ReturnType<typeof handleResizeComplete>;
  private scene: (() => unknown) | undefined;

  constructor() {
    super();
    this.resizeMonitor = handleResizeComplete(window, 250, () =>
      this.onContainerResized()
    );
  }

  protected firstUpdated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(changedProperties);

    this.app = new PIXI.Application({
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    this.renderRoot.appendChild(this.app.view);

    this.scene = makeScene(this.app, textDemo);

    this.onContainerResized();
  }

  private containerWidth(): number {
    return stringToNumber(
      getComputedStyle(this).getPropertyValue('width'),
      600
    );
  }

  private containerHeight(): number {
    return stringToNumber(
      getComputedStyle(this).getPropertyValue('height'),
      800
    );
  }

  private lastSize: [number, number] = [-1, -1];

  private onContainerResized() {
    if (this.app) {
      const width = this.containerWidth();
      const height = this.containerHeight();

      if (this.lastSize[0] != width || this.lastSize[1] != height) {
        // console.debug("onCanvasResized", {width, height});

        this.lastSize[0] = width;
        this.lastSize[1] = height;

        this.app.renderer.resize(width, height);

        if (this.scene) {
          this.scene();
        }
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.app) {
      this.resizeMonitor.dispose();
      this.app.destroy();
    }
  }
}

const makeScene = (
  app: PIXI.Application,
  demo: (app: PIXI.Application, stage: PIXI.Container) => unknown
) => {
  let scene = new PIXI.Container();
  const updateScene = () => {
    if (app) {
      if (scene) {
        scene.destroy();
      }
      scene = new PIXI.Container();
      app.stage.addChild(scene);
      demo(app, scene);
      spriteDemo(app, scene);
    }
  };
  return updateScene;
};

const stringToNumber = (value: string, fallback: number) => {
  const num = parseFloat(value);
  return Number.isNaN(num) ? fallback : num;
};
