import {ScreenBuffer} from "../engine/ScreenBuffer"
import { Renderable } from "../engine/Renderable"


export class BorderRenderer implements Renderable {
  x : number;
  y: number;
  char : string;

  buffer : ScreenBuffer;
  renderables : Renderable[]

  constructor(char: string, x:number,y:number, buffer:ScreenBuffer){
    this.buffer = buffer;
    this.renderables = [];
    this.x = x;
    this.y = y;
    this.char = char;
  }

  drawTo(buffer: ScreenBuffer) : void {
  //NOTE: Right Side For Loop
    for (let l = this.y; l >= 0; l--){
      buffer.set((this.x-1),l,this.char);
    }

  //NOTE: Bottom for loop
    for (let l = this.x; l >= 0; l--){
      buffer.set(l,(this.y-1),this.char);
    }

    //NOTE: Top & Left For Loop

    for (let u = this.x; u >= 0; u--){
      for (let m = this.y; m >= 0; m--){
        if (m === 0 || u === this.x || u === 0 || m === this.y){
          buffer.set(u,m,this.char);
        }
      }
    }
  }

}

export class DescriptionBorder implements Renderable {
  x : number;
  y: number;
  text : string;

  buffer : ScreenBuffer;
  renderables : Renderable[]

  constructor(text: string, x:number,y:number, buffer:ScreenBuffer){
    this.buffer = buffer;
    this.renderables = [];
    this.x = x;
    this.y = y;
    this.text = text;
  }

  drawTo(buffer: ScreenBuffer) : void {
  
    //NOTE: Bottom for loop
    for (let l = this.x; l >= 0; l--){
      buffer.set(l,((this.y)/2),this.text);
    }

  }

}
