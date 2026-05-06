import { EventEmitter } from 'events';
import { InputSource } from './InputSource';
import { decodeKey } from './decodeKey';

/**
 * Reads keyboard input from a data-event source (stdin by default)
 * and exposes it via a tick-friendly polling API.
 */
export class Input implements InputSource {
  private pressedAt: Map<string, number>  //— key name → ms timestamp
  private justPressed: Set<string> //— cleared each endFrame
  private holdTimeoutMs: number
  private source: NodeJS.ReadableStream | EventEmitter
  private dataListener: (chunk: Buffer) => void
  private ownsStdin: boolean // Did we put real stdin in raw mode?

  /**
   * @param source          Where to read from. Defaults to process.stdin.
   *                        Pass an EventEmitter in tests to simulate input.
   * @param holdTimeoutMs   How long after the last keypress to keep isKeyPressed true.
   *                        Must be larger than the OS key-repeat interval. Default 150.
   */
  constructor(source: NodeJS.ReadableStream | EventEmitter = process.stdin, holdTimeoutMs: number = 150) {

    // Initializing the State Things
    this.pressedAt = new Map<string, number>();
    this.justPressed = new Set<string>();
    this.holdTimeoutMs = holdTimeoutMs;
    this.ownsStdin = false;

    // Checking if it's a real process.stdin
    if (source === process.stdin && process.stdin.isTTY){
      console.log("SETTING RAW MODE!!")
      process.stdin.setRawMode(true);
      process.stdin.resume();
      this.ownsStdin = true;
    }
    console.log('isTTY:', process.stdin.isTTY); // ← and this
    console.log('ownsStdin:', this.ownsStdin);
    
    // Making the Data Listener:
    this.dataListener = (chunk: Buffer) => {
      const key = decodeKey(chunk);
      // Get the last press of the key
      const lastPress = this.pressedAt.get(key);

      let passedTime : boolean = false;

      if (lastPress === undefined || (Date.now() - lastPress) > this.holdTimeoutMs){
        passedTime = true;
      }

      if (passedTime === true) {
        this.justPressed.add(key);
      }

      if (!this.pressedAt.has(key)) {
        this.justPressed.add(key);
      }
      this.pressedAt.set(key, Date.now());
    };

    // THe source 'subscription'
    this.source = source;
    source.on('data', this.dataListener);

  }

  isKeyPressed(key: string): boolean {
    if (this.pressedAt.has(key) && (Date.now() - this.pressedAt.get(key)!) <= this.holdTimeoutMs) return true;

    return false;
  }

  wasJustPressed(key: string): boolean {
    return this.justPressed.has(key);
  }

  endFrame(): void {
    this.justPressed.clear() //NOTE: ONLY JUST PRESSED NOT PRESSED AT
  }

  close(): void {
    this.source.removeListener('data', this.dataListener);
    if (this.ownsStdin) {
      (process.stdin as NodeJS.ReadStream).setRawMode(false);
      process.stdin.pause();
    }
  }
}
