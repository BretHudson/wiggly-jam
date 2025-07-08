import { Game } from 'canvas-lord/core/engine';
import { Vec2 } from 'canvas-lord/math';
import { WiggleScene } from './scenes/wiggle-scene';

const game = new Game('game', {
	fps: 60,
	backgroundColor: '#323232',
});

const scene = new WiggleScene();
game.pushScene(scene);

const halfSize = new Vec2(game.halfWidth, game.halfHeight);
scene.camera = scene.camera.sub(halfSize);

game.start();
