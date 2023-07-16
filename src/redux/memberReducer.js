import { createSlice } from '@reduxjs/toolkit';

const memberInitialState = {
  id: 0,
  signed: false,
};

const memberSlice = createSlice({
  name: 'member',
  initialState: memberInitialState,
  reducers: {
    setMember(state, action) {
      state.id = action.payload.id;
      state.signed = true;
    },
    clearMember: () => memberInitialState,
  },
});

export const { setMember, clearMember } = memberSlice.actions;
export const memberReducer = memberSlice.reducer;
