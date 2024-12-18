/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React from 'react';

import { useUserLocation } from 'src/hooks/use-location';

import { Forecast } from 'src/components/weather/forecast';
import { ToggleBtn } from 'src/components/weather/toggle-btn';
import { CurrentWeather } from 'src/components/weather/current-weather';

const WeatherApp: React.FC = () => {
  const { location, locationError, locationLoading } = useUserLocation();

  if (locationLoading) {
    return <h1 className="pt-4 text-center font-medium text-1xl">Getting your location ....</h1>;
  }

  if (locationError) {
    return <h1 className="pt-4 text-center font-medium text-1xl text-red-600">{locationError}</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 md:p-6 p-3">
      <header className="flex justify-between items-center flex-col md:flex-row">
        <h1 className="text-2xl font-bold text-center text-blue-500">Weather Forecast</h1>
      </header>

      <main>
        <section className="bg-white md:p-6 p-3 rounded-lg shadow-md my-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-x-2">
              <h2 className="text-xl font-semibold">Current Weather</h2>
            </div>
            <ToggleBtn />
          </div>

          <div className="flex items-center mt-4">
            <CurrentWeather location={location} />
          </div>
        </section>

        <Forecast location={location} />
      </main>
    </div>
  );
};

export default WeatherApp;
