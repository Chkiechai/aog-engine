import { EntityManager } from './EntityManager';
import { System } from './System';
import { ScreenBuffer } from './ScreenBuffer';
import { Position, Appearance } from '../game/components';

/**
 * Draws every entity with position + appearance onto the buffer, then
 * hands the buffer to a display callback.
 *
 * Replaces the Renderable / Renderer.add pattern from Session 23. Any entity
 * with position + appearance is automatically drawn. No registration needed.
 */
export class RenderSystem implements System {
  private buffer: ScreenBuffer;
  private display: (buffer: ScreenBuffer) => void;

  constructor(buffer: ScreenBuffer, display: (buffer: ScreenBuffer) => void) {
    this.buffer = buffer;
    this.display = display;
  }

  update(world: EntityManager, deltaTime: number): void {
    this.buffer.clear();
    for (const entity of world.query("position", "appearance")) {
      const pos = world.getComponent(entity, "position") as Position;
      const app = world.getComponent(entity, "appearance") as Appearance;
      this.buffer.set(Math.round(pos.x), Math.round(pos.y), app.char);
    }
    this.display(this.buffer);
  }
}
