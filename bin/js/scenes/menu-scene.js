import { Scene } from '../canvas-lord/core/scene.js';
import { Text } from '../canvas-lord/graphic/text.js';
import { Random } from '../canvas-lord/util/random.js';
import { enemyPullerComp, enemyPullerSystem, enemyPusherComp, enemyPusherSystem, } from '../components/enemy-components.js';
import { Button } from '../entities/button.js';
import { WiggleScene } from './wiggle-scene.js';
import { CL } from '../canvas-lord/core/CL.js';
export class MenuScene extends Scene {
    staticRandom = new Random(0);
    logo;
    firstTime = true;
    constructor() {
        super();
        this.componentSystemMap.set(enemyPusherComp, [
            enemyPusherSystem,
        ]);
        this.componentSystemMap.set(enemyPullerComp, [
            enemyPullerSystem,
        ]);
        const logo = new Text('Wiggle Ring Defense');
        logo.font = 'Ole';
        logo.size = 72;
        logo.align = 'center';
        logo.alpha = -0.05;
        this.logo = logo;
        this.addGraphic(logo);
        const resetCursor = () => {
            CL.input.mouse.cursor = 'default';
        };
        this.onPause.add(resetCursor);
        // this.onPreUpdate.add(resetCursor);
    }
    get cursorPos() {
        const { pos } = this.engine.input.mouse;
        return pos.add(this.camera);
    }
    begin() {
        if (!this.firstTime)
            return;
        this.firstTime = false;
        const { width, halfWidth, height, halfHeight } = this.engine;
        this.logo.x = halfWidth;
        this.logo.y = height / 6;
        const buttonY = (height * 2) / 3;
        const playButton = new Button(halfWidth, buttonY);
        playButton.onClick.add(() => {
            console.log('here we goooo');
            this.engine.pushScene(new WiggleScene());
        });
        this.addEntities(playButton);
    }
    update() {
        if (this.logo.alpha < 1)
            this.logo.alpha += 0.05;
    }
}
//# sourceMappingURL=menu-scene.js.map