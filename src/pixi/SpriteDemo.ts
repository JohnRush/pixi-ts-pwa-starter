import * as PIXI from "pixi.js";
// import bunnyImage from "url:../assets/images/bunny.png";

export function spriteDemo(app: PIXI.Application, stage: PIXI.Container) {
  const bunny = PIXI.Sprite.from("bunnyImage");
  if(bunny && bunny.width > 1) {
    stage.addChild(new PIXI.Text("Sprite Demo"));

    // move the sprite to the center of the screen
    bunny.anchor.set(0.5);
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    stage.addChild(bunny);

    app.ticker.add((delta) => {
      bunny.rotation += 0.1 * delta;
    });
  } else {
    stage.addChild(new PIXI.Text("Sprite Demo (missing assets)"));
  }
}
