import { Scene } from '../canvas-lord/core/scene.js';
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
    }
    get cursorPos() {
        const { pos } = this.engine.input.mouse;
        return pos.add(this.camera);
    }
    begin() {
        const wiggle = new Wiggle();
        this.addEntity(wiggle);
        // const e = Enemy.createPusher();
        const e = Enemy.createPuller();
        this.addEntity(e);
    }
}
//# sourceMappingURL=wiggle-scene.js.map