import { Game } from './canvas-lord/core/engine.js';
import { Scene } from './canvas-lord/core/scene.js';
import { Vec2 } from './canvas-lord/math/index.js';
import { Wiggle } from './entities/wiggle.js';
const game = new Game('game', {
    fps: 60,
    backgroundColor: '#323232',
});
const scene = new Scene();
scene.onBegin.add(() => {
    console.log('scene began');
});
game.pushScene(scene);
const wiggle = new Wiggle();
scene.addEntity(wiggle);
const halfSize = new Vec2(game.halfWidth, game.halfHeight);
scene.camera = scene.camera.sub(halfSize);
game.start();
//# sourceMappingURL=index.js.map