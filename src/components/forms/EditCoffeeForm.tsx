import { Label } from '@radix-ui/react-label';
import React, { useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { updateCoffee } from '../../requests/coffeeRequests';
import {
  Origins,
  Processes,
  RoastLevels,
  UsersCoffee
} from '../../types/types';

import { auth } from '../../firebase/config';
import { findOptionId, convertToBoolean } from '../../helpers/helpers';

export interface EditCoffeeFormProps {
  coffee?: UsersCoffee;
  processes?: Processes[];
  origins?: Origins[];
  roastLevels?: RoastLevels[];
  fetchUsersCoffeeData?: (userId: string) => Promise<void>;
}

const EditCoffeeForm: React.FC<EditCoffeeFormProps> = ({
  coffee,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData
}) => {
  const resetValues = {
    name: coffee!.name,
    price: coffee!.price,
    roastLevel: coffee!.roastLevel,
    process: coffee!.process,
    roaster: coffee!.roaster,
    singleOrigin: coffee!.singleOrigin,
    country: coffee!.country,
    notes: coffee!.notes,
    farmer: null,
    timestamp: ''
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      ...resetValues
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...resetValues });
    }
  }, [isSubmitSuccessful, reset]);

  const logData = (data: UsersCoffee) => {
    const updatedCoffee = {
      id: coffee!.id,
      name: coffee!.name === data.name ? coffee!.name : data.name,
      price: coffee!.price === data.price ? coffee!.price : data.price,
      roastLevel:
        coffee!.roastLevel === data.roastLevel
          ? findOptionId(
              coffee!.roastLevel,
              'roast',
              roastLevels!,
              processes!,
              origins!
            )
          : findOptionId(
              data.roastLevel,
              'roast',
              roastLevels!,
              processes!,
              origins!
            ),
      process:
        coffee!.process === data.process
          ? findOptionId(
              coffee!.process,
              'process',
              roastLevels!,
              processes!,
              origins!
            )
          : findOptionId(
              data.process,
              'process',
              roastLevels!,
              processes!,
              origins!
            ),
      roaster:
        coffee!.roaster === data.roaster ? coffee!.roaster : data.roaster,
      singleOrigin:
        coffee!.singleOrigin === convertToBoolean(data.singleOrigin)
          ? coffee!.singleOrigin
          : convertToBoolean(data.singleOrigin),
      country:
        coffee!.country === data.country
          ? findOptionId(
              coffee!.country,
              'origin',
              roastLevels!,
              processes!,
              origins!
            )
          : findOptionId(
              data.country,
              'origin',
              roastLevels!,
              processes!,
              origins!
            ),
      notes: coffee!.notes === data.notes ? coffee!.notes : data.notes,
      farmer: null
    };

    updateCoffee(coffee!.id!, updatedCoffee).then(() =>
      fetchUsersCoffeeData!(auth.currentUser!.uid)
    );
  };

  return (
    <form
      className="edit-coffee-form"
      onSubmit={handleSubmit((data) => logData(data))}
    >
      <div className="form-field-container">
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
            defaultValue={coffee!.name}
          />
          <span className="form-error-span">{errors.name?.message}</span>
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
            defaultValue={coffee!.roaster}
          />
          <span className="form-error-span">{errors.roaster?.message}</span>
        </div>
        <div className="form-input-label-container">
          <Label className="edit-coffee-label" htmlFor="price">
            Price
          </Label>
          <input
            className="edit-coffee-input"
            type="text"
            {...register('price', {
              required: 'This is required',
              maxLength: { value: 5, message: 'Maximum chars is 5' }
            })}
            defaultValue={coffee!.price}
          />
          <span className="form-error-span">{errors.price?.message}</span>
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
              <span className="form-error-span">
                {errors.singleOrigin?.message}
              </span>
            </div>
            <div className="edit-coffee-radio-wrapper">
              <input
                {...register('singleOrigin')}
                type="radio"
                value="false"
                id="false"
              />
              <Label className="edit-coffee-label" htmlFor="false">
                False
              </Label>
              <span className="form-error-span">
                {errors.singleOrigin?.message}
              </span>
            </div>
          </fieldset>
        </div>
        <div className="form-input-label-container">
          <Label className="edit-coffee-label" htmlFor="roastLevels">
            Roast level
          </Label>
          <SelectField
            option={'roastLevels'}
            options={roastLevels!}
            register={register}
          />
          <span className="form-error-span">{errors.roastLevel?.message}</span>
        </div>

        <div className="form-input-label-container">
          <Label className="edit-coffee-label" htmlFor="process">
            Process
          </Label>
          <SelectField
            option={'process'}
            options={processes!}
            register={register}
          />
          <span className="form-error-span">{errors.process?.message}</span>
        </div>

        <div className="form-input-label-container">
          <Label className="edit-coffee-label" htmlFor="country">
            Country
          </Label>
          <SelectField
            option={'country'}
            options={origins!}
            register={register}
          />
        </div>
        <div className="form-input-label-container">
          <Label className="edit-coffee-label" htmlFor="notes">
            Notes
          </Label>
          <textarea
            className="edit-coffee-input"
            contentEditable
            suppressContentEditableWarning
            {...register('notes', {
              maxLength: { value: 500, message: 'Maximum 500 chars' }
            })}
            defaultValue={coffee!.notes}
          />
          <span className="form-error-span">{errors.notes?.message}</span>
        </div>
      </div>

      <button type="submit" className="form-save-button">
        Save
      </button>
    </form>
  );
};

export default EditCoffeeForm;

interface SelectProps {
  options: Processes[] | Origins[] | RoastLevels[];
  option: string;
  register: UseFormRegister<{
    name: string;
    price: number;
    roastLevel: string;
    process: string;
    roaster: string;
    singleOrigin: string | boolean;
    country: string;
    notes: string;
    purchaseDate: string | undefined;
  }>;
}

export const SelectField: React.FC<SelectProps> = ({
  options,
  option,
  register
}) => {
  return (
    <select
      {...(option === 'process'
        ? { ...register('process', { required: 'This is required' }) }
        : option === 'country'
        ? { ...register('country', { required: 'This is required' }) }
        : option === 'roastLevels'
        ? { ...register('roastLevel', { required: 'This is required' }) }
        : null)}
      aria-label={option}
      className="select-dropdown"
    >
      {option === 'process'
        ? options.map((option) => (
            <option key={option.id} value={option.process_name}>
              {option.process_name}
            </option>
          ))
        : option === 'country'
        ? options.map((option) => (
            <option key={option.id} value={option.country}>
              {option.country}
            </option>
          ))
        : option === 'roastLevels'
        ? options.map((option) => (
            <option key={option.id} value={option.roast_level}>
              {option.roast_level}
            </option>
          ))
        : null}
    </select>
  );
};
