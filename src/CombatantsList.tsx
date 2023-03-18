import { useEffect, useState } from 'react';
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
  const [select, setSelect] = useState('Select first fighter!');

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
      setSelect('Select second fighter!');
    } else {
      setSecond(await getCombatantByName(combatant));
      setChoiceTarget(!choiceTarget);
      setSelect('Select first fighter!');
    }
  };

  return (
    <div className="Combatants">
      <h2>Fighters</h2>
      <header className="combatants-header">
        {combatants.map((combatant: Combatant) => (
          <div className="combatant list-tooltip">
            <button
              className="listed-combatant"
              onClick={() => {
                setCombatantChoice(combatant.name);
              }}
            >
              {combatant.name}
              <span className="list-tooltiptext">
                <h5>Name: {combatant.name}</h5>
                <h5>Healthpoints: {combatant.healthPoints}</h5>
                <h5>Armor: {combatant.armor}</h5>
                <h5>
                  Dodge: ({combatant.dodge + 10}) {combatant.dodge} + 10
                </h5>
                <h5>Attack: {combatant.toHit}</h5>
                <h5>Damage: {combatant.damage}</h5>
              </span>
            </button>
          </div>
        ))}
      </header>

      <h2>{select}</h2>
    </div>
  );
}

export default CombatantList;
