import { Label } from '@radix-ui/react-label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UsersCoffee } from '../../types/types';
import * as Select from '@radix-ui/react-select';

interface EditCoffeeFormProps {
  coffee: UsersCoffee;
}

const EditCoffeeForm: React.FC<EditCoffeeFormProps> = ({ coffee }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: coffee.name,
      price: coffee.price,
      roastLevel: coffee.roastLevel,
      process: coffee.process,
      roaster: coffee.roaster,
      singleOrigin: coffee.singleOrigin,
      country: coffee.country,
      notes: coffee.notes,
      purchaseDate: coffee.purchaseDate
    }
  });

  const logData = (data: UsersCoffee) => {
    const updatedCoffee = {
      name: coffee.name === data.name ? coffee.name : data.name,
      price: coffee.price === data.price ? coffee.price : data.price,
      roastLevel:
        coffee.roastLevel === data.roastLevel
          ? coffee.roastLevel
          : data.roastLevel,
      process: coffee.process === data.process ? coffee.process : data.process,
      roaster: coffee.roaster === data.roaster ? coffee.roaster : data.roaster,
      singleOrigin:
        coffee.singleOrigin === data.singleOrigin
          ? coffee.singleOrigin
          : data.singleOrigin,
      country: coffee.country === data.country ? coffee.country : data.country,
      notes: coffee.notes === data.notes ? coffee.notes : data.notes,
      purchaseDate:
        coffee.purchaseDate === data.purchaseDate ? coffee.notes : data.notes
    };
  };

  return (
    <form
      className="edit-coffee-form"
      onSubmit={handleSubmit((data) => logData(data))}
    >
      <div className="form-input-label-container">
        <Label className="edit-coffee-label" htmlFor="coffeeName">
          Name
        </Label>
        <input
          className="edit-coffee-input"
          type="text"
          {...register('name', {
            required: 'This is required',
            maxLength: {
              value: 50,
              message: 'Max length is 50 chars'
            }
          })}
          defaultValue={coffee.name}
        />
      </div>
      <div className="form-input-label-container">
        <Label className="edit-coffee-label" htmlFor="roaster">
          Roaster
        </Label>
        <input
          className="edit-coffee-input"
          type="text"
          {...register('roaster', {
            required: 'This is required',
            maxLength: {
              value: 50,
              message: 'Max length is 50 chars'
            }
          })}
          defaultValue={coffee.roaster}
        />
      </div>
      <div className="form-input-label-container">
        <Label className="edit-coffee-label" htmlFor="price">
          Price
        </Label>
        <input
          className="edit-coffee-input"
          type="text"
          {...register('price', {
            required: 'This is required'
          })}
          defaultValue={coffee.price}
        />
      </div>
      <div className="form-input-label-container">
        <fieldset className="edit-coffee-fieldset">
          <legend className="edit-coffee-legend">Single Origin</legend>
          <div className="edit-coffee-radio-wrapper">
            <input
              {...register('singleOrigin')}
              type="radio"
              value="true"
              id="true"
            />
            <Label className="edit-coffee-label" htmlFor="true">
              True
            </Label>
          </div>
          <div className="edit-coffee-radio-wrapper">
            <input
              {...register('singleOrigin')}
              type="radio"
              value=" false"
              id="false"
            />
            <Label className="edit-coffee-label" htmlFor="false">
              False
            </Label>
          </div>
        </fieldset>
      </div>
      <div className="form-input-label-container">
        <Label className="edit-coffee-label" htmlFor="roastLevel">
          Roast Level
        </Label>
        <input
          className="edit-coffee-input"
          type="text"
          {...register('roastLevel', {
            required: 'This is required'
          })}
        />
      </div>
      <div className="form-input-label-container">
        <Label className="edit-coffee-label" htmlFor="notes">
          Notes
        </Label>
        <textarea
          className="edit-coffee-input"
          contentEditable
          {...register('notes')}
          defaultValue={coffee.notes}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditCoffeeForm;
