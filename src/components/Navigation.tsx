import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { errorHandler } from '../firebase/error_handler/firebaseErrorHandler';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { a, useSpring, useTrail, useTransition } from 'react-spring';

interface Props {
  setCurrentUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<Props> = ({ setCurrentUserLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const links = [
    { text: 'Home', path: '/home' },
    { text: '+Coffee', path: '/addNewCoffee' },
    { text: 'Settings', path: '/account' }
  ];

  const menuTransition = useTransition(menuOpen, {
    from: { opacity: 0, width: '0rem' },
    enter: { opacity: 1, width: '35rem' },
    leave: { opacity: 0, width: '0rem' }
  });

  const linksTrail = useTrail(links.length, {
    opacity: menuOpen ? 1 : 0,
    delay: 100
  });

  const AnimatedMenu = () =>
    menuTransition(
      (style, item) =>
        item && (
          <a.div style={style}>
            <NavigationMenu.List className="nav-list">
              {linksTrail.map((style, i) => (
                <a.div style={style}>
                  <NavigationMenu.Item className="nav-item">
                    <NavLink className="nav-link" to={`${links[i].path}`}>
                      {links[i].text}
                    </NavLink>
                  </NavigationMenu.Item>
                </a.div>
              ))}
            </NavigationMenu.List>
          </a.div>
        )
    );

  const handleMenu = () => {
    console.log('hello');
    setMenuOpen((state) => !state);
  };

  return (
    <section className="side-bar">
      <NavigationMenu.Root className="nav-root">
        <button className="nav-menu-toggle" onClick={handleMenu}>
          Menu
        </button>
        <AnimatedMenu />
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
