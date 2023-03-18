import './styles/FightingCombatants.css';

export function CombatantCard({ combatant }: any) {
  return (
    <div>
      {combatant.name.length > 0 && (
        <header className="Combatants-header">
          <h1>Fighter</h1>
          <div></div>
          <div>
            <div className="fightingCombatant">
              <h3>Name: {combatant.name}</h3>
              <h3>Healthpoints: {combatant.tempHealthPoints}</h3>
              <h3>Armor: {combatant.armor}</h3>
              <h3>
                Dodge: {combatant.dodge + 10}({combatant.dodge} + 10)
              </h3>
              <h3>Attack: {combatant.toHit}</h3>
              <h3>Damage: {combatant.damage}</h3>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
