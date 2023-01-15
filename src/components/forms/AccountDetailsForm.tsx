import { Close } from '@radix-ui/react-dialog';
import { ColumnSpacingIcon } from '@radix-ui/react-icons';
import { setLogLevel } from 'firebase/app';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BarLoader } from 'react-spinners';
import { auth } from '../../firebase/config';
import { isValidEmail } from '../../helpers/helpers';
import { updateUser } from '../../requests/userRequests';

export interface AccountDetailsFormProps {
  currentUserInfo: any;
  error: {
    name: string;
    message: string;
  };
  setError: React.Dispatch<
    React.SetStateAction<{
      name: string;
      message: string;
    }>
  >;
  fetchCurrentUserInfo: (userId: string) => Promise<void>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  currentUserInfo,
  fetchCurrentUserInfo,
  error,
  setError,
  isError,
  setIsError
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    defaultValues: {
      firstName: currentUserInfo.first_name,
      lastName: currentUserInfo.last_name,
      email: currentUserInfo.email
    }
  });

  // console.log(isSubmitSuccessful);
  const submitData = async (data: any) => {
    try {
      if (currentUserInfo.email != data.email && isValidEmail(data.email)) {
        await updateUser(auth.currentUser?.uid!, 'email', data);
        await fetchCurrentUserInfo(auth.currentUser?.uid!);
      } else if (
        data.firstName != currentUserInfo.first_name ||
        data.lastName != currentUserInfo.last_name
      ) {
        updateUser(auth.currentUser?.uid!, 'name', data);
        fetchCurrentUserInfo(auth.currentUser?.uid!);
      } else {
        console.log('No changes made');
      }

      if (auth.currentUser?.email === currentUserInfo.email) {
        setError({
          name: 'Email unchanged',
          message: 'Email to change to was the same'
        });
        setIsError(true);
        throw new Error('Email has not changed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="account-details-form"
      onSubmit={handleSubmit((data) => submitData(data))}
    >
      {isSubmitting ? (
        <BarLoader
          className="loader"
          aria-label="Loading Spinner"
          color={'#645caa'}
        />
      ) : isSubmitSuccessful && !isError ? (
        <span className="form-success-notification">Success!</span>
      ) : (
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
      )}

      {isSubmitting ? null : isSubmitSuccessful && !isError ? (
        <Close className="form-save-button">Close</Close>
      ) : (
        <button className="form-save-button" type="submit">
          Save
        </button>
      )}
    </form>
  );
};

export default AccountDetailsForm;
