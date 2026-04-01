// src/practice/Counter.ts

export class Counter {
  // TODO: Add a private property 'count' of type number

  private count : number

  constructor() {
    this.count = 0;
  }

  /** Increase the count by 1 */
  increment(): void {
    this.count += 1;
  }

  /** Decrease the count by 1 */
  decrement(): void {
    this.count -= 1;
  }

  /** Get the current count */
  getCount(): number {
    return this.count;
  }
}
