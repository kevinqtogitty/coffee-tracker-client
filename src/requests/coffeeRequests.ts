import axios from 'axios';
import { baseURL } from './userRequests';

const getAllUsersCoffees = async (userId: number) => {
  try {
    const { data } = await axios.get(`${baseURL}/coffee/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addCoffee = async (userId: number) => {
  try {
    const { data } = await axios.post(`${baseURL}/coffee`, userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllUsersCoffees, addCoffee };
