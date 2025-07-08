import { Sprite } from '../canvas-lord/graphic/index.js';
import { Vec2 } from '../canvas-lord/math/index.js';
import { enemyPullerComp, enemyPusherComp, } from '../components/enemy-components.js';
import { WiggleSceneEntity } from '../entities/wiggle-scene-entity.js';
const approach = (a, target, amount) => {
    const delta = target.sub(a);
    const mag = delta.magnitude;
    if (mag <= amount)
        return a.add(delta);
    delta.normalize();
    return a.add(delta.scale(amount));
};
export class Enemy extends WiggleSceneEntity {
    target = new Vec2();
    ready = false;
    speed = 0;
    set graphic(value) {
        super.graphic = value;
    }
    get graphic() {
        return super.graphic;
    }
    static createType(c) {
        const e = new Enemy();
        const comp = e.addComponent(c);
        e.speed = comp.speed;
        return e;
    }
    static createPusher() {
        return this.createType(enemyPusherComp);
    }
    static createPuller() {
        return this.createType(enemyPullerComp);
    }
    constructor(x, y) {
        const gfx = Sprite.createRect(32, 32, 'white');
        gfx.centerOO();
        super(x, y, gfx);
    }
    update(input) {
        this.pos = approach(this.pos, this.target, this.speed);
        this.ready = this.pos.equal(this.target);
        if (input.mousePressed(0)) {
            this.target.set(this.scene.cursorPos);
        }
    }
}
//# sourceMappingURL=enemy.js.map