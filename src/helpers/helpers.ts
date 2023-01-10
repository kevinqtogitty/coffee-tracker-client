import { Origins, Processes, RoastLevels } from '../types/types';

const convertToBoolean = (choice: string | boolean): boolean => {
  return choice === 'true' ? true : false;
};

const findOptionId = (
  option: string | number,
  caseId: string,
  roastLevels: RoastLevels[],
  processes: Processes[],
  origins: Origins[]
) => {
  let optionFound;
  switch (caseId) {
    case 'roast':
      optionFound = roastLevels.find((el) => el.roast_level === option);
      break;
    case 'process':
      optionFound = processes.find((el) => el.process_name === option);
      break;
    case 'origin':
      optionFound = origins.find((el) => el.country === option);
      break;
    default:
      break;
  }
  return optionFound.id;
};

export { convertToBoolean, findOptionId };
