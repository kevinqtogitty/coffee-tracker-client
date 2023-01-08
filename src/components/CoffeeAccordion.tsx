import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { UsersCoffee } from '../types/types';
import Dialog from './Dialog';

interface CoffeeAccordionProps {
  usersCoffees: UsersCoffee[];
}
const CoffeeAccordion: React.FC<CoffeeAccordionProps> = ({ usersCoffees }) => {
  //   console.log(usersCoffees);
  return (
    <section className="home-section">
      <Accordion.Root
        className="home-accordion-root"
        type="single"
        defaultValue="0"
        collapsible
      >
        {usersCoffees.map((coffee, i) => (
          <Accordion.Item
            key={i}
            className="home-accordion-item"
            value={`${i}`}
          >
            <Accordion.Trigger className="home-accordion-trigger">
              {coffee.name}
            </Accordion.Trigger>
            <Accordion.Content className="home-accordion-content">
              <div className="home-accordion-content-container">
                <div className="home-accordion-content-left">
                  <p className="home-accordion-p">Roaster: {coffee.roaster}</p>
                  <p className="home-accordion-p">Price: $ {coffee.price}</p>
                  <p className="home-accordion-p">
                    Single origin: {`${coffee.singleOrigin}`}
                  </p>
                  <p className="home-accordion-p">Country: {coffee.country}</p>
                  <p className="home-accordion-p"> Process: {coffee.process}</p>
                  <p className="home-accordion-p">
                    Roast Level: {coffee.roastLevel}
                  </p>
                </div>
                <div className="home-accordion-content-right">
                  <p className="home-accordion-p notes">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Provident velit, accusantium quae sunt amet neque ad facilis
                    nisi voluptate. Corrupti aspernatur voluptates consectetur
                    rem dicta. Nam pariatur fugiat et voluptatibus.
                  </p>
                  <Dialog coffee={coffee} />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
};

export default CoffeeAccordion;
