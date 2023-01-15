import React, { useState } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import EditCoffeeForm, { EditCoffeeFormProps } from './forms/EditCoffeeForm';
import { Origins, Processes, RoastLevels, UsersCoffee } from '../types/types';
import AccountDetailsForm, {
  AccountDetailsFormProps
} from './forms/AccountDetailsForm';

interface DialogProps {
  coffee?: UsersCoffee;
  origins?: Origins[];
  processes?: Processes[];
  roastLevels?: RoastLevels[];
  fetchUsersCoffeeData?: (userId: string) => Promise<void>;
  AccountDetailsForm?: React.FC<AccountDetailsFormProps>;
  formKey?: number;
  currentUserInfo?: any;
  fetchCurrentUserInfo?: (userId: string) => Promise<void>;
}

const Dialog: React.FC<DialogProps> = ({
  coffee,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData,
  formKey,
  currentUserInfo,
  fetchCurrentUserInfo
}) => {
  const coffeeProps = {
    coffee: coffee,
    processes: processes,
    origins: origins,
    roastLevels: roastLevels,
    fetchUsersCoffeeData: fetchUsersCoffeeData
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({
    name: '',
    message: ''
  });

  const accountDetailsFormsProps = {
    currentUserInfo: currentUserInfo,
    fetchCurrentUserInfo: fetchCurrentUserInfo!,
    error: error,
    setError: setError,
    setIsError,
    isError
  };

  const handleDialogOpenClose = () => {
    setDialogOpen((state) => !state);
  };

  return (
    <RadixDialog.Root onOpenChange={handleDialogOpenClose}>
      <RadixDialog.Trigger className="dialog-trigger edit">
        Edit
      </RadixDialog.Trigger>
      <RadixDialog.Portal className="dialog-portal">
        <RadixDialog.Overlay className="dialog-overlay" />
        <RadixDialog.Content className="dialog-content">
          <RadixDialog.Close className="dialog-close">X</RadixDialog.Close>
          <RadixDialog.Title className="dialog-title">
            {formKey === 1 ? 'Edit coffee' : 'Edit your details'}
          </RadixDialog.Title>
          <RadixDialog.Description className="dialog-description">
            Make changes here. Click save when you're done.
          </RadixDialog.Description>
          {isError ? (
            <div className="dialog-error">
              {error.name}
              <br />
              {error.message}
            </div>
          ) : null}
          {formKey === 1 ? (
            <EditCoffeeForm {...coffeeProps} />
          ) : (
            <AccountDetailsForm {...accountDetailsFormsProps} />
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
