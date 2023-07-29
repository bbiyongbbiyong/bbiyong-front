import { createSlice } from '@reduxjs/toolkit';

const memberInitialState = {
  accountId: '',
  signed: false,
};

const memberSlice = createSlice({
  name: 'member',
  initialState: memberInitialState,
  reducers: {
    setMember(state, action) {
      state.accountId = action.payload.accountId;
      state.signed = true;
    },
    clearMember: () => memberInitialState,
  },
});

export const { setMember, clearMember } = memberSlice.actions;
export const memberReducer = memberSlice.reducer;
