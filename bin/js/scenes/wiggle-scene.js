import { Keys } from '../canvas-lord/core/input.js';
import { Scene } from '../canvas-lord/core/scene.js';
import { Vec2 } from '../canvas-lord/math/index.js';
import { Random } from '../canvas-lord/util/random.js';
import { enemyPullerComp, enemyPullerSystem, enemyPusherComp, enemyPusherSystem, } from '../components/enemy-components.js';
import { Enemy } from '../entities/enemy.js';
import { Wiggle } from '../entities/wiggle.js';
export class WiggleScene extends Scene {
    staticRandom = new Random(0);
    constructor() {
        super();
        this.componentSystemMap.set(enemyPusherComp, [
            enemyPusherSystem,
        ]);
        this.componentSystemMap.set(enemyPullerComp, [
            enemyPullerSystem,
        ]);
        this.backgroundColor = '#333';
    }
    get cursorPos() {
        const { pos } = this.engine.input.mouse;
        return pos.add(this.camera);
    }
    begin() {
        const halfSize = new Vec2(this.engine.halfWidth, this.engine.halfHeight);
        this.camera = this.camera.sub(halfSize);
        const wiggle = new Wiggle();
        this.addEntity(wiggle);
        // const e = Enemy.createPusher();
        const e = Enemy.createPuller();
        this.addEntity(e);
    }
    update(input) {
        if (input.keyPressed(Keys.Escape)) {
            this.engine.popScenes();
        }
    }
}
//# sourceMappingURL=wiggle-scene.js.map