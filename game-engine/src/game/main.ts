import {ScreenBorder} from './game-screen'
import { ScreenBuffer } from '../engine/ScreenBuffer';
import { GameLoop } from '../engine/GameLoop';
import { Renderer } from '../engine/Renderer';
import { BorderRenderer, DescriptionRenderer } from "./renderable-classes"
import { FlickererEntityTester } from './flickerer_entity';

function main () {

  const bor = new ScreenBorder(213, 50, " ");
  const buffer = new ScreenBuffer(bor.x,bor.y, bor.borderString);
  const renderer = new Renderer(buffer)

  const borderRender = new BorderRenderer("#",bor.x,bor.y,buffer);
  const descriptionRenderer = new DescriptionRenderer("_",bor.x,bor.y,buffer)
  const flickerEntity = new FlickererEntityTester("@", 5, 5, buffer, 0);

  renderer.add(borderRender);
  renderer.add(descriptionRenderer);
  renderer.add(flickerEntity);
  
  const gameLoop = new GameLoop(30, (deltaTime) => {
    renderer.display();
  });

  gameLoop.start();

  setTimeout(() => {
    console.log('Timeout Finished, stopping Engine');
    gameLoop.stop();
  }, 5000);
}

main();
