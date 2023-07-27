import { MIDDLE_CATEGORY, SUB_OPTIONS } from '../data/categoryType';

export const getMiddlecategoryName = (engName) => {
  return MIDDLE_CATEGORY[engName];
};

export const getSubOptionName = (engName) => {
  return SUB_OPTIONS[engName];
};
