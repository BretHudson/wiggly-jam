import { Game } from './canvas-lord/core/engine.js';
import { MenuScene } from "./scenes/menu-scene.js";
import { WiggleScene } from './scenes/wiggle-scene.js';
const game = new Game('game', {
    fps: 60,
    backgroundColor: '#323232',
});
if (false) {
    const scene = new WiggleScene();
    game.pushScene(scene);
}
else {
    game.pushScene(new MenuScene());
}
game.start();
//# sourceMappingURL=index.js.map