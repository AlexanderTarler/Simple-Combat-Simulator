import { useState } from 'react';
import Arena from './Arena';
import { CharacterCreator } from './CharacterEditor';
import './styles/App.css';
import CombatantList from './CombatantsList';
import { Combatant } from './types';

export const combatantTemplate: Combatant = {
  name: '',
  healthPoints: 10,
  toHit: 0,
  dodge: 0,
  damage: 1,
  armor: 0,
};

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
        second={secondCombatant}
        setCombatants={setCombatants}
      />
    </div>
  );
}

export default App;
