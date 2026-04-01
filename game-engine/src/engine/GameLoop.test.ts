import { GameLoop } from './GameLoop';

describe('GameLoop', () => {
  let loop: GameLoop;

  afterEach(() => {
    if (loop && loop.isRunning()) {
      loop.stop();
    }
  });

  describe('construction', () => {
    test('should start in stopped state', () => {
      loop = new GameLoop(30, () => {});
      expect(loop.isRunning()).toBe(false);
    });

    test('should start with tick count of 0', () => {
      loop = new GameLoop(30, () => {});
      expect(loop.getTickCount()).toBe(0);
    });
  });

  describe('start()', () => {
    test('should set running to true', () => {
      loop = new GameLoop(30, () => {});
      loop.start();
      expect(loop.isRunning()).toBe(true);
    });

    test('should not error when called twice', () => {
      loop = new GameLoop(30, () => {});
      loop.start();
      loop.start();  // Should not throw
      expect(loop.isRunning()).toBe(true);
    });
  });

  describe('stop()', () => {
    test('should set running to false', () => {
      loop = new GameLoop(30, () => {});
      loop.start();
      loop.stop();
      expect(loop.isRunning()).toBe(false);
    });

    test('should not error when called on a stopped loop', () => {
      loop = new GameLoop(30, () => {});
      loop.stop();  // Should not throw
      expect(loop.isRunning()).toBe(false);
    });
  });

  describe('tick()', () => {
    test('should call onTick callback', () => {
      const mockOnTick = jest.fn();
      loop = new GameLoop(30, mockOnTick);
      loop.start();
      loop.tick();

      expect(mockOnTick).toHaveBeenCalledTimes(1);
    });

    test('should pass deltaTime as a number', () => {
      const mockOnTick = jest.fn();
      loop = new GameLoop(30, mockOnTick);
      loop.start();
      loop.tick();

      const deltaTime = mockOnTick.mock.calls[0][0];
      expect(typeof deltaTime).toBe('number');
    });

    test('should increment tick count', () => {
      const mockOnTick = jest.fn();
      loop = new GameLoop(30, mockOnTick);
      loop.start();

      loop.tick();
      loop.tick();
      loop.tick();

      expect(loop.getTickCount()).toBe(3);
    });

    test('should not tick when stopped', () => {
      const mockOnTick = jest.fn();
      loop = new GameLoop(30, mockOnTick);

      // Do NOT start the loop
      loop.tick();

      expect(mockOnTick).not.toHaveBeenCalled();
      expect(loop.getTickCount()).toBe(0);
    });

    test('should not tick after stop()', () => {
      const mockOnTick = jest.fn();
      loop = new GameLoop(30, mockOnTick);
      loop.start();
      loop.tick();        // This should work
      loop.stop();
      loop.tick();        // This should be ignored

      expect(mockOnTick).toHaveBeenCalledTimes(1);
      expect(loop.getTickCount()).toBe(1);
    });
  });
});
