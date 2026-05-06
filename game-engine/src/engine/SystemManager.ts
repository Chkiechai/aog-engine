import { EntityManager } from './EntityManager';
import { System } from './System';

/**
 * Owns the ordered list of systems that make up the game's update pipeline.
 * Systems run in the order they were added.
 *
 * The order matters: a system that writes a component must run before any
 * system that reads it. Making the order explicit here is a deliberate
 * architectural choice.
 */
export class SystemManager {
  private systems: System[]

  constructor() {
    this.systems = [];
  }

  /**
   * Add a system to the end of the pipeline.
   * @param system  The system to add
   */
  add(system: System): void {
    this.systems.push(system);
  }

  /**
   * Run every system once, in pipeline order.
   * @param world      The world to pass to each system
   * @param deltaTime  Time elapsed since the previous tick, in seconds
   */
  update(world: EntityManager, deltaTime: number): void {
    // NOTE: Loop through systems and call update on each
    for (const system of this.systems) {
      system.update(world, deltaTime);
    }
  }

  /** @returns The number of systems in the pipeline (for tests). */
  count(): number {
    return this.systems.length;
  }
}
