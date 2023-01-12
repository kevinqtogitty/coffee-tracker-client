import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { errorHandler } from '../firebase/error_handler/firebaseErrorHandler';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

interface Props {
  setCurrentUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<Props> = ({ setCurrentUserLoggedIn }) => {
  const navigate = useNavigate();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUserLoggedIn(false);
      navigate('/');
    } catch (error) {
      return errorHandler(error);
    }
  };
  return (
    <section className="side-bar">
      <NavigationMenu.Root className="nav-root">
        <NavigationMenu.List className="nav-list">
          <NavigationMenu.Item className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="nav-item">
            <NavLink className="nav-link" to="/addNewCoffee">
              Add a coffee
            </NavLink>
          </NavigationMenu.Item>
          <NavigationMenu.Item className="nav-item">
            <NavLink className="nav-link" to="/account">
              Account settings
            </NavLink>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <div className="acc-settings-container">
        <button className="logout-button" onClick={signOutUser}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Navigation;
