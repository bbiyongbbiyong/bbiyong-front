import { configureStore, createSlice } from '@reduxjs/toolkit';

let clickCity = createSlice({
	name: 'clickCity',
	initialState: {index: null, cityName_KOR: "서울", cityName_ENG: "seoul", cityID: 1},
	reducers: {
		changeClickCity(state, action) {
			state.index = action.payload[0];
			state.cityName_KOR = action.payload[1];
			state.cityName_ENG = action.payload[2];
			state.cityID = action.payload[3];
		}
	}
})

export let { changeClickCity } = clickCity.actions;

export default configureStore({
	reducer: {
		clickCity: clickCity.reducer,
	}
})