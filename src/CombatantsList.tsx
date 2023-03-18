import React, { useEffect, useRef, useState } from 'react';

import { diceRoller } from './dice/dice-roller';
import { getCombatantByName, getAllCombatants } from './fetcher';
import { Combatant } from './types';
import './styles/CombatantList.css';

export function CombatantList({
  setFirst,
  setSecond,
  combatants,
  setCombatants,
}: any) {
  const [choiceTarget, setChoiceTarget] = useState(true);
  const [combatantChoice, setCombatantChoice] = useState('');
  const [select, setSelect] = useState('Select first combatant!');

  const getCombatantsAtStart = async () =>
    setCombatants(await getAllCombatants());

  useEffect(() => {
    getCombatantsAtStart();
  }, []);

  useEffect(() => {
    selectCombatant(combatantChoice);
  }, [combatantChoice]);

  const selectCombatant = async (combatant: string) => {
    if (combatant.length < 1) {
      return;
    }
    if (choiceTarget == true) {
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
