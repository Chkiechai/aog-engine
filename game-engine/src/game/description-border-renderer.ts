import {Renderable} from "../engine/Renderable";
import {ScreenBuffer} from "../engine/ScreenBuffer";

export class DescriptionRender implements Renderable {
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
