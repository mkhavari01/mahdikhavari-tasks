import { formatTemperature } from 'src/utils/func';

import { useAppSelector } from 'src/redux/hooks';

export const Temprature = ({ number }: { number: number }) => {
  const unit = useAppSelector((store) => store.unitSlice.unit);

  return (
    <>
      {formatTemperature(number, unit)}&deg;{unit}
    </>
  );
};
