import React, { useEffect, useState } from 'react';
import './styles/CombatReporter.css';
import { diceRoller } from './dice/dice-roller';
import { getAllCombatants, combatantTemplate } from './fetcher';
import { attack, damage } from './combat system/combat';
import CombatantList from './CombatantsList';
import { FirstCombatant } from './FirstCombatant';
import { Dice } from './DiceBox';

export function CombatReporter({ hitReport, diceReport }: any) {
  return (
    <div className="reporter">
      <h4>{diceReport}</h4>
      <h4>{hitReport}</h4>
    </div>
  );
}
