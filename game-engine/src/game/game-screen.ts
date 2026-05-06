import { Renderable } from "../engine/Renderable"
import { ScreenBuffer } from "../engine/ScreenBuffer"

export class ScreenRender implements Renderable {
  x : number;
  y : number;
  borderString : string;

  constructor(x:number, y:number, char:string){
    this.x = x;
    this.y = y;
    this.borderString = char;
  }

  drawTo(buffer: ScreenBuffer) : void{
    for (let i = 0; i < this.x; i++){
      for (let j = 0; j < this.y; j++){
        buffer.set(i,j,this.borderString);
      }
    }
  } 

}
