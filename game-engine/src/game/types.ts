// This is where I will define the basic world types for my AOG text adventure game.
// NPC, Player, Enemy

/*
 * Type: Player 
 * It will have three different parts to it:
 * Name : string
 * Alive : boolean
 * Description: string
 */
export type Player = {
  /*
   * The name of the player. They will give this input. (Remember to check for valid input--no symbols, just 0-9 & a-z)
   */
  name : string | "Addwyn",
  /*
   * This checks to see whether the player is alive or dead. If they are dead, the game will end.
   */
  alive : boolean,
  /*
   * This is the player-inputed description of what their player looks like. Defaults to Addwyn's description.
   */
  description : string |"Tall, slender, well-muscled, with pale, scarred skin, short feathery black hair, and brilliantly green-gray eyes."
}

/*
 * Type: NPC
 * It has four parts to it:
 * Name
 * Description
 * Alive
 * Aggro
 */
export type NPC = {
  /*
   * Name: Pretty obvious. It's the NPC's name :)
   */
  name : string,
  /*
   * Description: The description of the NPC i.e. voice, appearance.
   */
  description : string,
  /*
   * Alive: True if alive, false if dead. Mostly relates to player attacks and enemy attacks.
   */
  alive : boolean,
  /*
   * Aggro: if the player does something insulting, the NPC will get annoyed 
   * and won't talk. If the player does something worse, the NPC becomes an enemy.
   */
  aggro : boolean
}

/*
 * Type: Enemy
 * The Enemy will not parlay with the player--it will only attack.
 * It has four parts to it:
 * Name
 * PlayerSensed
 * Alive
 * Description
 */
export type Enemy = {
  /*
   * Name: It's the name. Of the enemy.
   */
  name: string,
  /*
   * PlayerSensed: Returns true if it sees the Player--basically aggro
   */
  playerSensed : boolean,
  /*
   *Alive: True if alive, false if dead.
   */
  alive : boolean,
  /*
   * Description: The description of the enemy.
   */
  description : string
}
