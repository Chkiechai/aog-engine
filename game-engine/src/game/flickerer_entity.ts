import {ScreenBuffer} from "../engine/ScreenBuffer"
import {Renderer} from "../engine/Renderer"
import { Renderable } from "../engine/Renderable"


export class FlickererEntityTester implements Renderable {
  x_pos : number;
  y_pos: number;
  char : string;
  deltaTime : number

  buffer : ScreenBuffer;
  renderables : Renderable[]

  constructor(char: string, xPos:number,yPos:number, buffer:ScreenBuffer, delta_time:number){
    this.buffer = buffer;
    this.renderables = [];
    this.x_pos = xPos;
    this.y_pos = yPos;
    this.char = char;
    this.deltaTime = delta_time;
  }


  update(deltaTime : number){
    if (this.x_pos !== -1 && this.y_pos !== -1){
      this.x_pos += 1;
      this.y_pos += 1;
    }
    
  }

  drawTo(buffer: ScreenBuffer) : void {
    this.update(this.deltaTime);
    buffer.set(this.x_pos,this.y_pos,this.char);
  }

}
