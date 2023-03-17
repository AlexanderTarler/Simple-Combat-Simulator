import React, { useEffect, useState } from 'react';
import {
  combatantTemplate,
  getAllCombatants,
  getCombatantByName,
} from './fetcher';
import { attack, damage } from './combat system/combat';
import { Combatant } from './types';
import './styles/FightingCombatants.css';

export function SecondCombatant({ secondCombatant }: any) {
  return (
    <div>
      <header className="Combatants-header">
        <h1>Combatant</h1>
        <div></div>
        <div>
          <div className="fightingCombatant">
            <h3>Name: {secondCombatant.name}</h3>
            <h3>Healthpoints: {secondCombatant.healthPoints}</h3>
            <h3>Armor: {secondCombatant.armor}</h3>
            <h3>
              Dodge: {secondCombatant.dodge + 10}({secondCombatant.dodge} + 10)
            </h3>
            <h3>Attack: {secondCombatant.toHit}</h3>
            <h3>Damage: {secondCombatant.damage}</h3>
          </div>
        </div>
      </header>
    </div>
  );
}
