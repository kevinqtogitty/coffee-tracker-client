import React, { useEffect, useState } from 'react';
import CoffeeAccordion from '../components/CoffeeAccordion';
import Navigation from '../components/Navigation';
import { auth } from '../firebase/config';
import { getAllUsersCoffees } from '../requests/coffeeRequests';
import { getAllOrigins } from '../requests/originRequests';
import { getAllProcesses } from '../requests/processesrequests';
import { getAllRoastLevels } from '../requests/roastLevelRequests';
import {
  Origins,
  Processes,
  RoastLevels,
  User,
  UsersCoffee
} from '../types/types';

interface HomePageProps {
  usersCoffees: UsersCoffee[];
  processes: Processes[];
  origins: Origins[];
  setProcesses: React.Dispatch<React.SetStateAction<Processes[]>>;
  setOrigins: React.Dispatch<React.SetStateAction<Origins[]>>;
  setUsersCoffees: React.Dispatch<React.SetStateAction<UsersCoffee[]>>;
  setCurrentUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRoastLevels: React.Dispatch<React.SetStateAction<RoastLevels[]>>;
  fetchUsersCoffeeData: (userId: string) => Promise<void>;
  fetchCurrentUserInfo: (userId: string) => Promise<void>;
  roastLevels: RoastLevels[];
  currentUserInfo?: User;
  setCurrentUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const HomePage: React.FC<HomePageProps> = ({
  usersCoffees,
  setCurrentUserLoggedIn,
  setProcesses,
  setOrigins,
  processes,
  origins,
  roastLevels,
  setRoastLevels,
  fetchUsersCoffeeData,
  fetchCurrentUserInfo
}) => {
  const fetchFormFields = async () => {
    const [origins, processes, roastLevels] = await Promise.all([
      getAllOrigins(),
      getAllProcesses(),
      getAllRoastLevels()
    ]);
    setOrigins(origins);
    setProcesses(processes);
    setRoastLevels(roastLevels);
  };

  // Fetch coffee and user data
  if (auth.currentUser && usersCoffees.length === 0) {
    fetchUsersCoffeeData(auth.currentUser.uid);
    fetchCurrentUserInfo(auth.currentUser.uid);
  }

  // Fetch form fields for editing coffees
  if (auth.currentUser && processes.length === 0) {
    fetchFormFields();
  }

  return (
    <section className="home-page">
      <Navigation setCurrentUserLoggedIn={setCurrentUserLoggedIn} />
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
