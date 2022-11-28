import { configureStore, createSlice } from '@reduxjs/toolkit';

let clickCity = createSlice({
	name: 'clickCity',
	initialState: {id: null, cityName_KOR: "서울", cityname_ENG: "seoul"},
	reducers: {
		changeClickCity(state, action) {
			state.id = action.payload[0];
			state.cityName_KOR = action.payload[1];
			state.cityname_ENG = action.payload[2];
		}
	}
})

export let { changeClickCity } = clickCity.actions;

export default configureStore({
	reducer: {
		clickCity: clickCity.reducer,
	}
})