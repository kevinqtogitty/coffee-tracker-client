import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { UsersCoffeeDisplayedProps } from './UsersCoffeeDisplayed';
import Dialog from './Dialog';
import EditCoffeeForm from './forms/EditCoffeeForm';

const CoffeeAccordion: React.FC<UsersCoffeeDisplayedProps> = ({
  usersCoffees,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData
}) => {
  return (
    <Accordion.Root
      className="accordion-root"
      type="single"
      defaultValue="0"
      collapsible
    >
      {usersCoffees.map((coffee, i) => (
        <Accordion.Item key={i} className="accordion-item" value={`${i}`}>
          <Accordion.Trigger className="accordion-trigger">
            {coffee.name}
          </Accordion.Trigger>
          <Accordion.Content className="accordion-content">
            <div className="accordion-content-container">
              <div className="accordion-content-left">
                <p className="accordion-p">
                  Date added:{' '}
                  {coffee.timestamp.slice(0, 10).split('-').reverse().join('-')}
                </p>
                <p className="accordion-p">Roaster: {coffee.roaster}</p>
                <p className="accordion-p">Price: $ {coffee.price}</p>
                <p className="accordion-p">
                  Single origin: {`${coffee.singleOrigin}`}
                </p>
                <p className="accordion-p">Country: {coffee.country}</p>
                <p className="accordion-p"> Process: {coffee.process}</p>
                <p className="accordion-p">Roast Level: {coffee.roastLevel}</p>
              </div>
              <div className="accordion-content-right">
                <p className="accordion-p notes">{coffee.notes}</p>
                <Dialog
                  coffee={coffee}
                  processes={processes}
                  origins={origins}
                  roastLevels={roastLevels}
                  fetchUsersCoffeeData={fetchUsersCoffeeData}
                  formKey={1}
                  EditCoffeeForm={EditCoffeeForm}
                />
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default CoffeeAccordion;
