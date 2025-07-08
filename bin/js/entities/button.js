import { BoxCollider } from '../canvas-lord/collider/box-collider.js';
import { Entity } from '../canvas-lord/core/entity.js';
import { GraphicList, Sprite, Text } from '../canvas-lord/graphic/index.js';
import { Delegate } from '../canvas-lord/util/delegate.js';
export class Button extends Entity {
    onClick = new Delegate();
    bg;
    text;
    constructor(x, y) {
        const w = 100;
        const h = 30;
        const border = Sprite.createRect(w, h, 'white');
        border.centerOO();
        const bg = Sprite.createRect(w - 4, h - 4, 'black');
        bg.centerOO();
        const text = new Text('Text');
        text.y = -2;
        const gfx = new GraphicList(border, bg, text);
        const collider = new BoxCollider(w, h);
        collider.centerOO();
        super(x, y, gfx, collider);
        this.bg = bg;
        this.text = text;
    }
    update(input) {
        this.text.centerOO();
        const mouseOver = this.collideMouse(this.x, this.y);
        this.bg.color = mouseOver ? 'red' : undefined;
        if (mouseOver) {
            input.mouse.cursor = 'pointer';
            if (input.mousePressed()) {
                this.onClick.invoke();
            }
        }
    }
}
//# sourceMappingURL=button.js.map