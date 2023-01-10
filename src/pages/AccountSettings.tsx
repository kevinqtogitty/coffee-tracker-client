import React from 'react';
import Navigation from '../components/Navigation';

interface AccountSettingProps {
  setCurrentUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountSettings: React.FC<AccountSettingProps> = ({
  setCurrentUsers
}) => {
  return (
    <section className="account-settings-page">
      <Navigation setCurrentUser={setCurrentUsers} />
      Account setting
    </section>
  );
};

export default AccountSettings;
