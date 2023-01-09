import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { auth } from '../firebase/config';
import { getAllOrigins } from '../requests/originRequests';
import { getAllProcesses } from '../requests/processesrequests';

interface AddNewCoffeePageProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewCoffeePage: React.FC<AddNewCoffeePageProps> = ({
  setCurrentUser
}) => {
  return (
    <section className="add-coffee-page">
      <Navigation setCurrentUser={setCurrentUser} />
      AddNewCoffeePage
    </section>
  );
};

export default AddNewCoffeePage;
