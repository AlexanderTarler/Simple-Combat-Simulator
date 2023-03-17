import React, { useEffect, useState } from 'react';
import {
  combatantTemplate,
  getAllCombatants,
  getCombatantByName,
} from './fetcher';
import { attack, damage } from './combat system/combat';
import { Combatant } from './types';
import './styles/FightingCombatants.css';

export function FirstCombatant({ firstCombatant }: any) {
  return (
    <div>
      <header className="Combatants-header">
        <h1>Combatant</h1>
        <div></div>
        <div>
          <div className="fightingCombatant">
            <h3>Name: {firstCombatant.name}</h3>
            <h3>Healthpoints: {firstCombatant.healthPoints}</h3>
            <h3>Armor: {firstCombatant.armor}</h3>
            <h3>
              Dodge: ({firstCombatant.dodge + 10}) {firstCombatant.dodge} + 10
            </h3>
            <h3>Attack: {firstCombatant.toHit}</h3>
            <h3>Damage: {firstCombatant.damage}</h3>
          </div>
        </div>
      </header>
    </div>
  );
}
