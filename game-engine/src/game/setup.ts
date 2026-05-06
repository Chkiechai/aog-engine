// src/game/setup.ts
import { EntityManager } from '../engine/EntityManager';

export function createWorld(): EntityManager {
  const world = new EntityManager();

  // Create the player
  const player = world.createEntity();

  // Create the NPC
  const npc_Jaidev = world.createEntity();

  // Create a Terrain
  const terrain_Waste = world.createEntity();

  world.addComponent(player, "position", { x: 5, y: 5 });
  world.addComponent(npc_Jaidev, "position", {x : 10, y : 10});

  world.addComponent(player, "velocity", { dx: 0, dy: 0 });

  world.addComponent(player, "description", {description : "Tall Slender Black Hair Pale Skin Green Eyes"});
  world.addComponent(npc_Jaidev, "description", {description : "Tall Fit Blond Hair Tan Skin Blue Eyes"});

  world.addComponent(terrain_Waste, "description", {description: "Acidic green fog covering a flat plane of green glass"})

  return world;
}
