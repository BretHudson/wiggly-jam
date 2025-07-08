import { Input, Keys } from 'canvas-lord/core/input';
import { Sprite } from 'canvas-lord/graphic';
import { Vec2 } from 'canvas-lord/math';
import { Camera } from 'canvas-lord/util/camera';
import { Ctx } from 'canvas-lord/util/canvas';
import * as Components from 'canvas-lord/util/components';

import { WiggleSceneEntity } from './wiggle-scene-entity';

interface EnemySystem {
	update?: (entity: Enemy, input: Input) => void;
	render?: (entity: Enemy, ctx: Ctx, camera: Camera) => void;
}

export const enemyComp = Components.createComponent({
	target: new Vec2(0, 0),
});

export const enemySystem: EnemySystem = {
	update: (entity, input) => {
		if (input.keyCheck(Keys.Space)) {
			entity.x += 1;
		}
	},
};

const approach = (a: Vec2, target: Vec2, amount: number): Vec2 => {
	const delta = target.sub(a);
	const mag = delta.magnitude;
	if (mag <= amount) return a.add(delta);

	delta.normalize();
	return a.add(delta.scale(amount));
};

export class Enemy extends WiggleSceneEntity {
	target = new Vec2();

	constructor(x?: number, y?: number) {
		const gfx = Sprite.createRect(32, 32, 'cyan');
		gfx.centerOO();
		super(x, y, gfx);
	}

	update(input: Input) {
		this.pos = approach(this.pos, this.target, 5);

		if (input.mousePressed(0)) {
			const mousePos = input.mouse.pos;
			const { camera } = this.scene;
			const relativeMousePos = mousePos.add(camera);
			this.target.set(relativeMousePos);
		}
	}
}
