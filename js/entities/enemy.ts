import { Input } from 'canvas-lord/core/input';
import { Sprite } from 'canvas-lord/graphic';
import { Vec2 } from 'canvas-lord/math';

import {
	EnemyComponent,
	enemyPullerComp,
	enemyPusherComp,
} from '~/components/enemy-components';
import { WiggleSceneEntity } from '~/entities/wiggle-scene-entity';

const approach = (a: Vec2, target: Vec2, amount: number): Vec2 => {
	const delta = target.sub(a);
	const mag = delta.magnitude;
	if (mag <= amount) return a.add(delta);

	delta.normalize();
	return a.add(delta.scale(amount));
};

export class Enemy extends WiggleSceneEntity {
	target = new Vec2();
	ready = false;
	speed = 0;

	set graphic(value: Sprite) {
		super.graphic = value;
	}

	get graphic(): Sprite {
		return super.graphic as Sprite;
	}

	static createType(c: EnemyComponent, x: number, y: number, color: string) {
		const e = new Enemy(x, y, color);
		const comp = e.addComponent(c)!;
		e.speed = comp.speed;
		return e;
	}

	static createPusher(x: number, y: number) {
		return Enemy.createType(enemyPusherComp, x, y, '#AA4A44');
	}

	static createPuller(x: number, y: number) {
		return Enemy.createType(enemyPullerComp, x, y, 'blue');
	}

	constructor(x: number, y: number, color: string) {
		const gfx = Sprite.createRect(32, 32, color);
		gfx.centerOO();
		super(x, y, gfx);
	}

	update(input: Input) {
		this.pos = approach(this.pos, this.target, this.speed);
		this.ready = this.pos.equal(this.target);

		if (input.mousePressed(0)) {
			this.target.set(this.scene.cursorPos);
		}
	}
}
