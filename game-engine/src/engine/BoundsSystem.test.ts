import { EntityManager } from './EntityManager';
import { BoundsSystem } from './BoundsSystem';
import { Position } from '../game/components'

describe('BoundsSystem', () => {
  test('clamps entity outside bounds to inside bounds', () => {
    const world = new EntityManager();
    const entity = world.createEntity();
    const boundsSystem = new BoundsSystem(12,13);

    world.addComponent(entity, 'position', { x: 13, y: 1 });
    const pos = world.getComponent(entity, 'position') as Position;

    boundsSystem.update(world,1);
    
    //Check the actual pos after bounds checking
    expect(pos.x).toBe(11);
    expect(pos.y).toBe(1);
  });

  test('Leaves entity inside bounds alone', () => {
    const world = new EntityManager();
    const entity = world.createEntity();
    const boundsSystem = new BoundsSystem(12,13);

    world.addComponent(entity, 'position', { x: 5, y: 1 });
    const pos = world.getComponent(entity, 'position') as Position;

    boundsSystem.update(world,1);
    
    //Check the actual pos after bounds checking
    expect(pos.x).toBe(5);
    expect(pos.y).toBe(1)


  });

});
