import { Game } from 'canvas-lord/core/engine';
import { MenuScene } from './scenes/menu-scene.ts';
import { WiggleScene } from './scenes/wiggle-scene';

const game = new Game('game', {
	fps: 60,
	backgroundColor: '#323232',
});

const menu = new MenuScene();
game.pushScene(menu);

if (true as boolean) {
	menu.onBegin.add(() => {
		game.pushScene(new WiggleScene());
	});
}
game.start();
