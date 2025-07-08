import { Game } from './canvas-lord/core/engine.js';
import { MenuScene } from "./scenes/menu-scene.js";
import { WiggleScene } from './scenes/wiggle-scene.js';
const game = new Game('game', {
    fps: 60,
    backgroundColor: '#323232',
});
const menu = new MenuScene();
game.pushScene(menu);
if (true) {
    menu.onBegin.add(() => {
        game.pushScene(new WiggleScene());
    });
}
game.start();
//# sourceMappingURL=index.js.map