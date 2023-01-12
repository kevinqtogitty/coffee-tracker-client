import React, { useEffect, useState } from 'react';
import AddNewCoffeeForm from '../components/forms/AddNewCoffeeForm';
import Navigation from '../components/Navigation';
import { Origins, Processes, RoastLevels } from '../types/types';

export interface AddNewCoffeePageProps {
  processes: Processes[];
  origins: Origins[];
  roastLevels: RoastLevels[];
  fetchUsersCoffeeData: (userId: string) => Promise<void>;
  setCurrentUserLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewCoffeePage: React.FC<AddNewCoffeePageProps> = ({
  setCurrentUserLoggedIn,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData
}) => {
  return (
    <section className="add-coffee-page">
      <Navigation setCurrentUserLoggedIn={setCurrentUserLoggedIn!} />
      <AddNewCoffeeForm
        origins={origins}
        processes={processes}
        roastLevels={roastLevels}
        fetchUsersCoffeeData={fetchUsersCoffeeData}
      />
    </section>
  );
};

export default AddNewCoffeePage;
