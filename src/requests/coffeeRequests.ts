import axios from 'axios';

const getAllUsersCoffees = async (userId: string) => {
  console.log('here');
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/coffee/${userId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addCoffee = async (userId: string) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/coffee`,
      userId
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllUsersCoffees, addCoffee };
