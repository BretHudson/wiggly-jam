import { Entity } from 'canvas-lord/core/entity';
import { type Random } from 'canvas-lord/util/random';

import { type WiggleScene } from '~/scenes/wiggle-scene';

export class WiggleSceneEntity extends Entity<WiggleScene> {
	get staticRandom(): Random {
		return this.scene.staticRandom;
	}
}
