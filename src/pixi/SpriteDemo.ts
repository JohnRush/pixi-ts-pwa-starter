import * as PIXI from "pixi.js";
import imagePath from "./icon_48.png";

export function spriteDemo(app: PIXI.Application, stage: PIXI.Container) {
  const loader = PIXI.Loader.shared;

  let status: PIXI.Text;
  if(!loader.resources.theImage) {
    loader.add("theImage", imagePath);
    status = stage.addChild(new PIXI.Text("Sprite Demo (loading)"));
  }

  loader.load((loader, resources) => {
    if(resources && resources.theImage) {
      const texture = resources.theImage.texture;
      const sprite = new PIXI.Sprite(texture);
      stage.removeChild(status);
      stage.addChild(new PIXI.Text("Sprite Demo (working)"));

      // move the sprite to the center of the screen
      sprite.anchor.set(0.5);
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;

      stage.addChild(sprite);

      app.ticker.add((delta) => {
        sprite.rotation += 0.1 * delta;
      });
    } else {
      stage.removeChild(status);
      stage.addChild(new PIXI.Text("Sprite Demo (missing assets)"));
    }
  })
}