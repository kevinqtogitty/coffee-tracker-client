import React from 'react';
import Navigation from '../components/Navigation';
import AccountDetailsForm from '../components/forms/AccountDetailsForm';
import Dialog from '../components/Dialog';

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
      <article className="account-info-container">
        <div>
          <h2>Your account details:</h2>
          <p>First name: {currentUserInfo?.first_name}</p>
          <p>Last name: {currentUserInfo?.last_name}</p>
          <p>Email: {currentUserInfo?.email}</p>
          <p>
            Reset password: <button>send email reset</button>
          </p>
        </div>
        <Dialog
          AccountDetailsForm={AccountDetailsForm}
          currentUserInfo={currentUserInfo}
          formKey={0}
        />
      </article>
    </section>
  );
};

export default AccountSettings;
