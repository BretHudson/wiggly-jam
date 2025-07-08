import { Input } from 'canvas-lord/core/input';
import { Scene } from 'canvas-lord/core/scene';
import { Text } from 'canvas-lord/graphic/text';
import { Random } from 'canvas-lord/util/random';
import type { IEntitySystem } from 'canvas-lord/util/types';

import {
	enemyPullerComp,
	enemyPullerSystem,
	enemyPusherComp,
	enemyPusherSystem,
} from '~/components/enemy-components';
import { Button } from '~/entities/button';
import { WiggleScene } from './wiggle-scene';
import { CL } from 'canvas-lord/core/CL';

export class MenuScene extends Scene {
	staticRandom = new Random(0);
	logo: Text;
	firstTime = true;

	constructor() {
		super();

		this.componentSystemMap.set(enemyPusherComp, [
			enemyPusherSystem as IEntitySystem,
		]);

		this.componentSystemMap.set(enemyPullerComp, [
			enemyPullerSystem as IEntitySystem,
		]);

		const logo = new Text('Wiggle Ring Defense');
		logo.font = 'Ole';
		logo.size = 72;
		logo.align = 'center';
		logo.alpha = -0.05;
		this.logo = logo;
		this.addGraphic(logo);

		const resetCursor = () => {
			CL.input.mouse.cursor = 'default';
		};
		this.onPause.add(resetCursor);
		// this.onPreUpdate.add(resetCursor);
	}

	get cursorPos() {
		const { pos } = this.engine.input.mouse;
		return pos.add(this.camera);
	}

	begin(): void {
		if (!this.firstTime) return;

		this.firstTime = false;
		const { width, halfWidth, height, halfHeight } = this.engine;
		this.logo.x = halfWidth;
		this.logo.y = height / 6;

		const buttonY = (height * 2) / 3;
		const playButton = new Button(halfWidth, buttonY);
		playButton.onClick.add(() => {
			console.log('here we goooo');
			this.engine.pushScene(new WiggleScene());
		});
		this.addEntities(playButton);
	}

	update() {
		if (this.logo.alpha < 1) this.logo.alpha += 0.05;
	}
}
