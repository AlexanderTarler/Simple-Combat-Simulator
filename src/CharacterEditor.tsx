import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { diceRoller } from './dice/dice-roller';
import {
  combatantTemplate,
  deleteCombatant,
  getAllCombatants,
  postCombatant,
  updateCombatant,
} from './fetcher';
import { Combatant } from './types';
import './styles/CharacterEditor.css';

export function CharacterCreator({ setCombatants }: any) {
  const [newName, setNewName] = useState('');
  const [points, setPoints] = useState(20);
  const [healthPoints, setHealthPoints] = useState(0);
  const [toHit, setToHit] = useState(0);
  const [dodge, setDodge] = useState(0);
  const [damage, setDamage] = useState(0);
  const [armor, setArmor] = useState(0);
  const [message, setMessage] = useState('');

  const combatantCreator: Combatant = {
    name: newName,
    healthPoints: healthPoints,
    armor: armor,
    dodge: dodge,
    toHit: toHit,
    damage: damage,
  };

  const getCombatantsAtStart = async () =>
    setCombatants(await getAllCombatants());

  function handleChange(evt: any) {
    setNewName(evt.target.value);
    setMessage(evt.target.value);
  }

  const handleCreateButtonClick = async () => {
    setMessage('');
    await postCombatant(combatantCreator);
    setCombatants(await getAllCombatants());
  };

  const handleUpdateButtonClick = async () => {
    setMessage('');
    await updateCombatant(combatantCreator);
    setCombatants(await getAllCombatants());
  };

  const handleDeleteButtonClick = async () => {
    setMessage('');
    await deleteCombatant(combatantCreator.name);
    setCombatants(await getAllCombatants());
  };

  useEffect(() => {
    getCombatantsAtStart();
  }, []);

  const increaseHP = () => {
    setHealthPoints((count) => count + 1);
    setPoints((count) => count - 1);
  };

  const decreaseHP = () => {
    setHealthPoints((count) => count - 1);
    setPoints((count) => count + 1);
  };
  const increaseArmor = () => {
    setArmor((count) => count + 1);
    setPoints((count) => count - 1);
  };

  const decreaseArmor = () => {
    setArmor((count) => count - 1);
    setPoints((count) => count + 1);
  };
  const increaseDodge = () => {
    setDodge((count) => count + 1);
    setPoints((count) => count - 1);
  };

  const decreaseDodge = () => {
    setDodge((count) => count - 1);
    setPoints((count) => count + 1);
  };
  const increaseToHit = () => {
    setToHit((count) => count + 1);
    setPoints((count) => count - 1);
  };

  const decreaseToHit = () => {
    setToHit((count) => count - 1);
    setPoints((count) => count + 1);
  };
  const increaseDamage = () => {
    setDamage((count) => count + 1);
    setPoints((count) => count - 1);
  };

  const decreaseDamage = () => {
    setDamage((count) => count - 1);
    setPoints((count) => count + 1);
  };

  const reset = () => {
    setPoints(20);
    setHealthPoints(0);
    setArmor(0);
    setDodge(0);
    setToHit(0);
    setDamage(0);
  };

  return (
    <div className="Creator">
      <header className="Creator-header">
        <h2>Create, update or delete your character</h2>
        <label>
          Name
          <input
            type="text"
            id="name"
            value={message}
            className="input-name"
            onChange={handleChange}
          />
        </label>
        <h3>You have {points} points left</h3>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>

        <div className="input-box">
          <label className="stat-field">
            Healthpoints
            <div>{combatantCreator.healthPoints}</div>
            <button className="stat-button" onClick={increaseHP}>
              +
            </button>
            <button className="stat-button" onClick={decreaseHP}>
              -
            </button>
          </label>
          <label className="stat-field">
            Armor
            <div>{combatantCreator.armor}</div>
            <button className="stat-button" onClick={increaseArmor}>
              +
            </button>
            <button className="stat-button" onClick={decreaseArmor}>
              -
            </button>
          </label>
          <label className="stat-field">
            Dodge
            <div>{combatantCreator.dodge}</div>
            <button className="stat-button" onClick={increaseDodge}>
              +
            </button>
            <button className="stat-button" onClick={decreaseDodge}>
              -
            </button>
          </label>
          <label className="stat-field">
            Attack
            <div>{combatantCreator.toHit}</div>
            <button className="stat-button" onClick={increaseToHit}>
              +
            </button>
            <button className="stat-button" onClick={decreaseToHit}>
              -
            </button>
          </label>
          <label className="stat-field">
            Damage
            <div>{combatantCreator.damage}</div>
            <button className="stat-button" onClick={increaseDamage}>
              +
            </button>
            <button className="stat-button" onClick={decreaseDamage}>
              -
            </button>
          </label>
        </div>
        <div className="editor-buttons">
          <button
            type="submit"
            className="create-button"
            onClick={() => {
              handleCreateButtonClick();
            }}
          >
            Create
          </button>
          <button
            type="submit"
            className="create-button"
            onClick={() => {
              handleUpdateButtonClick();
            }}
          >
            Update
          </button>
          <button
            className="create-button"
            onClick={() => handleDeleteButtonClick()}
          >
            Delete
          </button>
        </div>
      </header>
    </div>
  );
}
