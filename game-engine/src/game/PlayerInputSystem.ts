import { System } from '../engine/System';
import { EntityManager } from '../engine/EntityManager';
import { InputSource } from '../engine/InputSource';
import { Velocity } from './components';

export class PlayerInputSystem implements System {
  // TODO: constructor takes an InputSource and the player Entity id
  // TODO: each tick, read input state and set the player's velocity
  //   - left pressed  → velocity.dx = -speed
  //   - right pressed → velocity.dx = +speed
  //   - up pressed    → velocity.dy = -speed
  //   - down pressed  → velocity.dy = +speed
  //   - nothing pressed → dx = dy = 0

  player_id : number;
  input : InputSource;
  speed : number;

  constructor (inputSource : InputSource, player_id : number, speed : number) {
    this.player_id = player_id;
    this.input = inputSource;
    this.speed = speed;
  }

  update(world: EntityManager, deltaTime: number): void {
    const vel = world.getComponent(this.player_id, 'velocity') as Velocity;
    if (!vel) return;

    vel.dx = 0;
    vel.dy = 0;

    if (this.input.isKeyPressed('left'))  vel.dx = -this.speed;
    if (this.input.isKeyPressed('right')) vel.dx = +this.speed;
    if (this.input.isKeyPressed('up'))    vel.dy = -this.speed;
    if (this.input.isKeyPressed('down'))  vel.dy = +this.speed;
  }

}
