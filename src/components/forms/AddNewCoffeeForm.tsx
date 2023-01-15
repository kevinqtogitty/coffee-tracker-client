import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UsersCoffee } from '../../types/types';
import { AddNewCoffeePageProps } from '../../pages/AddNewCoffeePage';
import { Label } from '@radix-ui/react-label';
import { SelectField } from './EditCoffeeForm';
import { addCoffee, updateCoffee } from '../../requests/coffeeRequests';
import { auth } from '../../firebase/config';
import { convertToBoolean, findOptionId } from '../../helpers/helpers';

const AddNewCoffeeForm: React.FC<AddNewCoffeePageProps> = ({
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData
}) => {
  const resetValues = {
    name: '',
    price: 0,
    roastLevel: '',
    process: '',
    roaster: '',
    singleOrigin: false,
    country: '',
    notes: '',
    farmer: null
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
    const newCoffee: UsersCoffee = {
      name: data.name,
      price: data.price,
      roastLevel: findOptionId(
        data.roastLevel,
        'roast',
        roastLevels,
        processes,
        origins
      ),
      process: findOptionId(
        data.process,
        'process',
        roastLevels,
        processes,
        origins
      ),
      roaster: data.roaster,
      singleOrigin: convertToBoolean(data.singleOrigin),
      country: findOptionId(
        data.country,
        'origin',
        roastLevels,
        processes,
        origins
      ),
      notes: data.notes,
      farmer: null,
      timestamp: ''
    };

    addCoffee(auth.currentUser!.uid, newCoffee).then(() =>
      fetchUsersCoffeeData(auth.currentUser!.uid)
    );
  };

  return (
    <form
      className="edit-coffee-form add-coffee"
      onSubmit={handleSubmit((data) => logData(data))}
    >
      <div className="form-field-container add-coffee">
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
            options={roastLevels}
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
            options={processes}
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
            options={origins}
            register={register}
          />
        </div>
        <div className="form-input-label-container">
          <Label className="edit-coffee-label" htmlFor="notes">
            Notes
          </Label>
          <textarea
            className="edit-coffee-input text-area"
            contentEditable
            suppressContentEditableWarning
            {...register('notes', {
              maxLength: { value: 500, message: 'Maximum 500 chars' }
            })}
          />
          <span className="form-error-span">{errors.notes?.message}</span>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default AddNewCoffeeForm;
