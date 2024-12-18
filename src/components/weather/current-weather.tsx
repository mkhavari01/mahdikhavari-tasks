import type { WeatherData } from 'src/types/type';

import useFetch from 'src/hooks/use-fetch';

import { Temprature } from './temprature';
import { RefreshButton } from './refresh-button';

export const CurrentWeather = ({ location }: { location: GeolocationPosition | null }) => {
  const { data, isLoading, hasError, refetch } = useFetch<WeatherData>(
    location?.coords.latitude
      ? `/current?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}`
      : ''
  );

  if (hasError) {
    return <h1>an error occured</h1>;
  }

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (!data) {
    return <h1>no data available</h1>;
  }

  return (
    <>
      <div className="w-20 h-20">
        <img
          src={`https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`}
          alt={data.data[0].weather.description}
          className="w-full h-full"
        />
      </div>
      <div className="ml-4">
        <h3 className="text-4xl font-bold flex items-center justify-center gap-x-5">
          <Temprature number={data.data[0].temp} />{' '}
          <RefreshButton onClick={refetch} loading={isLoading} />
        </h3>
        <p className="text-lg capitalize">{data.data[0].weather.description}</p>
      </div>
    </>
  );
};
