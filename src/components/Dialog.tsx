import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import EditCoffeeForm from './forms/EditCoffeeForm';
import { UsersCoffee } from '../types/types';

interface DialogProps {
  coffee: UsersCoffee;
}

const Dialog: React.FC<DialogProps> = ({ coffee }) => {
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
          <EditCoffeeForm coffee={coffee} />
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
