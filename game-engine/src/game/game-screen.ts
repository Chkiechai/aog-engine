import { Renderable } from "../engine/Renderable"
import { ScreenBuffer } from "../engine/ScreenBuffer"

export class ScreenBorder implements Renderable {
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

export class DescriptionText implements Renderable {
  x : number;
  y : number;
  textString : string;


  constructor(x:number, y:number, char:string){
    this.x = x;
    this.y = y;
    this.textString = char;
  }

  drawTo(buffer: ScreenBuffer) : void{
    buffer.writeText(this.x,this.y,this.textString)
    console.log(buffer.toString());
  } 

}
