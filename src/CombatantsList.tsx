import React, { useEffect, useRef, useState } from 'react';

import { diceRoller } from './dice/dice-roller';
import {
  combatantTemplate,
  getCombatantByName,
  getAllCombatants,
  deleteCombatant,
} from './fetcher';
import { Combatant } from './types';
import './styles/CombatantList.css';

export function CombatantList({ setFirst, setSecond, combatants }: any) {
  const [choiceTarget, setChoiceTarget] = useState(true);
  const [combatantChoice, setCombatantChoice] = useState('');
  const [select, setSelect] = useState('Select first combatant!');

  useEffect(() => {
    selectCombatant(combatantChoice);
  }, [combatantChoice]);

  const selectCombatant = async (combatant: string) => {
    if (combatant.length < 1) {
      return;
    }
    if (choiceTarget == true) {
      // setSelect('Select first combatant!');
      setFirst(await getCombatantByName(combatant));
      setChoiceTarget(!choiceTarget);
      setSelect('Select second combatant!');
    } else {
      setSecond(await getCombatantByName(combatant));
      setChoiceTarget(!choiceTarget);
      setSelect('Select first combatant!');
    }
  };

  return (
    <div className="Combatants">
      <h2>Combatant list</h2>
      <header className="combatants-header">
        {combatants.map((combatant: Combatant) => (
          <div className="combatant">
            <button
              className="listed-combatant"
              onClick={() => {
                setCombatantChoice(combatant.name);
              }}
            >
              {combatant.name}
            </button>
          </div>
        ))}
      </header>

      <h2>{select}</h2>
    </div>
  );
}

export default CombatantList;
