import { createSlice } from '@reduxjs/toolkit';

const cityInitialState = { index: null, cityName_KOR: '서울', cityName_ENG: 'seoul', cityID: 1 };

const clickCity = createSlice({
  name: 'clickCity',
  initialState: cityInitialState,
  reducers: {
    changeClickCity(state, action) {
      state.index = action.payload[0];
      state.cityName_KOR = action.payload[1];
      state.cityName_ENG = action.payload[2];
      state.cityID = action.payload[3];
    },
    clearCity: () => cityInitialState,
  },
});

export const { changeClickCity } = clickCity.actions;
export const citySliceReducer = clickCity.reducer;
