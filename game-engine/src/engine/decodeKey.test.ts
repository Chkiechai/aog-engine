import { decodeKey } from './decodeKey';

describe('decodeKey', () => {
  test('decodes printable letters', () => {
    expect(decodeKey(Buffer.from([0x61]))).toBe('a');
    expect(decodeKey(Buffer.from([0x41]))).toBe('A');
    expect(decodeKey(Buffer.from([0x7a]))).toBe('z');
  });

  test('decodes digits', () => {
    expect(decodeKey(Buffer.from([0x31]))).toBe('1');
    expect(decodeKey(Buffer.from([0x39]))).toBe('9');
  });

  test('decodes control keys', () => {
    expect(decodeKey(Buffer.from([0x03]))).toBe('ctrl-c');
    expect(decodeKey(Buffer.from([0x0d]))).toBe('enter');
    expect(decodeKey(Buffer.from([0x1b]))).toBe('escape');
    expect(decodeKey(Buffer.from([0x20]))).toBe('space');
  });

  test('decodes arrow keys', () => {
    expect(decodeKey(Buffer.from([0x1b, 0x5b, 0x41]))).toBe('up');
    expect(decodeKey(Buffer.from([0x1b, 0x5b, 0x42]))).toBe('down');
    expect(decodeKey(Buffer.from([0x1b, 0x5b, 0x43]))).toBe('right');
    expect(decodeKey(Buffer.from([0x1b, 0x5b, 0x44]))).toBe('left');
  });

  test('returns unknown for unrecognized sequences', () => {
    expect(decodeKey(Buffer.from([0xff]))).toBe('unknown');
    expect(decodeKey(Buffer.from([0x1b, 0x5b, 0x5a]))).toBe('unknown');
  });
});
