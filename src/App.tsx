import { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from 'react-router-dom';
import { auth } from './firebase/config';
import AddNewCoffeePage from './pages/AddNewCoffeePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { Origins, Processes, RoastLevels, UsersCoffee } from './types/types';

import { AuthRoutes } from './utils/AuthRoute';

function App() {
  const [origins, setOrigins] = useState<Origins[]>([]);
  const [processes, setProcesses] = useState<Processes[]>([]);
  const [roastLevels, setRoastLevels] = useState<RoastLevels[]>([]);
  const [usersCoffees, setUsersCoffees] = useState<UsersCoffee[]>([]);
  const [currentUser, setCurrentUser] = useState<boolean>(false);

  /*
    We can't call useNavigate outside a react-router-dom route so 
    we have to use a useState variable. When the auth changes on refresh from
    null to true, in the login page it will check and navigate to home if true
  */

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User has logged in');
      setCurrentUser(true);
    } else {
      console.log('user is not logged in');
    }
  });
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route
            element={
              <HomePage
                usersCoffees={usersCoffees}
                processes={processes}
                origins={origins}
                roastLevels={roastLevels}
                setRoastLevels={setRoastLevels}
                setUsersCoffees={setUsersCoffees}
                setCurrentUser={setCurrentUser}
                setOrigins={setOrigins}
                setProcesses={setProcesses}
              />
            }
            path="/home"
          />
          <Route
            element={<AddNewCoffeePage setCurrentUser={setCurrentUser} />}
            path="/addNewCoffee"
          />
        </Route>
        <Route element={<LoginPage currentUser={currentUser} />} path="/" />
      </Routes>
    </Router>
  );
}

export default App;
