import { useEffect, useState } from 'react';
import { combatantTemplate } from './App';
import {
  deleteCombatant,
  getAllCombatants,
  postCombatant,
  updateCombatant,
} from './fetcher';
import './styles/CharacterEditor.css';

export function CharacterCreator({ setCombatants }: any) {
  const [newName, setNewName] = useState('');
  const [points, setPoints] = useState(20);
  const [message, setMessage] = useState('');
  const [combatant, setCombatant] = useState(combatantTemplate);

  function handleChange(evt: any) {
    setMessage(evt.target.value);
    setNewName(evt.target.value);
  }

  const handleCreateButtonClick = async () => {
    setMessage('');
    await postCombatant(combatant);
    setCombatants(await getAllCombatants());
  };

  const handleUpdateButtonClick = async () => {
    setMessage('');
    await updateCombatant(combatant);
    setCombatants(await getAllCombatants());
  };

  const handleDeleteButtonClick = async () => {
    setMessage('');
    await deleteCombatant(newName);
    setCombatants(await getAllCombatants());
  };

  const changeStat = (stat: any) => {
    let newHealthPoints = combatant.healthPoints;
    let newArmor = combatant.armor;
    let newDodge = combatant.dodge;
    let newToHit = combatant.toHit;
    let newDamage = combatant.damage;

    switch (stat) {
      case 'incHealthPoints':
        newHealthPoints = newHealthPoints + 1;
        setPoints((count) => count - 1);

        break;
      case 'redHealthPoints':
        newHealthPoints = newHealthPoints - 1;
        setPoints((count) => count + 1);
        break;
      case 'incArmor':
        newArmor = newArmor + 1;
        setPoints((count) => count - 1);

        break;
      case 'redArmor':
        newArmor = newArmor - 1;
        setPoints((count) => count + 1);
        break;
      case 'incDodge':
        newDodge = newDodge + 1;
        setPoints((count) => count - 1);

        break;
      case 'redDodge':
        newDodge = newDodge - 1;
        setPoints((count) => count + 1);
        break;
      case 'incToHit':
        newToHit = newToHit + 1;
        setPoints((count) => count - 1);

        break;
      case 'redToHit':
        newToHit = newToHit - 1;
        setPoints((count) => count + 1);
        break;
      case 'incDamage':
        newDamage = newDamage + 1;
        setPoints((count) => count - 1);

        break;
      case 'redDamage':
        newDamage = newDamage - 1;
        setPoints((count) => count + 1);
        break;
      case '':
        break;
    }

    setCombatant({
      name: newName,
      healthPoints: newHealthPoints,
      armor: newArmor,
      dodge: newDodge,
      toHit: newToHit,
      damage: newDamage,
    });
  };

  useEffect(() => {
    changeStat('');
  }, []);

  const reset = () => {
    setPoints(20);
    setCombatant({
      name: newName,
      healthPoints: 0,
      armor: 0,
      dodge: 0,
      toHit: 0,
      damage: 0,
    });
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
            <div>{combatant.healthPoints}</div>
            <button
              className="stat-button"
              onClick={() => changeStat('incHealthPoints')}
            >
              +
            </button>
            <button
              className="stat-button"
              onClick={() => changeStat('redHealthPoints')}
            >
              -
            </button>
          </label>
          <label className="stat-field">
            Armor
            <div>{combatant.armor}</div>
            <button
              className="stat-button"
              onClick={() => changeStat('incArmor')}
            >
              +
            </button>
            <button
              className="stat-button"
              onClick={() => changeStat('redArmor')}
            >
              -
            </button>
          </label>
          <label className="stat-field">
            Dodge
            <div>{combatant.dodge}</div>
            <button
              className="stat-button"
              onClick={() => changeStat('incDodge')}
            >
              +
            </button>
            <button
              className="stat-button"
              onClick={() => changeStat('redDodge')}
            >
              -
            </button>
          </label>
          <label className="stat-field">
            Attack
            <div>{combatant.toHit}</div>
            <button
              className="stat-button"
              onClick={() => changeStat('incToHit')}
            >
              +
            </button>
            <button
              className="stat-button"
              onClick={() => changeStat('redToHit')}
            >
              -
            </button>
          </label>
          <label className="stat-field">
            Damage
            <div>{combatant.damage}</div>
            <button
              className="stat-button"
              onClick={() => changeStat('incDamage')}
            >
              +
            </button>
            <button
              className="stat-button"
              onClick={() => changeStat('redDamage')}
            >
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
