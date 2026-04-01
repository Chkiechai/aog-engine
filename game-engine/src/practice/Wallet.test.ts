// src/practice/Wallet.test.ts
import { Coin, Wallet } from './Wallet';

describe('Wallet', () => {
  test('should start empty', () => {
    const wallet = new Wallet();
    expect(wallet.getTotal()).toBe(0);
    expect(wallet.getCount()).toBe(0);
  });

  test('should track coins', () => {
    const wallet = new Wallet();
    wallet.addCoin(new Coin(25));
    wallet.addCoin(new Coin(10));
    wallet.addCoin(new Coin(5));
    expect(wallet.getTotal()).toBe(40);
    expect(wallet.getCount()).toBe(3);
  });
});
