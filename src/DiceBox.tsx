import { useEffect, useState } from 'react';
import './styles/DiceBox.css';

export function Dice({ diceRoll }: any) {
  const [result, setResult] = useState(diceRoll);

  useEffect(() => {
    setResult(diceRoll);
  }, [diceRoll]);

  return (
    <div className="dice-box">
      <div>{result}</div>
    </div>
  );
}
