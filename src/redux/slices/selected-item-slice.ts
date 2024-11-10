import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface SelectedItemState {
  selectedItemName: string | null;
}

const initialState: SelectedItemState = {
  selectedItemName: null,
};

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      state.selectedItemName = action.payload;
    },
    clearSelection: (state) => {
      state.selectedItemName = null;
    },
  },
});

export const { selectItem, clearSelection } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
