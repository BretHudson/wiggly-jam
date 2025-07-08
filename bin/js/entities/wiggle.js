import { Draw } from '../canvas-lord/util/draw.js';
import { Entity } from '../canvas-lord/core/entity.js';
import { Keys } from '../canvas-lord/core/input.js';
import { Vec2 } from '../canvas-lord/math/index.js';
export class Wiggle extends Entity {
    radius;
    tension;
    numPoints;
    points;
    length;
    wiggliness;
    offset;
    damping;
    nodes;
    edges;
    constructor(x, y, numPoints, radius, tension) {
        super(x, y);
        this.radius = radius || 50;
        this.tension = tension || .5;
        this.numPoints = numPoints || 20;
        this.length = Math.PI * 2 * this.radius;
        this.offset = 0;
        this.wiggliness = 0;
        this.damping = 0.95;
        this.points = new Array(this.numPoints).fill(0).map((_, i) => {
            return new Vec2((Math.random() - .5) * this.radius, Math.PI * 2 * i / this.numPoints);
        });
        this.nodes = this.points.map((p, i) => {
            return {
                mass: 1,
                pos: new Vec2(Math.cos(p.y), Math.sin(p.y)).scale(this.radius + p.x),
                vel: new Vec2(0, 0),
                acc: new Vec2(0, 0),
            };
        });
        this.edges = this.nodes.map((node, i) => {
            const n1 = this.nodes[i];
            const n2 = this.nodes[(i + 1) % this.numPoints];
            return {
                from: i,
                to: (i + 1) % this.numPoints,
                length: Math.hypot(n1.pos.x - n2.pos.x, n1.pos.y - n2.pos.y) * 1,
            };
        });
        this.measureWiggliness();
    }
    update(input) {
        this.edges.forEach((edge) => {
            const n1 = this.nodes[edge.from];
            const n2 = this.nodes[edge.to];
            const length = Math.hypot(n1.pos.x - n2.pos.x, n1.pos.y - n2.pos.y);
            const diff = length - edge.length;
            const angle = Math.atan2(n2.pos.y - n1.pos.y, n2.pos.x - n1.pos.x);
            const force = this.tension * diff / edge.length;
            n1.acc = n1.acc.add(new Vec2(Math.cos(angle), Math.sin(angle)).scale(force * 1 / n1.mass));
            n2.acc = n2.acc.sub(new Vec2(Math.cos(angle), Math.sin(angle)).scale(force * 1 / n2.mass));
        });
        this.nodes.forEach((node, i) => {
            node.vel = (node.vel.add(node.acc)).scale(this.damping);
            node.pos = node.pos.add(node.vel);
            node.acc = node.acc.scale(0);
        });
        this.measureWiggliness();
        if (input.keyPressed(Keys.ArrowLeft) || input.keyCheck(Keys.ArrowLeft)) {
            this.offset += 0.01;
        }
        if (input.keyPressed(Keys.ArrowRight) || input.keyCheck(Keys.ArrowRight)) {
            this.offset -= 0.01;
        }
        const east = this.nodes[0];
        const west = this.nodes[Math.floor(this.numPoints / 2)];
        const north = this.nodes[Math.floor(this.numPoints / 4)];
        const south = this.nodes[Math.floor(this.numPoints * 3 / 4)];
        if (input.keyPressed(Keys.A)) {
            west.mass = Infinity;
            west.pos = this.stretchNode(west.pos, this.radius);
        }
        if (input.keyReleased(Keys.A)) {
            west.mass = 1;
        }
        if (input.keyPressed(Keys.D)) {
            east.mass = Infinity;
            east.pos = this.stretchNode(east.pos, this.radius);
        }
        if (input.keyReleased(Keys.D)) {
            east.mass = 1;
        }
        if (input.keyPressed(Keys.W)) {
            north.mass = Infinity;
            north.pos = this.stretchNode(north.pos, this.radius);
        }
        if (input.keyReleased(Keys.W)) {
            north.mass = 1;
        }
        if (input.keyPressed(Keys.S)) {
            south.mass = Infinity;
            south.pos = this.stretchNode(south.pos, this.radius);
        }
        if (input.keyReleased(Keys.S)) {
            south.mass = 1;
        }
        if (input.keyCheck(Keys.ArrowUp)) {
            this.damping += 0.01;
        }
        if (input.keyCheck(Keys.ArrowDown)) {
            this.damping -= 0.01;
        }
        const center = this.getBarycenter();
        this.nodes.forEach((node, i) => {
            node.pos = node.pos.sub(center);
            this.points[i] = new Vec2(Math.hypot(node.pos.x, node.pos.y), Math.atan2(node.pos.y, node.pos.x));
        });
    }
    render(ctx, camera) {
        this.drawWiggleFlat(ctx, 100, 0, this.scene.engine.width - 100, this.scene.engine.height);
        this.drawWiggleTrack(ctx, 0, 0, 100, 100);
        Draw.text(ctx, { color: 'white', type: 'fill' }, 0, 100, `wiggliness: ${(this.wiggliness * 100).toFixed(0)}`);
    }
    measureWiggliness() {
        const wiggliness = this.points.reduce((acc, curr, i) => {
            const next = this.points[i + 1] || curr;
            return acc + Math.abs(curr.x - next.x);
        }, 0);
        this.wiggliness = wiggliness / this.numPoints;
        return this.wiggliness;
    }
    stretchNode(pos, radius) {
        const angle = Math.atan2(pos.y, pos.x);
        return pos.add((new Vec2(Math.cos(angle), Math.sin(angle))).scale(radius));
    }
    getClosestBump(pos) {
        let closest = Infinity;
        let closestPoint = new Vec2(0, 0);
        this.points.filter((p) => p.x > 0).forEach((pointPolar, i) => {
            const pointXY = new Vec2(pointPolar.x * Math.cos(pointPolar.y), pointPolar.x * Math.sin(pointPolar.y));
            const distance = Math.hypot(...pos.sub(pointXY));
            if (distance < closest) {
                closest = distance;
                closestPoint = pointXY;
            }
        });
        return closestPoint;
    }
    getClosestDip(pos) {
        let closest = Infinity;
        let closestPoint = new Vec2(0, 0);
        this.points.filter((p) => p.x < 0).forEach((pointPolar, i) => {
            const pointXY = new Vec2(pointPolar.x * Math.cos(pointPolar.y), pointPolar.x * Math.sin(pointPolar.y));
            const distance = Math.hypot(...pos.sub(pointXY));
            if (distance < closest) {
                closest = distance;
                closestPoint = pointXY;
            }
        });
        return closestPoint;
    }
    moveWiggleByAngle(angle) {
        this.offset += angle;
    }
    getPointBeforeAngle(angle) {
        let index = -1;
        this.points.forEach((point, i) => {
            const nextPoint = this.points[(i + 1) % this.numPoints];
            const angleBefore = (angle - point.y) % (Math.PI * 2);
            const angleAfter = (angle - nextPoint.y) % (Math.PI * 2);
            if ((angleBefore > 0 && angleAfter > 0)) {
                index = i;
            }
        });
        return index;
    }
    getRadiusAtAngle(angle) {
        let radius = 0;
        this.points.forEach((point, i) => {
            const nextPoint = this.points[(i + 1) % this.numPoints];
            const angleBefore = (angle - point.y) % (Math.PI * 2);
            const angleAfter = (angle - nextPoint.y) % (Math.PI * 2);
            if ((angleBefore > 0 && angleAfter > 0)) {
                radius = (point.x + nextPoint.x) * (angle - point.y) / (nextPoint.y - point.y);
            }
        });
        return radius;
    }
    getBarycenter() {
        const center = new Vec2(0, 0);
        this.nodes.forEach((node) => {
            center.add(node.pos);
        });
        return center.scale(1 / this.nodes.length);
    }
    drawWiggleFlat(ctx, left, top, width, height) {
        let lengthDrawn = 0;
        let currentAngle = this.offset;
        let currentRadius = this.getRadiusAtAngle(this.offset);
        let i = (this.getPointBeforeAngle(this.offset) + 1) % this.numPoints;
        let p1 = this.points[i];
        let x1 = left + lengthDrawn / this.length * width;
        let y1 = top + height / 2 - currentRadius;
        ctx.lineWidth = 5;
        for (let j = 0; j < this.numPoints && lengthDrawn < this.length; j++) {
            currentAngle = p1.y;
            currentRadius = p1.x;
            const p2 = this.points[(i + j + 1) % this.numPoints];
            const x2 = left + lengthDrawn / this.length * width;
            const y2 = top + height / 2 - currentRadius;
            Draw.line(ctx, { color: 'red', type: 'stroke' }, x1, y1, x2, y2);
            lengthDrawn += Math.hypot(x2 - x1, y2 - y1);
            p1 = p2;
            x1 = x2;
            y1 = y2;
        }
    }
    drawWiggleTrack(ctx, left, top, width, height) {
        const r = Math.min(width, height) / (6 * this.radius);
        const center = new Vec2(left + width / 2, top + height / 2);
        let p1 = new Vec2(Math.cos(-this.points.slice(-1)[0].y), Math.sin(-this.points.slice(-1)[0].y)).scale((this.radius + this.points.slice(-1)[0].x) * r).add(center);
        let lengthDrawn = 0;
        const scaledLength = this.length * r;
        this.points.forEach((point, i) => {
            const p2 = new Vec2(Math.cos(-point.y), Math.sin(-point.y)).scale((this.radius + point.x) * r).add(center);
            lengthDrawn += Math.hypot(p2.x - p1.x, p2.y - p1.y);
            if (point.y >= this.offset && lengthDrawn < scaledLength) {
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'red';
            }
            else {
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'white';
            }
            Draw.line(ctx, { type: 'stroke' }, p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
        });
    }
}
//# sourceMappingURL=wiggle.js.map