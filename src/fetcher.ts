import axios from 'axios';
import { Combatant } from './types';

export const combatantTemplate: Combatant = {
  name: '',
  healthPoints: 0,
  toHit: 0,
  dodge: 0,
  damage: 0,
  armor: 0,
};

export const getAllCombatants = async () => {
  let newArray: any = [];
  try {
    await axios.get(`http://localhost:3000/combatants`).then((res) => {
      const combatants = res.data;
      newArray.push(combatants);
      return { persons: combatants };
    });
  } catch (error) {
    console.log(error);
  }

  return newArray.flat();
};

export const getMonsterByName = async (prompt: string) => {
  let newArray: any = [];
  try {
    await axios
      .get(`http://localhost:3000/combatants/${prompt}`)
      .then((res) => {
        const combatants = res.data;
        newArray.push(combatants);
        return { persons: combatants };
      });
  } catch (error) {
    console.log(error);
  }

  return newArray.flat();
};

export const updateCombatant = async (combatant: Combatant) => {
  try {
    await axios.put(`http://localhost:3000/combatants/${combatant.name}`, {
      name: combatant.name,
      healthPoints: combatant.healthPoints,
      toHit: combatant.toHit,
      dodge: combatant.dodge,
      damage: combatant.damage,
      armor: combatant.armor,
    });
  } catch (error) {
    console.log(error);
  }

  return combatant;
};
export const getCombatantByName = async (name: string) => {
  let combatant: Combatant = {
    name: '',
    healthPoints: 0,
    toHit: 0,
    dodge: 0,
    damage: 0,
    armor: 0,
  };

  try {
    await axios
      .get(`http://localhost:3000/combatants/${name}`, {
        data: name,
      })
      .then((res) => {
        const result = res.data;

        combatant = {
          name: result.name,
          healthPoints: result.healthPoints,
          toHit: result.toHit,
          dodge: result.dodge,
          damage: result.damage,
          armor: result.armor,
        };

        return result;
      });
  } catch (error) {
    console.log(error);
  }

  return combatant;
};

export const postCombatant = async (newCombatant: Combatant) => {
  try {
    await axios.post(`http://localhost:3000/combatants`, {
      name: newCombatant.name,
      healthPoints: newCombatant.healthPoints,
      toHit: newCombatant.toHit,
      dodge: newCombatant.dodge,
      damage: newCombatant.damage,
      armor: newCombatant.armor,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCombatant = async (name: string) => {
  console.log('Here');

  try {
    await axios.delete(`http://localhost:3000/combatants/${name}`, {
      data: name,
    });
  } catch (error) {
    console.log(error);
  }
};
