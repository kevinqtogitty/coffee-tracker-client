import axios from 'axios';

const getAllRoastLevels = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/roastLevels`
  );
  return data;
};

export { getAllRoastLevels };
