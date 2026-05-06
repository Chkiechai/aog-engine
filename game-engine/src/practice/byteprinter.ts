//src/practice/byteprinter.ts

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (chunk: Buffer) => {
  console.log(chunk.length, 'bytes:', Array.from(chunk).map(b => b.toString(16)).join(' '));
  if (chunk[0] === 0x03) process.exit(0); // (User presses Ctrl+C)
});
