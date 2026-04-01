import { ScreenBuffer } from './ScreenBuffer';

describe('ScreenBuffer', () => {
  describe('construction', () => {
    test('should create a buffer with the correct dimensions', () => {
      const buf = new ScreenBuffer(10, 5);
      expect(buf.getWidth()).toBe(10);
      expect(buf.getHeight()).toBe(5);
    });

    test('should fill with the default fill character', () => {
      const buf = new ScreenBuffer(3, 2);
      expect(buf.get(0, 0)).toBe(".");
      expect(buf.get(2, 1)).toBe(".");
    });

    test('should accept a custom fill character', () => {
      const buf = new ScreenBuffer(3, 2, " ");
      expect(buf.get(0, 0)).toBe(" ");
    });
  });

  describe('set and get', () => {
    test('should write and read a character', () => {
      const buf = new ScreenBuffer(10, 5);
      buf.set(3, 2, "@");
      expect(buf.get(3, 2)).toBe("@");
    });

    test('should not crash on out-of-bounds set', () => {
      const buf = new ScreenBuffer(10, 5);
      buf.set(-1, 0, "@");
      buf.set(0, -1, "@");
      buf.set(10, 0, "@");
      buf.set(0, 5, "@");
      // Should not throw
    });

    test('should return fill char for out-of-bounds get', () => {
      const buf = new ScreenBuffer(10, 5);
      expect(buf.get(-1, 0)).toBe(".");
      expect(buf.get(10, 0)).toBe(".");
    });
  });

  describe('clear', () => {
    test('should reset all cells to the fill character', () => {
      const buf = new ScreenBuffer(5, 3);
      buf.set(0, 0, "#");
      buf.set(2, 1, "@");
      buf.set(4, 2, "!");

      buf.clear();

      expect(buf.get(0, 0)).toBe(".");
      expect(buf.get(2, 1)).toBe(".");
      expect(buf.get(4, 2)).toBe(".");
    });
  });

  describe('writeText', () => {
    test('should write a string starting at the given position', () => {
      const buf = new ScreenBuffer(10, 3);
      buf.writeText(2, 1, "Hello");
      expect(buf.get(2, 1)).toBe("H");
      expect(buf.get(3, 1)).toBe("e");
      expect(buf.get(4, 1)).toBe("l");
      expect(buf.get(5, 1)).toBe("l");
      expect(buf.get(6, 1)).toBe("o");
    });

    test('should clip text that extends past the right edge', () => {
      const buf = new ScreenBuffer(5, 1);
      buf.writeText(3, 0, "Hello");
      // Only "He" fits (positions 3 and 4)
      expect(buf.get(3, 0)).toBe("H");
      expect(buf.get(4, 0)).toBe("e");
    });

    test('should handle text starting off-screen to the left', () => {
      const buf = new ScreenBuffer(5, 1);
      buf.writeText(-2, 0, "Hello");
      // "Hel" is off-screen, "lo" lands at positions 0 and 1
      expect(buf.get(0, 0)).toBe("l");
      expect(buf.get(1, 0)).toBe("l");
    });
  });

  describe('toString', () => {
    test('should produce a string with rows separated by newlines', () => {
      const buf = new ScreenBuffer(3, 2);
      expect(buf.toString()).toBe("...\n...");
    });

    test('should reflect set characters', () => {
      const buf = new ScreenBuffer(3, 2);
      buf.set(1, 0, "@");
      expect(buf.toString()).toBe(".@.\n...");
    });

    test('should show a complete scene', () => {
      const buf = new ScreenBuffer(5, 3, " ");
      // Draw a border on the top and bottom rows
      for (let x = 0; x < 5; x++) {
        buf.set(x, 0, "#");
        buf.set(x, 2, "#");
      }
      buf.set(2, 1, "@");

      const expected = "#####\n  @  \n#####";
      expect(buf.toString()).toBe(expected);
    });
  });
});
