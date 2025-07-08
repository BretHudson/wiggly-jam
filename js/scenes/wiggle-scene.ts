import { Entity } from 'canvas-lord/core/entity';
import { Input, Keys } from 'canvas-lord/core/input';
import { Scene } from 'canvas-lord/core/scene';
import { Vec2 } from 'canvas-lord/math';
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
			enemyPusherSystem,
		] as IEntitySystem[]);

		this.componentSystemMap.set(enemyPullerComp, [
			enemyPullerSystem,
		] as IEntitySystem[]);

		this.backgroundColor = '#333';
	}

	get cursorPos() {
		const { pos } = this.engine.input.mouse;
		return pos.add(this.camera);
	}

	init(): void {
		const halfSize = new Vec2(
			this.engine.halfWidth,
			this.engine.halfHeight,
		);
		this.camera = this.camera.sub(halfSize);

		const wiggle = new Wiggle();
		this.addEntity(wiggle);
	}

	update(input: Input) {
		let e: ((x: number, y: number) => Enemy) | undefined = undefined;
		if (input.keyPressed(Keys.Digit1)) {
			e = Enemy.createPusher;
		}
		if (input.keyPressed(Keys.Digit2)) {
			e = Enemy.createPuller;
		}
		if (e) {
			const { x, y } = this.cursorPos;
			this.addEntities(e(x, y));
		}

		if (input.keyPressed(Keys.Escape)) {
			this.engine.popScenes();
		}
	}
}
