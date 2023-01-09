import React, { useEffect, useState } from 'react';
import CoffeeAccordion from '../components/CoffeeAccordion';
import Navigation from '../components/Navigation';
import { auth } from '../firebase/config';
// import (getAllUsersCoffees) from '../requests/coffeeRequests.ts'
import { getAllUsersCoffees } from '../requests/coffeeRequests';
import { getAllOrigins } from '../requests/originRequests';
import { getAllProcesses } from '../requests/processesrequests';
import { getAllRoastLevels } from '../requests/roastLevelRequests';
import { Origins, Processes, RoastLevels, UsersCoffee } from '../types/types';

interface HomePageProps {
  usersCoffees: UsersCoffee[];
  processes: Processes[];
  origins: Origins[];
  setProcesses: React.Dispatch<React.SetStateAction<Processes[]>>;
  setOrigins: React.Dispatch<React.SetStateAction<Origins[]>>;
  setUsersCoffees: React.Dispatch<React.SetStateAction<UsersCoffee[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
  setRoastLevels: React.Dispatch<React.SetStateAction<RoastLevels[]>>;
  roastLevels: RoastLevels[];
}

const HomePage: React.FC<HomePageProps> = ({
  usersCoffees,
  setUsersCoffees,
  setCurrentUser,
  setProcesses,
  setOrigins,
  processes,
  origins,
  roastLevels,
  setRoastLevels
}) => {
  const fetchUsersCoffeeData = async (userId: string) => {
    const data = await getAllUsersCoffees(userId);
    setUsersCoffees(data);
  };

  const fetchFormFields = async () => {
    const origins = await getAllOrigins();
    const processes = await getAllProcesses();
    const roastLevels = await getAllRoastLevels();
    setOrigins(origins);
    setProcesses(processes);
    setRoastLevels(roastLevels);
  };

  if (auth.currentUser && usersCoffees.length === 0) {
    console.log('fetching users coffeers');
    fetchUsersCoffeeData(auth.currentUser.uid);
  }

  if (auth.currentUser && processes.length === 0) {
    console.log('fetching form fields');
    fetchFormFields();
  }

  return (
    <section className="home-page">
      <Navigation setCurrentUser={setCurrentUser} />
      <CoffeeAccordion
        usersCoffees={usersCoffees}
        origins={origins}
        processes={processes}
        roastLevels={roastLevels}
        fetchUsersCoffeeData={fetchUsersCoffeeData}
      />
    </section>
  );
};

export default HomePage;
