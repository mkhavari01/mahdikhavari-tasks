import type { ForecastData } from 'src/types/type';

import useFetch from 'src/hooks/use-fetch';

import { Temprature } from './temprature';

const Forecast = ({ location }: { location: GeolocationPosition | null }) => {
  const {
    data: forecastData,
    isLoading,
    hasError,
  } = useFetch<ForecastData>(
    location?.coords.latitude
      ? `/forecast/daily?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&days=7`
      : ''
  );

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (hasError) {
    return <h1>an error occured</h1>;
  }

  return (
    <section className="bg-white md:p-6 p-3 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">7-Day Forecast</h2>
      {forecastData?.data.length === 0 && <p className="text-center">No data available</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {forecastData?.data.map((day, index) => (
          <div className="text-center bg-gray-50 p-4 rounded-lg shadow-md" key={index}>
            <p className="font-medium">
              {new Date(day.datetime).toLocaleDateString(undefined, { weekday: 'short' })}
            </p>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
              alt={day.weather.description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-lg font-semibold mt-2">
              <Temprature number={day.temp} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Forecast };
