// src/practice/Printable.ts

/**
 * Anything that can be converted to a printable string.
 */
export interface Printable {
  /** Convert this object to a display string */
  toPrintString(): string;
}

// TODO: Create a class ScoreDisplay that implements Printable.
//       It should have properties: playerName (string) and score (number).
//       toPrintString() should return something like "Alice: 350 pts"

// TODO: Create a class HealthBar that implements Printable.
//       It should have properties: current (number) and max (number).
//       toPrintString() should return something like "HP: [#####-----] 50/100"
//       (Use '#' for filled and '-' for empty, 10 characters total)

export class ScoreDisplay implements Printable {
  playerName : string;
  score : number;

  constructor(playerName : string, score:number) {
    this.playerName = playerName;
    this.score = score;
  }
  toPrintString() : string {
    return `${this.playerName}: ${this.score} pts`; 
  };
}

export class HealthBar implements Printable {
  current : number;
  max : number;


  constructor(current:number,max:number){
    this.current = current;
    this.max = max;
  }

  toPrintString() : string {
    let currentHash = "";
    let currentNotHash = "";
    for (let i =0; i < this.current; i++){
      currentHash += "#";
    }
    for (let x = 0; x < (this.max-this.current); x++){
      currentNotHash += "-";
    }

    return `HP: [${currentHash}${currentNotHash}] (${this.current}/${this.max})`; 
  };
}
