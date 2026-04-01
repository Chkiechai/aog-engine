// src/practice/Counter.test.ts

import { Counter } from './counter';

describe('Counter', () => {
  test('should start at 0', () => {
    const counter = new Counter();
    expect(counter.getCount()).toBe(0);
  });

  test('should increment', () => {
    const counter = new Counter();
    counter.increment();
    counter.increment();
    expect(counter.getCount()).toBe(2);
  });

  test('should decrement', () => {
    const counter = new Counter();
    counter.increment();
    counter.increment();
    counter.decrement();
    expect(counter.getCount()).toBe(1);
  });
});
