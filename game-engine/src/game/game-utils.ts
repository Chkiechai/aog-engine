import {Player, Enemy, NPC} from "./types"

export function getEntities(player : Player, npc : NPC, enemy:Enemy){
  return {
    player,
    npc,
    enemy
  };
}

