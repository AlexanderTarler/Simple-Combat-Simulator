import { Combatant } from '../types';
import { diceRoller } from '../dice/dice-roller';

export const attack = (attacker: Combatant, defender: Combatant) => {
  return attacker.toHit + diceRoller(20) > defender.dodge;
};

export const damage = (attacker: Combatant, defender: Combatant) => {
  return (
    defender.healthPoints + defender.armor - (attacker.damage + diceRoller(10))
  );
};
