import {ScreenBuffer} from "../engine/ScreenBuffer"
import {Renderer} from "../engine/Renderer"
import { Renderable } from "../engine/Renderable"
import { InputSource } from "../engine/InputSource"


export class FlickererEntityTester implements Renderable {
  x_pos : number;
  y_pos: number;
  char : string;
  deltaTime : number;
  input : InputSource;

  buffer : ScreenBuffer;
  renderables : Renderable[]

  constructor(char: string, xPos:number,yPos:number, buffer:ScreenBuffer, delta_time:number, input : InputSource){
    this.buffer = buffer;
    this.renderables = [];
    this.x_pos = xPos;
    this.y_pos = yPos;
    this.char = char;
    this.deltaTime = delta_time;
    this.input = input;
  }


  update(deltaTime : number, input:InputSource){
    if (input.isKeyPressed('left')) this.x_pos -= 1;
    if (input.isKeyPressed('right')) this.x_pos += 1;
    if (input.isKeyPressed('up')) this.y_pos -= 1;
    if (input.isKeyPressed('down')) this.y_pos+= 1;
  }

  drawTo(buffer: ScreenBuffer) : void {
    this.update(this.deltaTime, this.input);
    buffer.set(this.x_pos,this.y_pos,this.char);
  }

}
