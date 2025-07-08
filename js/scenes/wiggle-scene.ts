import { Scene } from 'canvas-lord/core/scene';
import { Random } from 'canvas-lord/util/random';
import type { IEntitySystem } from 'canvas-lord/util/types';

import {
	enemyPullerComp,
	enemyPullerSystem,
	enemyPusherComp,
	enemyPusherSystem,
} from '~/components/enemy-components';
import { Enemy } from '~/entities/enemy';
import { Wiggle } from '~/entities/wiggle';

export class WiggleScene extends Scene {
	staticRandom = new Random(0);

	constructor() {
		super();

		this.componentSystemMap.set(enemyPusherComp, [
			enemyPusherSystem as IEntitySystem,
		]);

		this.componentSystemMap.set(enemyPullerComp, [
			enemyPullerSystem as IEntitySystem,
		]);
	}

	get cursorPos() {
		const { pos } = this.engine.input.mouse;
		return pos.add(this.camera);
	}

	begin(): void {
		const wiggle = new Wiggle();
		this.addEntity(wiggle);

		// const e = Enemy.createPusher();
		const e = Enemy.createPuller();

		this.addEntity(e);
	}
}
