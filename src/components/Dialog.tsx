import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import EditCoffeeForm from './forms/EditCoffeeForm';
import { Origins, Processes, RoastLevels, UsersCoffee } from '../types/types';

interface DialogProps {
  coffee: UsersCoffee;
  origins: Origins[];
  processes: Processes[];
  roastLevels: RoastLevels[];
  fetchUsersCoffeeData: (userId: string) => Promise<void>;
}

const Dialog: React.FC<DialogProps> = ({
  coffee,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData
}) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger className="dialog-trigger">Edit</RadixDialog.Trigger>
      <RadixDialog.Portal className="dialog-portal">
        <RadixDialog.Overlay className="dialog-overlay" />
        <RadixDialog.Content className="dialog-content">
          <RadixDialog.Close className="dialog-close">X</RadixDialog.Close>
          <RadixDialog.Title className="dialog-title">
            Edit coffee
          </RadixDialog.Title>
          <RadixDialog.Description className="dialog-description">
            Make changes to your coffee here. Click save when you're done.
          </RadixDialog.Description>
          <EditCoffeeForm
            coffee={coffee}
            processes={processes}
            origins={origins}
            roastLevels={roastLevels}
            fetchUsersCoffeeData={fetchUsersCoffeeData}
          />
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
