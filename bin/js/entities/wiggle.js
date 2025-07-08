import { Draw } from '../canvas-lord/util/draw.js';
import { Entity } from '../canvas-lord/core/entity.js';
import { Vec2 } from '../canvas-lord/math/index.js';
export class Wiggle extends Entity {
    constructor(x, y) {
        super(x, y);
    }
    update(input) {
        //
    }
    render(ctx, camera) {
        let pos = this.pos;
        pos = pos.sub(camera);
        const p2 = pos.add(new Vec2(100, 100));
        const r = 100;
        Draw.circle(ctx, {
            color: 'yellow',
            type: 'stroke',
        }, pos.x - r, pos.y - r, r);
        Draw.line(ctx, {
            color: 'red',
            type: 'stroke',
        }, pos.x, pos.y, p2.x, p2.y);
    }
}
//# sourceMappingURL=wiggle.js.map