export const diceRoller = (faces: number) => {
  return Math.floor(Math.random() * faces + 1);
};
