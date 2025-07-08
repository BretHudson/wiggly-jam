import { Input } from 'canvas-lord/core/input';
import { Camera } from 'canvas-lord/util/camera';
import { Ctx } from 'canvas-lord/util/canvas';
import * as Components from 'canvas-lord/util/components';

import type { Enemy } from '~/entities/enemy';

interface EnemySystem {
	update?: (entity: Enemy, input: Input) => void;
	render?: (entity: Enemy, ctx: Ctx, camera: Camera) => void;
}

export const enemyPusherComp = Components.createComponent({
	speed: 5,
});

export const enemyPusherSystem: EnemySystem = {
	update: (entity, input) => {
		const comp = entity.component(enemyPusherComp)!;
		entity.graphic.color = entity.ready ? 'red' : 'white';
	},
};

export const enemyPullerComp = Components.createComponent({
	speed: 1.5,
});

export type EnemyComponent = typeof enemyPusherComp | typeof enemyPullerComp;

export const enemyPullerSystem: EnemySystem = {
	update: (entity, input) => {
		const comp = entity.component(enemyPullerComp)!;
		entity.graphic.color = entity.ready ? 'cyan' : 'white';
	},
};
