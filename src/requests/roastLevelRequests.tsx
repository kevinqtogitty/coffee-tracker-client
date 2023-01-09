import axios from 'axios';
import { User } from '../types/types';

const getAllRoastLevels = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/roastLevels`
  );
  return data;
};

export { getAllRoastLevels };
