import { Draw } from 'canvas-lord/util/draw';
import { Entity } from 'canvas-lord/core/entity';
import { Input, Keys } from 'canvas-lord/core/input';
import { Camera } from 'canvas-lord/util/camera';
import { Ctx } from 'canvas-lord/util/canvas';
import { Vec2 } from 'canvas-lord/math';

export class Wiggle extends Entity {
	constructor(x?: number, y?: number) {
		super(x, y);
	}

	update(input: Input) {
		//
	}

	render(ctx: Ctx, camera: Camera) {
		let pos = this.pos;
		pos = pos.sub(camera);
		const p2 = pos.add(new Vec2(100, 100));

		const r = 100;
		Draw.circle(
			ctx,
			{
				color: 'yellow',
				type: 'stroke',
			},
			pos.x - r,
			pos.y - r,
			r,
		);

		Draw.line(
			ctx,
			{
				color: 'red',
				type: 'stroke',
			},
			pos.x,
			pos.y,
			p2.x,
			p2.y,
		);
	}
}
