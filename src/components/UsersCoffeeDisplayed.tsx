import React, { useState } from 'react';
import {
  Origins,
  Processes,
  RoastLevels,
  User,
  UsersCoffee
} from '../types/types';
import CoffeeAccordion from './CoffeeAccordion';
import CoffeeTable from './CoffeeTable';
import Dialog from './Dialog';
import EditCoffeeForm from './forms/EditCoffeeForm';

export interface UsersCoffeeDisplayedProps {
  usersCoffees: UsersCoffee[];
  origins: Origins[];
  processes: Processes[];
  roastLevels: RoastLevels[];
  fetchUsersCoffeeData: (userId: string) => Promise<void>;
  currentUserInfo?: any;
  setUsersCoffees: React.Dispatch<React.SetStateAction<UsersCoffee[]>>;
}
const UsersCoffeeDisplayed: React.FC<UsersCoffeeDisplayedProps> = (props) => {
  const [accordionViewActive, setAccordionViewActive] = useState(true);

  const toggleViewHandler = () => {
    setAccordionViewActive((state) => !state);
  };
  return (
    <section className="home-section">
      <h2 className="home-section-h2">
        Welcome {props.currentUserInfo?.first_name}!
      </h2>
      <button onClick={toggleViewHandler} className="toggle-view">
        Toggle view
      </button>
      {accordionViewActive ? (
        <CoffeeAccordion {...props} />
      ) : (
        <CoffeeTable {...props} />
      )}
    </section>
  );
};

export default UsersCoffeeDisplayed;
