// src/practice/Printable.test.ts

import { ScoreDisplay, HealthBar } from './Printable';

describe('ScoreDisplay', () => {
  test('should implement toPrintString', () => {
    const display = new ScoreDisplay("Alice", 350);
    const result = display.toPrintString();
    expect(result).toContain("Alice");
    expect(result).toContain("350");
  });
});

describe('HealthBar', () => {
  test('should show full health', () => {
    const bar = new HealthBar(100, 100);
    const result = bar.toPrintString();
    expect(result).toContain("##########");
    expect(result).toContain("100/100");
  });

  test('should show half health', () => {
    const bar = new HealthBar(50, 100);
    const result = bar.toPrintString();
    expect(result).toContain("#####-----");
    expect(result).toContain("50/100");
  });

  test('should show zero health', () => {
    const bar = new HealthBar(0, 100);
    const result = bar.toPrintString();
    expect(result).toContain("----------");
    expect(result).toContain("0/100");
  });
});
