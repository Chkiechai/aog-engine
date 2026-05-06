import { EventEmitter } from 'events';
import { Input } from './Input';

function press(source: EventEmitter, byte: number): void {
  source.emit('data', Buffer.from([byte]));
}

function pressArrow(source: EventEmitter, dir: 'up'|'down'|'left'|'right'): void {
  const map = { up: 0x41, down: 0x42, right: 0x43, left: 0x44 };
  source.emit('data', Buffer.from([0x1b, 0x5b, map[dir]]));
}

describe('Input', () => {
  let source: EventEmitter;
  let input: Input;

  beforeEach(() => {
    source = new EventEmitter();
    input = new Input(source, 150);
  });

  afterEach(() => {
    input.close();
  });

  describe('wasJustPressed', () => {
    test('is false before any key is pressed', () => {
      expect(input.wasJustPressed('a')).toBe(false);
    });

    test('is true on the tick a key arrives', () => {
      press(source, 0x61); // 'a'
      expect(input.wasJustPressed('a')).toBe(true);
    });

    test('is cleared by endFrame', () => {
      press(source, 0x61);
      expect(input.wasJustPressed('a')).toBe(true);
      input.endFrame();
      expect(input.wasJustPressed('a')).toBe(false);
    });

    test('does not re-trigger on OS key-repeat within the hold window', () => {
      press(source, 0x61);
      input.endFrame();
      press(source, 0x61); // a repeat while still "held"
      expect(input.wasJustPressed('a')).toBe(false);
    });

    test('triggers again after a genuine release and re-press', (done) => {
      press(source, 0x61);
      input.endFrame();
      // Wait longer than the hold timeout, then press again.
      setTimeout(() => {
        press(source, 0x61);
        expect(input.wasJustPressed('a')).toBe(true);
        done();
      }, 200);
    });
  });

  describe('isKeyPressed', () => {
    test('is true immediately after a press', () => {
      press(source, 0x61);
      expect(input.isKeyPressed('a')).toBe(true);
    });

    test('stays true across endFrame (unlike wasJustPressed)', () => {
      press(source, 0x61);
      input.endFrame();
      expect(input.isKeyPressed('a')).toBe(true);
    });

    test('becomes false after the hold timeout with no new events', (done) => {
      press(source, 0x61);
      setTimeout(() => {
        expect(input.isKeyPressed('a')).toBe(false);
        done();
      }, 200);
    });

    test('stays true while key-repeat events keep arriving', (done) => {
      press(source, 0x61);
      setTimeout(() => press(source, 0x61), 50);
      setTimeout(() => press(source, 0x61), 100);
      setTimeout(() => {
        expect(input.isKeyPressed('a')).toBe(true);
        done();
      }, 140);
    });
  });

  describe('arrow keys', () => {
    test('decodes arrow up', () => {
      pressArrow(source, 'up');
      expect(input.wasJustPressed('up')).toBe(true);
      expect(input.isKeyPressed('up')).toBe(true);
    });
  });

  describe('multiple keys', () => {
    test('tracks several keys independently', () => {
      press(source, 0x61); // 'a'
      press(source, 0x62); // 'b'
      expect(input.isKeyPressed('a')).toBe(true);
      expect(input.isKeyPressed('b')).toBe(true);
      expect(input.isKeyPressed('c')).toBe(false);
    });
  });
});
