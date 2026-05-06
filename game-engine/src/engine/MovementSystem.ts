import { EntityManager } from './EntityManager';
import { System } from './System';
import { Position, Velocity } from '../game/components';

/**
 * Moves every entity that has both position and velocity.
 * dx/dy are in cells per second; deltaTime is in seconds.
 */
export class MovementSystem implements System {
  update(world: EntityManager, deltaTime: number): void {
    for (const entity of world.query("position", "velocity")) {
      const pos = world.getComponent(entity, "position") as Position;
      const vel = world.getComponent(entity, "velocity") as Velocity;
      pos.x += vel.dx * deltaTime;
      pos.y += vel.dy * deltaTime;
    }
  }
}
