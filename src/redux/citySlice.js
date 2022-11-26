import { configureStore, createSlice } from '@reduxjs/toolkit';

let clickCity = createSlice({
	name: 'clickCity',
	initialState: {id: null, cityName: "서울"},
	reducers: {
		changeClickCity(state, action) {
			state.id = action.payload[0];
			state.cityName = action.payload[1];
		}
	}
})

export let { changeClickCity } = clickCity.actions;

export default configureStore({
	reducer: {
		clickCity: clickCity.reducer,
	}
})