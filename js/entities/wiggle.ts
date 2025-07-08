import { Draw } from 'canvas-lord/util/draw';
import { Entity } from 'canvas-lord/core/entity';
import { Input, Keys } from 'canvas-lord/core/input';
import { Camera } from 'canvas-lord/util/camera';
import { Ctx } from 'canvas-lord/util/canvas';
import { Vec2 } from 'canvas-lord/math';

export class Wiggle extends Entity {

	radius: number;
	tension: number;
	numPoints: number;
	points: Vec2[];
	length: number;
	wiggliness: number;
	offset: number;


	constructor(x?: number, y?: number, numPoints?: number, radius?:number, tension?:number) {
		super(x, y);
		this.radius = radius || 100;
		this.tension = tension || .5;
		this.numPoints = numPoints || 20;
		this.length = Math.PI * 2 * this.radius;
		this.offset = 0;
		this.wiggliness = 0;	
		this.points = new Array(this.numPoints).fill(0).map((_, i) => {
			return new Vec2(Math.random() * this.radius * .5, Math.PI * 2 * i / this.numPoints);
		});
		this.measureWiggliness();
	}

	update(input: Input) {
		this.measureWiggliness();
		//
	}

	render(ctx: Ctx, camera: Camera) {
		this.drawWiggleFlat(ctx, 100, 0, this.scene.engine.width-100, this.scene.engine.height);
		this.drawWiggleTrack(ctx, 0, 0, 100, 100);
		Draw.text(ctx, { color: 'white', type: 'fill' }, 0, 100, `wiggliness: ${(this.wiggliness*100).toFixed(0)}`);
	}

	measureWiggliness() {
		const wiggliness = this.points.reduce((acc, curr, i) => {
			const next = this.points[i + 1] || curr;
			return acc + Math.abs(curr.x - next.x);
		}, 0);
		this.wiggliness = wiggliness / this.numPoints;
		return this.wiggliness;
	}

	getClosestBump(pos: Vec2) {
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

	getClosestDip(pos: Vec2) {
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

	moveWiggleByAngle(angle: number) {
		this.offset += angle;
	}

    getPointBeforeAngle(angle: number) {
		let index = -1;
		this.points.forEach((point, i) => {
			const nextPoint = this.points[(i + 1)%this.numPoints];
			const angleBefore = (angle - point.y) % (Math.PI * 2);
			const angleAfter = (angle - nextPoint.y) % (Math.PI * 2);
			if ((angleBefore > 0 && angleAfter > 0)) {
				index = i;
			}
		});
		return index;
	}	

	getRadiusAtAngle(angle: number) {
		let radius =  0;
		this.points.forEach((point, i) => {
			const nextPoint = this.points[(i + 1)%this.numPoints];
			const angleBefore = (angle - point.y) % (Math.PI * 2);
			const angleAfter = (angle - nextPoint.y) % (Math.PI * 2);
			if ((angleBefore > 0 && angleAfter > 0)) {
				radius = (point.x + nextPoint.x) * (angle - point.y)/(nextPoint.y - point.y);
			}
		});
		return radius;
	}

	drawWiggleFlat(ctx: Ctx, left: number, top: number, width: number, height: number) {
		let lengthDrawn = 0;
		let currentAngle = this.offset;
		let currentRadius = this.getRadiusAtAngle(this.offset);
		let i = (this.getPointBeforeAngle(this.offset)+1) % this.numPoints;
		let p1 = this.points[i];
		let x1 = left + lengthDrawn / this.length * width;
		let y1 = top + height / 2 - currentRadius;	
		for (let j = 0; j < this.numPoints && lengthDrawn < this.length; j++) {
			currentAngle = p1.y;
			currentRadius = p1.x;
			const p2 = this.points[(i + j + 1)%this.numPoints];	
			const x2 = left + lengthDrawn / this.length * width;
			const y2 = top + height / 2 - currentRadius;
			Draw.line(
				ctx,
				{ color: 'red', type: 'stroke' },
				x1,
				y1,
				x2,
				y2
			);	
			lengthDrawn += Math.hypot(x2 - x1, y2 - y1);
			p1 = p2;
			x1 = x2;
			y1 = y2;
		}
	}

	drawWiggleTrack(ctx: Ctx, left: number, top: number, width: number, height: number) {
		const r = Math.min(width, height) / (1.5 * this.radius);
		const center = new Vec2(left + width / 2, top + height / 2);
		let p1 = new Vec2(this.points.slice(-1)[0].x * Math.cos(this.points.slice(-1)[0].y), this.points.slice(-1)[0].x * Math.sin(this.points.slice(-1)[0].y)).scale(r).add(center);
		this.points.forEach((point, i) => {
			const p2 = new Vec2(point.x * Math.cos(point.y), point.x * Math.sin(point.y)).scale(r).add(center);
			Draw.line(
				ctx,
				{ color: 'red', type: 'stroke' },
				p1.x,
				p1.y,
				p2.x,
				p2.y
			);
			p1 = p2;
		});
	}
}
