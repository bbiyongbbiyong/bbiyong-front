import { configureStore, createSlice } from '@reduxjs/toolkit';

let clickCity = createSlice({
    name: 'clickCity',
    initialState: {id: null, clickCityName: ""},
    reducers: {
        changeClickCity(state, action) {
            state.id = action.payload[0];
            state.clickCityName = action.payload[1];
        }
    }
})

export let { changeClickCity } = clickCity.actions;

export default configureStore({
    reducer: {
        clickCity: clickCity.reducer,
    }
})