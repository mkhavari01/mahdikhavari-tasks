import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { TemperatureUnit } from 'src/types/type';

interface UnitState {
  unit: TemperatureUnit;
}

const initialState: UnitState = {
  unit: TemperatureUnit.Celsius,
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit =
        state.unit === TemperatureUnit.Celsius
          ? TemperatureUnit.Fahrenheit
          : TemperatureUnit.Celsius;
    },
    setUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.unit = action.payload;
    },
  },
});

export const { toggleUnit, setUnit } = unitSlice.actions;
export default unitSlice.reducer;
