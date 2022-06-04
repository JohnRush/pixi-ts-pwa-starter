import * as PIXI from "pixi.js";
// import { spriteDemo } from "./SpriteDemo";
import { textDemo } from "./TextDemo";
import { appResizer, HtmlSizer, Sizer, WindowSizer } from "./Sizer";

function createStage(
  app: PIXI.Application,
  stage?: PIXI.Container
): PIXI.Container {
  if (stage) {
    stage.destroy();
  }
  stage = new PIXI.Container();
  app.stage.addChild(stage);
  return stage;
}

type AppSizer = {
  sizer: Sizer;
  resizeTo: HTMLElement | Window;
  canvasShim: (canvas:HTMLElement)=>unknown;
}

function htmlTarget(targetId: string): AppSizer | undefined {
  const target = document.getElementById(targetId);
  if (target) {
    return {
      resizeTo: target,
      canvasShim(canvas: HTMLElement) {
        target.appendChild(canvas);
      },
      sizer: HtmlSizer(target),
    };
  }
  return undefined;
}

function windowTarget():AppSizer {
  return {
    resizeTo: window,
    canvasShim(canvas: HTMLElement) {
      document.body.prepend(canvas);
    },
    sizer: WindowSizer(window),
  };
}

/**
 * Create a PIXI.Application instance that fits where it belongs.
 * @returns An object with a dispose function for cleaning up.
 */
export function simpleApp() {
  const target = htmlTarget("pixiTarget") ?? windowTarget();

  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    // resizeTo: target.resizeTo,
    antialias: true,
  });

  target.canvasShim(app.view);

  let stage: PIXI.Container | undefined;
  function resetScene() {
    stage = createStage(app, stage);
    textDemo(app, stage);
    // spriteDemo(app, stage);
  }

  const resizer = appResizer(app, target.sizer, () => {
    resetScene();
  });

  return {
    dispose() {
      resizer.dispose();
      app.destroy(true);
    },
  };
}
