import { attack, damage } from './combat';
import assert from 'assert';
import { Combatant } from '../types';

const strongCombatant: Combatant = {
  name: 'Firsty McFirst',
  healthPoints: 10,
  toHit: 10,
  dodge: 25,
  damage: 6,
  armor: 4,
};

const weakCombatant = {
  name: 'Secondo Second',
  healthPoints: 10,
  toHit: 2,
  dodge: 4,
  damage: 6,
  armor: 4,
};

describe('Test for the attack function', () => {
  const successResult = attack(strongCombatant, weakCombatant);
  const failedResult = attack(weakCombatant, strongCombatant);
  it('should return true on a hit', () => {
    assert.equal(successResult, true);
    assert.notStrictEqual(successResult, false);
  });
  it('should return false on a miss', () => {
    assert.strictEqual(failedResult, false);
    assert.notStrictEqual(failedResult, true);
  });
});

describe('Test for the damage function', () => {
  const result = damage(strongCombatant, weakCombatant);
  it('should reduce the defendants hp', () => {
    assert.notEqual(result, 10);
    assert.notStrictEqual(result, 10);
  });
});
