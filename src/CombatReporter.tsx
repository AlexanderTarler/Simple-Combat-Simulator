import './styles/CombatReporter.css';

export function CombatReporter({ startButton, hitReport, diceReport }: any) {
  return (
    <button className="reporter fight-button" onClick={startButton}>
      <h3>{diceReport}</h3>
      <h3>{hitReport}</h3>
    </button>
  );
}
