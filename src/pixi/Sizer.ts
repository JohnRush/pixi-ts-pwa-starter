import * as PIXI from "pixi.js";
import { handleResizeComplete } from "./HandleResizeComplete";

export type Sizer = {
  width: () => number;
  height: () => number;
};

export const WindowSizer = (window: Window) => ({
  width: () => window.innerWidth,
  height: () => window.innerHeight,
});

export const HtmlSizer = (target: HTMLElement) => ({
  width: () => target.clientWidth,
  height: () => target.clientHeight,
});

export function appResizer(
  app: PIXI.Application,
  sizer: Sizer,
  onWindowResizeComplete?: (width: number, height: number) => unknown
) {
  const resizeCompleteHandler = handleResizeComplete(
    window,
    250,
    resizeHandler
  );

  function resizeHandler() {
    const width = sizer.width();
    const height = sizer.height();
    app.renderer.resize(width, height);
    onWindowResizeComplete?.(width, height);
  }

  // Fixes width being too small when making the window narrower (scrollbar-width blank space)
  window.addEventListener("resize", resizeHandler);

  resizeHandler();

  return {
    dispose() {
      resizeCompleteHandler.dispose();
      window.removeEventListener("resize", resizeHandler);
    },
  };
}
