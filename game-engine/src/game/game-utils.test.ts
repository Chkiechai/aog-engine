import {getEntities} from "./game-utils";
import {Player, Enemy, NPC} from "./types";
import {samplePlayer, sampleEnemy, sampleNPC} from "./sample-data";

describe('get the entites', () => {
  test('returns player, npc, and enemy when called', () => {
    expect(getEntities(samplePlayer,sampleNPC,sampleEnemy)).toBeDefined();
  })
});
