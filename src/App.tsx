import { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from 'react-router-dom';
import { auth } from './firebase/config';
import AccountSettings from './pages/AccountSettings';
import AddNewCoffeePage from './pages/AddNewCoffeePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { getAllUsersCoffees } from './requests/coffeeRequests';
import { getCurrentUserData } from './requests/userRequests';
import {
  Origins,
  Processes,
  RoastLevels,
  User,
  UsersCoffee
} from './types/types';

import { AuthRoutes } from './utils/AuthRoute';

function App() {
  const [origins, setOrigins] = useState<Origins[]>([]);
  const [processes, setProcesses] = useState<Processes[]>([]);
  const [roastLevels, setRoastLevels] = useState<RoastLevels[]>([]);
  const [usersCoffees, setUsersCoffees] = useState<UsersCoffee[]>([]);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] =
    useState<boolean>(false);
  const [currentUserInfo, setCurrentUserInfo] = useState<User>();

  /*
    We can't call useNavigate outside a react-router-dom route so 
    we have to use a useState variable. When the auth changes on refresh from
    null to true, in the login page it will check and navigate to home if true
  */

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User has logged in');
      setCurrentUserLoggedIn(true);
    } else {
      console.log('user is not logged in');
    }
  });

  const fetchUsersCoffeeData = async (userId: string) => {
    const data = await getAllUsersCoffees(userId);
    setUsersCoffees(data);
  };

  const fetchCurrentUserInfo = async (userId: string) => {
    const data = await getCurrentUserData(userId);
    setCurrentUserInfo(data);
  };

  const homepageProps = {
    currentUserInfo: currentUserInfo,
    usersCoffees: usersCoffees,
    processes: processes,
    origins: origins,
    roastLevels: roastLevels,
    setRoastLevels: setRoastLevels,
    setUsersCoffees: setUsersCoffees,
    setCurrentUserLoggedIn: setCurrentUserLoggedIn,
    setOrigins: setOrigins,
    setProcesses: setProcesses,
    fetchUsersCoffeeData: fetchUsersCoffeeData,
    setCurrentUserInfo: setCurrentUserInfo,
    fetchCurrentUserInfo: fetchCurrentUserInfo
  };

  const addNewCoffeeProps = {
    origins: origins,
    processes: processes,
    roastLevels: roastLevels,
    fetchUsersCoffeeData: fetchUsersCoffeeData,
    setCurrentUserLoggedIn: setCurrentUserLoggedIn,
    fetchCurrentUserInfo: fetchCurrentUserInfo
  };

  console.log(currentUserInfo);

  return (
    <Router>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route
            element={
              <AccountSettings
                setCurrentUserLoggedIn={setCurrentUserLoggedIn}
                currentUserInfo={currentUserInfo}
                fetchCurrentUserInfo={fetchCurrentUserInfo}
              />
            }
            path="/account"
          />
          <Route element={<HomePage {...homepageProps} />} path="/home" />
          <Route
            element={<AddNewCoffeePage {...addNewCoffeeProps} />}
            path="/addNewCoffee"
          />
        </Route>
        <Route
          element={<LoginPage currentUserLoggedIn={currentUserLoggedIn} />}
          path="/"
        />
      </Routes>
    </Router>
  );
}

export default App;
