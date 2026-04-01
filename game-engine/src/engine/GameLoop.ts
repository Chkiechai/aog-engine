// src/engine/GameLoop.ts

import { setInterval } from "node:timers";

export class GameLoop {
  private running: boolean;
  private tickCount: number;
  lastTickTime: number;
  private targetFps: number;
  private frameInterval: number;
  private intervalId: ReturnType<typeof setInterval> | null;
  private onTick: (deltaTime: number) => void;

  /**
   * Create a new GameLoop.
   * @param targetFps - The desired frames per second (default: 30)
   * @param onTick - Callback function invoked each tick with delta time in seconds
   */
  constructor(targetFps: number = 30, onTick: (deltaTime: number) => void) {
    this.running = false;
    this.tickCount = 0;
    this.lastTickTime = 0;
    this.targetFps = targetFps;
    this.frameInterval = 0;
    this.intervalId = null;
    this.onTick = onTick;
  }

  /**
   * Start the game loop. If already running, does nothing.
   */
  start(): void {
    if (this.running === true){
      return;
    }
    else{
      this.running = true;
      this.frameInterval = 1000 / this.targetFps;
      this.lastTickTime = Date.now();
      this.intervalId = setInterval(()=>this.tick(), this.frameInterval);
    }
  }

  /**
   * Stop the game loop. If already stopped, does nothing.
   */
  stop(): void {
    if (this.running === false){
      return;
    }
    else {
      this.running = false;
      this.lastTickTime = 0;
      if (this.intervalId !== null){
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      return;
    }
  }

  /**
   * Execute one tick: calculate delta time, increment count, call onTick.
   * Does nothing if the loop is not running.
   */
  tick(): void {
    const deltaTime = (Date.now() - this.lastTickTime) / 1000;
    const now = Date.now();

    if (this.running === false){
      return;
    }
    else {
      this.lastTickTime = now;
      this.tickCount += 1;
      this.onTick(deltaTime);
    }
  }

  /** @returns The total number of ticks since construction */
  getTickCount(): number {
    return this.tickCount;
  }

  /** @returns Whether the loop is currently running */
  isRunning(): boolean {
    return this.running;
  }
}
