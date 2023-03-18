import { useEffect, useState } from 'react';
import './styles/Arena.css';
import { diceRoller } from './dice/dice-roller';

import { CombatantCard } from './CombatantCard';

import { Dice } from './DiceBox';
import { CombatReporter } from './CombatReporter';
import { Combatant } from './types';

export function Arena({ first, second }: any) {
  const [firstHP, setFirstHP] = useState(Number(first.healthPoints));
  const [secondHP, setSecondHP] = useState(Number(second.healthPoints));
  const [diceRoll, setDiceRoll] = useState(diceRoller(20));
  const [diceReport, setDiceReport] = useState('FIGHT!');
  const [hitReport, setHitReport] = useState('');
  const [turn, setTurn] = useState(true);
  const [round, setRound] = useState(false);

  const firstTemplate: Combatant = {
    name: first.name,
    healthPoints: Number(first.healthPoints),
    tempHealthPoints: firstHP,
    toHit: Number(first.toHit),
    dodge: Number(first.dodge),
    damage: Number(first.damage),
    armor: Number(first.armor),
  };

  const secondTemplate: Combatant = {
    name: second.name,
    healthPoints: Number(second.healthPoints),
    tempHealthPoints: secondHP,
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

  const handleStartButtonClick = async () => {
    setFirstHP(firstTemplate.healthPoints);
    setSecondHP(secondTemplate.healthPoints);
    setRound(!round);
  };

  useEffect(() => {
    if (firstHP < 1 && firstTemplate.name.length > 0) {
      setRound(false);
      setTimeout(() => {
        setDiceReport(`${secondTemplate.name} wins!`);
        setHitReport('Play again?');
      }, 4000);
    }
  }, [firstHP]);

  useEffect(() => {
    if (secondHP < 1 && secondTemplate.name.length > 0) {
      setRound(false);
      setTimeout(() => {
        setDiceReport(`${firstTemplate.name} wins!`);
        setHitReport('Play again?');
      }, 4000);
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
        <CombatantCard
          combatant={firstTemplate}
          handleAttack={handleFirstAttackClick}
        />
      </div>
      <div className="middle-box">
        <Dice diceRoll={diceRoll} />
        <CombatReporter
          startButton={handleStartButtonClick}
          diceReport={diceReport}
          hitReport={hitReport}
        />
      </div>
      <div className="secondCombatant">
        <CombatantCard
          combatant={secondTemplate}
          handleAttack={handleSecondAttackClick}
        />
      </div>
    </div>
  );
}

export default Arena;
