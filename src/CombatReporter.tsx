import './styles/CombatReporter.css';

export function CombatReporter({ hitReport, diceReport }: any) {
  return (
    <div className="reporter">
      <h4>{diceReport}</h4>
      <h4>{hitReport}</h4>
    </div>
  );
}
