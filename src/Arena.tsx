import React, { useEffect, useRef, useState } from 'react';
import './styles/Arena.css';
import { diceRoller } from './dice/dice-roller';
import { getAllCombatants, getCombatantByName } from './fetcher';
import { attack, damage } from './combat system/combat';
import CombatantList from './CombatantsList';
import { FirstCombatant } from './FirstCombatant';
import { SecondCombatant } from './SecondCombatant';
import { Dice } from './DiceBox';
import { CombatReporter } from './CombatReporter';
import { Combatant } from './types';

const combatantTemplate: Combatant = {
  name: '',
  healthPoints: 0,
  toHit: 0,
  dodge: 0,
  damage: 0,
  armor: 0,
};

export function Arena({ first, setFirst, second, setSecond }: any) {
  const [firstHP, setFirstHP] = useState(0);
  const [secondHP, setSecondHP] = useState(0);
  const [firstCombatantToGet, setFirstCombatantToGet] = useState('');
  const [secondCombatantToGet, setSecondCombatantToGet] = useState('');
  const [diceRoll, setDiceRoll] = useState(diceRoller(20));
  const [diceReport, setDiceReport] = useState('');
  const [hitReport, setHitReport] = useState('');
  const [turn, setTurn] = useState(true);
  const [round, setRound] = useState(false);
  const [response, setResponse] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const firstTemplate: Combatant = {
    name: first.name,
    healthPoints: firstHP,
    toHit: Number(first.toHit),
    dodge: Number(first.dodge),
    damage: Number(first.damage),
    armor: Number(first.armor),
  };

  const secondTemplate: Combatant = {
    name: second.name,
    healthPoints: secondHP,
    toHit: Number(second.toHit),
    dodge: Number(second.dodge),
    damage: Number(second.damage),
    armor: Number(second.armor),
  };

  useEffect(() => {
    setFirstHP(first.healthPoints);
  }, [first]);

  useEffect(() => {
    setSecondHP(second.healthPoints);
  }, [second]);

  function handleFirstChange(evt: any) {
    setFirstCombatantToGet(evt.target.value);
  }

  function handleSecondChange(evt: any) {
    setSecondCombatantToGet(evt.target.value);
  }

  const handleFirstAttackClick = async () => {
    const rollResult = diceRoller(20);
    const hitChance = rollResult + firstTemplate.toHit;
    const dodgeChance = secondTemplate.dodge + 10;
    const damage = firstTemplate.damage + diceRoller(5) - secondTemplate.armor;
    if (hitChance > dodgeChance) {
      setDiceRoll(rollResult);
      setDiceReport(
        `${firstTemplate.name} rolled a ${rollResult} + ${firstTemplate.toHit} vs ${secondTemplate.name}'s dodge!`,
      );
      setHitReport(
        `With a ${hitChance}, ${firstTemplate.name} hits ${secondTemplate.name} for ${damage} damage!`,
      );
      setSecondHP(secondHP - damage);
    } else {
      setDiceRoll(rollResult);
      setDiceReport(
        `${firstTemplate.name} rolled a ${rollResult} + ${firstTemplate.toHit} vs ${secondTemplate.name}'s dodge!`,
      );
      setHitReport(`${firstTemplate.name} missed!`);
    }
  };

  const handleSecondAttackClick = async () => {
    const rollResult = diceRoller(20);
    const hitChance = rollResult + secondTemplate.toHit;
    const damage = secondTemplate.damage + diceRoller(5) - firstTemplate.armor;

    if (hitChance > firstTemplate.dodge) {
      setDiceRoll(rollResult);
      setDiceReport(
        `${secondTemplate.name} rolled a ${rollResult} + ${secondTemplate.toHit} vs ${firstTemplate.name}'s dodge!`,
      );
      setHitReport(
        `With a ${hitChance}, ${secondTemplate.name} hits ${firstTemplate.name} for ${damage} damage!`,
      );
      setFirstHP(firstHP - damage);
    } else {
      setDiceRoll(rollResult);

      setDiceReport(
        `${secondTemplate.name} rolled a ${rollResult} + ${secondTemplate.toHit} vs ${firstTemplate.name}'s dodge!`,
      );
      setHitReport(`${secondTemplate.name} missed!`);
    }
  };

  const handleStartButtonClick = () => {
    setRound(!round);
  };

  useEffect(() => {
    if (firstHP < 1 && firstTemplate.name.length > 0) {
      setHitReport(`${secondTemplate.name} wins!`);
      setRound(false);
    }
  }, [firstHP]);

  useEffect(() => {
    if (secondHP < 1 && secondTemplate.name.length > 0) {
      setHitReport(`${firstTemplate.name} wins!`);
      setRound(false);
    }
  }, [secondHP]);

  useEffect(() => {
    if (round == true) {
      const timer = setTimeout(() => {
        if (turn) {
          handleFirstAttackClick();
          setTurn(!turn);
        } else {
          handleSecondAttackClick();
          setTurn(!turn);
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="Arena">
      <div className="firstCombatant">
        <FirstCombatant
          firstCombatant={firstTemplate}
          handleAttack={handleFirstAttackClick}
        />
      </div>
      <div className="middle-box">
        <Dice diceRoll={diceRoll} />
        <button
          className="fight-button"
          onClick={() => handleStartButtonClick()}
        >
          FIGHT!
        </button>
        <CombatReporter diceReport={diceReport} hitReport={hitReport} />
      </div>
      <div className="secondCombatant">
        <SecondCombatant
          secondCombatant={secondTemplate}
          handleAttack={handleSecondAttackClick}
        />
      </div>
    </div>
  );
}

export default Arena;
