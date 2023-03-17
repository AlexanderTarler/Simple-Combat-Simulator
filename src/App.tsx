import React, { useEffect, useState, useContext } from 'react';
import logo from './logo.svg';
import { diceRoller } from './dice/dice-roller';
import { getAllCombatants, combatantTemplate } from './fetcher';
import { Combatant } from './types';
import Arena from './Arena';
import { CharacterCreator } from './CharacterEditor';
import './styles/App.css';
import CombatantList from './CombatantsList';

function App() {
  const [firstCombatant, setFirstCombatant] = useState(combatantTemplate);
  const [secondCombatant, setSecondCombatant] = useState(combatantTemplate);
  const [combatants, setCombatants] = useState([combatantTemplate]);

  return (
    <div className="App">
      <div className="header">
        <CharacterCreator setCombatants={setCombatants} />
        <CombatantList
          setFirst={setFirstCombatant}
          setSecond={setSecondCombatant}
          combatants={combatants}
          setCombatants={setCombatants}
        />
      </div>
      <Arena
        first={firstCombatant}
        setFirst={setFirstCombatant}
        second={secondCombatant}
        setSecond={setSecondCombatant}
        setCombatants={setCombatants}
      />
    </div>
  );
}

export default App;
