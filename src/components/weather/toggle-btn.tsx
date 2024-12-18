import { useDispatch } from 'react-redux';

import { useAppSelector } from 'src/redux/hooks';
import { setUnit } from 'src/redux/slices/unit-slice';

import { TemperatureUnit } from 'src/types/type';

import { Button } from '../button';

export const ToggleBtn = () => {
  const dispatch = useDispatch();
  const unit = useAppSelector((store) => store.unitSlice.unit);
  const toggleUnit = () => {
    dispatch(
      setUnit(
        unit === TemperatureUnit.Celsius ? TemperatureUnit.Fahrenheit : TemperatureUnit.Celsius
      )
    );
  };
  return (
    <Button onClick={toggleUnit} className=" text-white py-1 px-2 md:py-1 md:px-2">
      °C/°F
    </Button>
  );
};
