/**
 * Decode a buffer of bytes from raw stdin into a friendly key name.
 * Returns 'unknown' for anything we don't recognize.
 *
 * Examples:
 *   Buffer.from([0x61])                   → 'a'
 *   Buffer.from([0x41])                   → 'A'
 *   Buffer.from([0x03])                   → 'ctrl-c'
 *   Buffer.from([0x1b])                   → 'escape'
 *   Buffer.from([0x0d])                   → 'enter'
 *   Buffer.from([0x20])                   → 'space'
 *   Buffer.from([0x1b, 0x5b, 0x41])       → 'up'
 *   Buffer.from([0x1b, 0x5b, 0x42])       → 'down'
 *   Buffer.from([0x1b, 0x5b, 0x43])       → 'right'
 *   Buffer.from([0x1b, 0x5b, 0x44])       → 'left'
 */
export function decodeKey(chunk: Buffer): string {
  //NOTE: sb = single byte
  if (chunk.length === 1){
    const sb = chunk [0];

    if (sb === 0x61){
      return 'a';
    }
    if (sb === 0x41){
      return 'A';
    }
    if (sb === 0x03){
      return 'ctrl-c';
    }
    if (sb === 0x1b){
      return 'escape';
    }
    if (sb === 0x0d){
      return 'enter';
    }
    if (sb === 0x20){
      return 'space';
    }

    if (sb === 0x7a) return 'z';

    if (sb === 0x31) return '1';

    if (sb === 0x39) return '9';

    if (sb >= 0x20 && sb <= 0x7e) return String.fromCharCode(sb);
  }

  if (chunk.length === 3 && chunk[0] === 0x1b && chunk[1] === 0x5b){
    if (chunk[2] === 0x41) return 'up';
    if (chunk[2] === 0x42) return 'down';
    if (chunk[2] === 0x43) return 'right';
    if (chunk[2] === 0x44) return 'left';

  }
  
  
  return  "unknown";
}
