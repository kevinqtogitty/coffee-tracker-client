import React, { useEffect, useState } from 'react';
import CoffeeAccordion from '../components/CoffeeAccordion';
import Navigation from '../components/Navigation';
import { auth } from '../firebase/config';
// import (getAllUsersCoffees) from '../requests/coffeeRequests.ts'
import { getAllUsersCoffees } from '../requests/coffeeRequests';
import { UsersCoffee } from '../types/types';

interface HomePageProps {
  usersCoffees: UsersCoffee[];
  setUsersCoffees: React.Dispatch<React.SetStateAction<UsersCoffee[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({
  usersCoffees,
  setUsersCoffees,
  setCurrentUser
}) => {
  const fetchUsersCoffeeData = async (userId: string) => {
    const data = await getAllUsersCoffees(userId);
    setUsersCoffees(data);
  };

  if (auth.currentUser && usersCoffees.length === 0) {
    console.log('fetching users coffeers');
    fetchUsersCoffeeData(auth.currentUser.uid);
  }

  return (
    <section className="home-page">
      <Navigation setCurrentUser={setCurrentUser} />
      <CoffeeAccordion usersCoffees={usersCoffees} />
    </section>
  );
};

export default HomePage;
