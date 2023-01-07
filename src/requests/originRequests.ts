import axios from 'axios';

const getAllOrigins = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/origins`);
  return data;
};

export { getAllOrigins };
