import { setLogLevel } from 'firebase/app';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface AccountDetailsFormProps {
  currentUserInfo: any;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  currentUserInfo
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
  const submitData = (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="account-details-form"
      onSubmit={handleSubmit((data) => submitData(data))}
    >
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
      <button type="submit">Save</button>
    </form>
  );
};

export default AccountDetailsForm;
