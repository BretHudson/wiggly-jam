import { Scene } from 'canvas-lord/core/scene';
import { Random } from 'canvas-lord/util/random';
import type { IEntitySystem } from 'canvas-lord/util/types';

import { Enemy, enemyComp, enemySystem } from '~/entities/enemy';
import { Wiggle } from '~/entities/wiggle';

export class WiggleScene extends Scene {
	random = new Random(0);

	constructor() {
		super();

		this.componentSystemMap.set(enemyComp, [enemySystem as IEntitySystem]);
	}

	begin(): void {
		const wiggle = new Wiggle();
		this.addEntity(wiggle);

		const e = new Enemy();
		e.target.setXY(100, 20);
		const c = e.addComponent(enemyComp)!;

		this.addEntity(e);
	}
}
