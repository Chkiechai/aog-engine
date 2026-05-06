import { createWorld } from "./setup"

describe('createWorld', () => {
  test('should create a player with position and appearance', () => {
    const world = createWorld();
    const players = world.query("position", "description", "velocity");
    expect(players.length).toBe(1);

    const pos = world.getComponent(players[0], "position");
    expect(pos.x).toBeDefined();
    expect(pos.y).toBeDefined();
  });

  test('should create at least one wall', () => {
    const world = createWorld();
    const terrain = world.query("position", "description");
    // Should have more than just the player
    expect(terrain.length).toBeGreaterThan(1);
  });
});
