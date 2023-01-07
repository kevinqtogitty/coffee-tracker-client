import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { auth } from '../firebase/config';
import { getAllOrigins } from '../requests/originRequests';
import { getAllProcesses } from '../requests/processesrequests';

interface AddNewCoffeePageProps {
  processes: [];
  setProcesses: React.Dispatch<React.SetStateAction<[]>>;
  origins: [];
  setOrigins: React.Dispatch<React.SetStateAction<[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewCoffeePage: React.FC<AddNewCoffeePageProps> = ({
  processes,
  origins,
  setProcesses,
  setOrigins,
  setCurrentUser
}) => {
  const fetchFormFields = async () => {
    const origins = await getAllOrigins();
    const processes = await getAllProcesses();
    setProcesses(processes);
    setOrigins(origins);
  };

  if (auth.currentUser && processes.length === 0) {
    console.log('fetching form fields');
    fetchFormFields();
  }
  return (
    <section className="add-coffee-page">
      <Navigation setCurrentUser={setCurrentUser} />
      AddNewCoffeePage
    </section>
  );
};

export default AddNewCoffeePage;
