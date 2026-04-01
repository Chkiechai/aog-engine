import { Renderer } from './Renderer';
import { ScreenBuffer } from './ScreenBuffer';
import { Renderable } from './Renderable';

describe('Renderer', () => {
  let buffer: ScreenBuffer;
  let renderer: Renderer;

  beforeEach(() => {
    buffer = new ScreenBuffer(10, 5);
    renderer = new Renderer(buffer);
  });

  describe('add and remove', () => {
    test('should start with no renderables', () => {
      expect(renderer.getRenderableCount()).toBe(0);
    });

    test('should add renderables', () => {
      const obj: Renderable = { drawTo: () => {} };
      renderer.add(obj);
      expect(renderer.getRenderableCount()).toBe(1);
    });

    test('should remove renderables', () => {
      const obj: Renderable = { drawTo: () => {} };
      renderer.add(obj);
      renderer.remove(obj);
      expect(renderer.getRenderableCount()).toBe(0);
    });

    test('should not error when removing something not in the list', () => {
      const obj: Renderable = { drawTo: () => {} };
      renderer.remove(obj);  // Should not throw
      expect(renderer.getRenderableCount()).toBe(0);
    });
  });

  describe('render', () => {
    test('should clear the buffer', () => {
      buffer.set(0, 0, "X");
      renderer.render();
      expect(buffer.get(0, 0)).toBe(".");
    });

    test('should call drawTo on all renderables', () => {
      const mockDraw = jest.fn();
      const obj: Renderable = { drawTo: mockDraw };
      renderer.add(obj);

      renderer.render();

      expect(mockDraw).toHaveBeenCalledTimes(1);
      expect(mockDraw).toHaveBeenCalledWith(buffer);
    });

    test('should draw renderables in order (later overwrites earlier)', () => {
      const background: Renderable = {
        drawTo: (buf) => buf.set(5, 2, ".")
      };
      const player: Renderable = {
        drawTo: (buf) => buf.set(5, 2, "@")
      };

      renderer.add(background);
      renderer.add(player);
      renderer.render();

      expect(buffer.get(5, 2)).toBe("@");  // Player drawn on top
    });
  });
});
