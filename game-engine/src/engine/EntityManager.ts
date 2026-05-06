
// Number because Each Entity must be distinct & numbers are quick
// Can also use strings instead, but it is slower.
type Entity = number;

// NOTE: Entity Manager Class
export class EntityManager {

  /*
   * nextID: the Id that will be next retrieved in the EntityManager
   * entities: All of the entites in the EntityManager
   * Components: All of the little things inside the Entity, such as name, age, health, etc.
   */
  private nextId: number;
  private entities: Set<Entity>;
  private components: Map<Entity, Map<string, any>>;

  constructor() {
    this.nextId = 0;
    this.entities = new Set();
    this.components = new Map();
  }

  //NOTE: Entity Functions \/
  
  /*
  * This function creates a new entity with NO CURRENT VALUES. Just an empty Entity.
  */
  createEntity(): Entity {
    const id = this.nextId;
    this.nextId++;
    this.entities.add(id);
    this.components.set(id, new Map());
    return id;
  }

  /*
  * This function will destroy the desired Entity (Force Deletion).
  */
  destroyEntity(entity: Entity): void {
    this.entities.delete(entity);
    this.components.delete(entity);
  }


  /*
  * This function checks to see if the entity specified in the call() actually exists within
  * the Entity list.
  */
  entityExists(entity: Entity): boolean {
    return this.entities.has(entity);
  }


  // NOTE: Entity Component Functions
  
  /*
  * Add a new component to an Entity. 
  * EX: Player has [name, age, height]
  * Add component hair
  * Player has [name, age, height, hair]
  */
    addComponent(entity: Entity, name: string, data: object): void {
    let entityComponents = this.components.get(entity);
    if (!entityComponents) {
      return;
    }
    entityComponents.set(name, data);
  }

  /*
  * Find the component desired (name) and the value associated with it.
  * Ex: Player name (bob)
  * console.log(getComponent(player_name)) {THIS IS PSUEDO CODE}
  * Output = "bob"
  */
  getComponent(entity: Entity, name: string): any {
    let entityComponents = this.components.get(entity);
    if (!entityComponents){ 
      return undefined;
    }
    return entityComponents.get(name);
  }


  /*
  * Checks to see if desired Entity has a desired component.
  * Ex: Player [name,age, height]
  * Check for component hair
  * returns false, no component hair
  * & Vice Versa.
  */
  hasComponent(entity: Entity, name: string): boolean {
    let entityComponents = this.components.get(entity);
    if (!entityComponents){ 
      return false;
    }
    return entityComponents.has(name);
  }


  /*
  * Removes a desired component from a desired Entity. PERMANENT DELETION.
  */
  removeComponent(entity: Entity, name: string): void {
    let entityComponents = this.components.get(entity);
    if (entityComponents) {
      entityComponents.delete(name);
    }
  }

  // NOTE: Entity Querying Function

  /*
  * This function will check for any entities that have the componentNames listed 
  * in the function call parameters, then return all of them.
  */
  query(...componentNames: string[]): Entity[] {
    let entityNames: Entity[] = [];
    
    // Run Through Entities list, and check for any Entities that contain the components.
    for (const entity of this.entities) {
      let entityComponents = this.components.get(entity)!;
      let hasAll = componentNames.every(name => entityComponents.has(name));
      // If an Entity has all of the listed comonents, it pushes it to the EntityNames array.
      if (hasAll === true) {
        entityNames.push(entity);
      }
    }

    return entityNames;
  }

}
