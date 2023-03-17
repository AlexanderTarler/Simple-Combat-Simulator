import { createContext } from 'react';
import { Combatant } from './types';

const templateCombatant: Combatant = {
  name: '',
  healthPoints: 0,
  toHit: 0,
  dodge: 0,
  damage: 0,
  armor: 0,
};

interface IGameContext {
  activePlayer: Combatant;
  round: number;
  setActivePlayer: (activePlayer: Combatant) => void;
  setRound: (round: number) => void;
}

export const AppContext = createContext<IGameContext>({
  activePlayer: templateCombatant,
  round: 0,
  setActivePlayer: (activePlayer: Combatant) => {},
  setRound: (round: number) => {},
});
