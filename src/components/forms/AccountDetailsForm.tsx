import { Close } from '@radix-ui/react-dialog';
import { ColumnSpacingIcon } from '@radix-ui/react-icons';
import { setLogLevel } from 'firebase/app';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase/config';
import { updateUser } from '../../requests/userRequests';

export interface AccountDetailsFormProps {
  currentUserInfo: any;
  fetchCurrentUserInfo: (userId: string) => Promise<void>;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  currentUserInfo,
  fetchCurrentUserInfo
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: currentUserInfo.first_name,
      lastName: currentUserInfo.last_name,
      email: currentUserInfo.email
    }
  });
  const submitData = async (data: any) => {
    try {
      if (auth.currentUser?.email != data.email) {
        await updateUser(auth.currentUser?.uid!, 'email', data);
        fetchCurrentUserInfo(auth.currentUser?.uid!);
      } else if (
        data.firstName != currentUserInfo.first_name ||
        data.lastName != currentUserInfo.last_name
      ) {
        updateUser(auth.currentUser?.uid!, 'name', data);
        fetchCurrentUserInfo(auth.currentUser?.uid!);
      } else {
        console.log('No changes made');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(fetchCurrentUserInfo);

  return (
    <form
      className="account-details-form"
      onSubmit={handleSubmit((data) => submitData(data))}
    >
      <div className="account-form-input-container">
        <div className="form-input-label-container">
          <label htmlFor="">First name:</label>
          <input type="text" {...register('firstName')} />
        </div>
        <div className="form-input-label-container">
          <label htmlFor="">Last name:</label>
          <input type="text" {...register('lastName')} />
        </div>
        <div className="form-input-label-container">
          <label htmlFor="">Email:</label>
          <input type="email" {...register('email')} />
        </div>
      </div>
      {/* <Close asChild> */}
      <button className="form-save-button" type="submit">
        Save
      </button>
      {/* </Close> */}
    </form>
  );
};

export default AccountDetailsForm;
