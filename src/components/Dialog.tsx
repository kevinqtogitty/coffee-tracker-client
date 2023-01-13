import React from 'react';
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
  EditCoffeeForm?: React.FC<EditCoffeeFormProps>;
  AccountDetailsForm?: React.F<AccountDetailsFormProps>;
  formKey?: number;
  currentUserInfo?: any;
}

const Dialog: React.FC<DialogProps> = ({
  coffee,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData,
  EditCoffeeForm,
  formKey,
  currentUserInfo
}) => {
  const coffeeProps = {
    coffee: coffee,
    processes: processes,
    origins: origins,
    roastLevels: roastLevels,
    fetchUsersCoffeeData: fetchUsersCoffeeData
  };
  // console.log(currentUserInfo);
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger className="dialog-trigger">Edit</RadixDialog.Trigger>
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
          {formKey === 1 ? (
            <EditCoffeeForm {...coffeeProps} />
          ) : (
            <AccountDetailsForm currentUserInfo={currentUserInfo} />
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
