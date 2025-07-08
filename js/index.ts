import { Game } from 'canvas-lord/core/engine';
import { MenuScene } from './scenes/menu-scene.ts';
import { WiggleScene } from './scenes/wiggle-scene';

const game = new Game('game', {
	fps: 60,
	backgroundColor: '#323232',
});

if (false as boolean) {
	const scene = new WiggleScene();
	game.pushScene(scene);
} else {
	game.pushScene(new MenuScene());
}
game.start();
