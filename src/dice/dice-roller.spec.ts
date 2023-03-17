import { diceRoller } from './dice-roller';
import assert from 'assert';
import { Combatant } from '../types';

describe('Test for the attack function', () => {
  const result = diceRoller(20);

  it('should return a positive number', () => {
    assert.equal(typeof result, 'number');
    assert.notStrictEqual(result, 0);
  });
});
