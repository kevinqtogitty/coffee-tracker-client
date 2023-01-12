import React from 'react';
import Navigation from '../components/Navigation';

interface AccountSettingProps {
  setCurrentUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserInfo?: any;
}

const AccountSettings: React.FC<AccountSettingProps> = ({
  setCurrentUserLoggedIn,
  currentUserInfo
}) => {
  return (
    <section className="account-settings-page">
      <Navigation setCurrentUserLoggedIn={setCurrentUserLoggedIn} />
      <h2>Your account details:</h2>
      <article>
        <p>First name: {currentUserInfo?.first_name}</p>
        <p>Last name: {currentUserInfo?.last_name}</p>
        <p>Email: {currentUserInfo?.email}</p>
        <p>
          Reset password: <button>send email reset</button>
        </p>
      </article>
    </section>
  );
};

export default AccountSettings;
