// src/practice/Wallet.ts

export class Coin {
  value : number

  constructor(value: number) {
    this.value = value;
  }
}

export class Wallet {
  private coins: Coin[];

  constructor() {
    // TODO: Initialize empty coins array
    this.coins = [];
  }

  /** Add a coin to the wallet */
  addCoin(coin: Coin): void {
    this.coins.push(coin);
  }

  /** Get the total value of all coins */
  getTotal(): number {
    // TODO: Sum up all coin values

    let sum = 0;

    for (const coin of this.coins){
      sum += coin.value;
    }
      return sum;
  }

  /** Get the number of coins in the wallet */
  getCount(): number {
    return this.coins.length;
  }
}
