import * as Components from '../canvas-lord/util/components.js';
export const enemyPusherComp = Components.createComponent({
    speed: 5,
});
export const enemyPusherSystem = {
    update: (entity, input) => {
        const comp = entity.component(enemyPusherComp);
        entity.graphic.color = entity.ready ? 'red' : 'white';
    },
};
export const enemyPullerComp = Components.createComponent({
    speed: 1.5,
});
export const enemyPullerSystem = {
    update: (entity, input) => {
        const comp = entity.component(enemyPullerComp);
        entity.graphic.color = entity.ready ? 'cyan' : 'white';
    },
};
//# sourceMappingURL=enemy-components.js.map