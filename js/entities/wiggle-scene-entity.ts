import { Entity } from 'canvas-lord/core/entity';
import { type Random } from 'canvas-lord/util/random';

import { type WiggleScene } from '~/scenes/wiggle-scene';

export class WiggleSceneEntity extends Entity<WiggleScene> {
	get random(): Random {
		return this.scene.random;
	}
}
