import { Scene } from '../canvas-lord/core/scene.js';
import { Random } from '../canvas-lord/util/random.js';
import { Enemy, enemyComp, enemySystem } from '../entities/enemy.js';
import { Wiggle } from '../entities/wiggle.js';
export class WiggleScene extends Scene {
    random = new Random(0);
    constructor() {
        super();
        this.componentSystemMap.set(enemyComp, [enemySystem]);
    }
    begin() {
        const wiggle = new Wiggle();
        this.addEntity(wiggle);
        const e = new Enemy();
        e.target.setXY(100, 20);
        const c = e.addComponent(enemyComp);
        this.addEntity(e);
    }
}
//# sourceMappingURL=wiggle-scene.js.map