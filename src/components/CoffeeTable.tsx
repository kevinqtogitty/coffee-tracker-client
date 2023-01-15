import React, { useState } from 'react';
import { UsersCoffee } from '../types/types';
import { UsersCoffeeDisplayedProps } from './UsersCoffeeDisplayed';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';

const CoffeeTable: React.FC<UsersCoffeeDisplayedProps> = ({
  usersCoffees,
  processes,
  origins,
  roastLevels,
  fetchUsersCoffeeData,
  setUsersCoffees
}) => {
  const [sortedCoffees, setSortedCoffees] = useState(usersCoffees);
  const [dateAsc, setDateAsc] = useState(false);
  const [priceAsc, setPriceAsc] = useState(false);
  const [nameAsc, setNameAsc] = useState(false);
  const [countryAsc, setCountryAsc] = useState(false);
  const [roastAsc, setRoastAsc] = useState(false);
  const [processAsc, setProcessAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const headerCells = [
    'Name',
    'Price',
    'Date-added',
    'Single-origin',
    'Country',
    'Roast',
    'Process'
  ];

  const handleSorting = (sortKey: string) => {
    let sorted: UsersCoffee[] = [...usersCoffees];
    if (sortKey === 'Date-added') {
      dateAsc
        ? sorted.sort((a, b) => Number(a.id) - Number(b.id))
        : sorted.sort((a, b) => Number(b.id) - Number(a.id));
      setDateAsc((state) => !state);
    } else if (sortKey === 'Price') {
      priceAsc
        ? sorted.sort((a, b) => Number(a.price) - Number(b.price))
        : sorted.sort((a, b) => Number(b.price) - Number(a.price));
      setPriceAsc((state) => !state);
    } else if (sortKey === 'Name') {
      nameAsc
        ? sorted.sort((a, b) => a.name.localeCompare(b.name))
        : sorted.sort((a, b) => b.name.localeCompare(a.name));
      setNameAsc((state) => !state);
    } else if (sortKey === 'Country') {
      countryAsc
        ? sorted.sort((a, b) => a.country.localeCompare(b.country))
        : sorted.sort((a, b) => b.country.localeCompare(a.country));
      setCountryAsc((state) => !state);
    } else if (sortKey === 'Roast') {
      roastAsc
        ? sorted.sort((a, b) => a.roastLevel.localeCompare(b.roastLevel))
        : sorted.sort((a, b) => b.roastLevel.localeCompare(a.roastLevel));
      setRoastAsc((state) => !state);
    } else if (sortKey === 'Process') {
      processAsc
        ? sorted.sort((a, b) => a.process.localeCompare(b.process))
        : sorted.sort((a, b) => b.process.localeCompare(a.process));
      setProcessAsc((state) => !state);
    }
    setSortedCoffees(sorted);
  };

  return (
    <>
      <div className="form-input-label-container filter">
        <Label htmlFor="filter">Filter:</Label>
        <input
          type="text"
          name="filter"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table-root">
        <thead className="table-head">
          <tr className="table-row head">
            {headerCells.map((item) => (
              <td className="table-cell head">
                <button
                  className="table-head-button"
                  onClick={() => handleSorting(item)}
                >
                  {item}
                </button>
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {searchQuery === ''
            ? sortedCoffees.map((coffee, i) => (
                <tr key={i} className="table-row">
                  <td className="table-cell">{coffee.name}</td>
                  <span className="table-seperator" />
                  <td className="table-cell">${coffee.price}</td>
                  <span className="table-seperator" />
                  <td className="table-cell">
                    {coffee.timestamp
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}
                  </td>
                  <span className="table-seperator" />
                  <td className="table-cell">{String(coffee.singleOrigin)}</td>
                  <span className="table-seperator" />
                  <td className="table-cell">{coffee.country}</td>
                  <span className="table-seperator" />
                  <td className="table-cell">{coffee.roastLevel}</td>
                  <span className="table-seperator" />
                  <td className="table-cell">{coffee.process}</td>
                </tr>
              ))
            : sortedCoffees.map((coffee, i) =>
                coffee.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ? (
                  <tr key={i} className="table-row">
                    <td className="table-cell">{coffee.name}</td>
                    <span className="table-seperator" />
                    <td className="table-cell">${coffee.price}</td>
                    <span className="table-seperator" />
                    <td className="table-cell">
                      {coffee.timestamp
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-')}
                    </td>
                    <span className="table-seperator" />
                    <td className="table-cell">
                      {String(coffee.singleOrigin)}
                    </td>
                    <span className="table-seperator" />
                    <td className="table-cell">{coffee.country}</td>
                    <span className="table-seperator" />
                    <td className="table-cell">{coffee.roastLevel}</td>
                    <span className="table-seperator" />
                    <td className="table-cell">{coffee.process}</td>
                  </tr>
                ) : null
              )}
        </tbody>
      </table>
    </>
  );
};

export default CoffeeTable;
