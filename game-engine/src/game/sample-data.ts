import {Player, Enemy, NPC} from "./types"

export const samplePlayer : Player = {
  name: "Ophelia Locke",
  alive : true,
  description: "A woman of average height, with tan, scarred skin and long blond hair. Her blue eyes are red with bloody tears."
}

export const sampleEnemy : Enemy = {
  name : "Chuck" ,
  playerSensed : false,
  alive: true,
  description : "A large, centipede-like Crawler"
}

export const sampleNPC : NPC = {
  name: "Breinne",
  description : "A tall woman with pale skin and short, brilliant red hair. She has brown eyes and many freckles.",
  alive: true,
  aggro: false
}
