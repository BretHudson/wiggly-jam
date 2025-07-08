import { Keys } from '../canvas-lord/core/input.js';
import { Sprite } from '../canvas-lord/graphic/index.js';
import { Vec2 } from '../canvas-lord/math/index.js';
import * as Components from '../canvas-lord/util/components.js';
import { WiggleSceneEntity } from './wiggle-scene-entity.js';
export const enemyComp = Components.createComponent({
    target: new Vec2(0, 0),
});
export const enemySystem = {
    update: (entity, input) => {
        if (input.keyCheck(Keys.Space)) {
            entity.x += 1;
        }
    },
};
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
    constructor(x, y) {
        const gfx = Sprite.createRect(32, 32, 'cyan');
        gfx.centerOO();
        super(x, y, gfx);
    }
    update(input) {
        this.pos = approach(this.pos, this.target, 5);
        if (input.mousePressed(0)) {
            const mousePos = input.mouse.pos;
            const { camera } = this.scene;
            const relativeMousePos = mousePos.add(camera);
            this.target.set(relativeMousePos);
        }
    }
}
//# sourceMappingURL=enemy.js.map