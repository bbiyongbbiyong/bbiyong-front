import { MIDDLE_CATEGORY, SUB_CATEGORY } from '../data/categoryType';

export const getMiddlecategoryName = (engName) => {
  return MIDDLE_CATEGORY[engName];
};

export const getSubcategoryName = (engName) => {
  return SUB_CATEGORY[engName];
};
