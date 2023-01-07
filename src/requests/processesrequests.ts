import axios from 'axios';
import { User } from '../types/types';

const getAllProcesses = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/processes`
  );
  return data;
};

export { getAllProcesses };
