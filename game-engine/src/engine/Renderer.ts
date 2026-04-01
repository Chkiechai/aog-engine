import { ScreenBuffer } from './ScreenBuffer';
import { Renderable } from './Renderable';

/**
 * Orchestrates the rendering pipeline.
 * Clears the screen buffer, draws all renderables, and displays the result.
 */
export class Renderer {
  private buffer: ScreenBuffer;
  private renderables: Renderable[];

  /**
   * Create a new Renderer.
   * @param buffer - The screen buffer to draw on
   */
  constructor(buffer: ScreenBuffer) {
    this.buffer = buffer;
    this.renderables = [];
  }

  /**
   * Add a renderable to the draw list.
   * It will be drawn each frame in the order it was added.
   * @param renderable - The object to add
   */
  add(renderable: Renderable): void {
    this.renderables.push(renderable);
  }

  /**
   * Remove a renderable from the draw list.
   * Does nothing if the renderable is not in the list.
   * @param renderable - The object to remove
   */
  remove(renderable: Renderable): void {
    if (this.renderables.indexOf(renderable) !== -1){
      this.renderables.splice(this.renderables.indexOf(renderable), 1);
    }
  }

  /**
   * Execute the render pipeline: clear buffer, draw all renderables.
   * Does NOT display to the terminal (call display() separately).
   */
  render(): void {
    process.stdout.write("\x1b[H");
    this.buffer.clear();
    for (const renderable of this.renderables){
      renderable.drawTo(this.buffer)
    }
  }

  /**
   * Display the current buffer contents to the terminal.
   */
  display(): void {
    this.render();
    process.stdout.write(this.buffer.toString());

  }

  /**
   * Get the number of renderables in the draw list.
   */
  getRenderableCount(): number {
    // TODO: Implement

    return this.renderables.length;
  }

  /**
   * Get the underlying buffer (useful for testing).
   */
  getBuffer(): ScreenBuffer {
    return this.buffer;
  }
}
