
A problem with an inheritance-based Entity management system might look something like this (Keep in mind that this is psuedo code):

class Entity {

moves : bool,
isAlive : bool,
picksUpItems : bool

}

Now, we make a player, and a goblin

class Player extends Entity {

moves: true,
isAlive: true,
picksUpItems : true

}

class Goblin extends Entity {

moves: true,
isAlive : true,
picksUpItems : false

}

So far so good! But now, say we want to add Chest, Fireball, and InvisibleTrigger classes--and they're all Entities!
We'd have to go back and edit the old class, or make a new class for each new thing, such as ItemEntity, MobEntity, ParticleEnity, etc!

To make our lives easier, we decide to just edit the existing Entity class.

Now, it looks something like this:

class Entity {

isAlive: bool,
moves: bool,
picksUpItems: bool,
isItem : bool,
hasSprite: bool,
doesDamage:bool,
touchActivated : bool,
hasLifeSpan : bool
lifeSpanAmount : number

}

Oh no! Now we have to go back to our original entities (Player & Goblin) and fix those so we don't throw an error! As we can see, it gets messy very, very fast.

That's why an ECS, in this case, is a more compelling approach.
