import { EntityManager } from './EntityManager';
import { System } from './System';
import { Position } from '../game/components';

/**
 * Keeps every positioned entity inside a rectangle [0, width) x [0, height).
 * Runs *after* MovementSystem: it assumes movement may have pushed things out,
 * and it clamps them back.
 */
export class BoundsSystem implements System {
  private width : number;
  private height : number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  update(world: EntityManager, deltaTime: number): void {
    for (const entity of world.query("position")) {
      const pos = world.getComponent(entity, "position") as Position;
      if (pos.x < 0) {
        pos.x = 0;
      } if (pos.x >= this.width){
        pos.x = this.width - 1;
      } if (pos.y < 0) {
        pos.y = 0;
      } if (pos.y >= this.height){
        pos.y = this.height - 1;
      }
    }
  }
}
