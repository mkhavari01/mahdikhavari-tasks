/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { useBoolean } from './use-boolean';

export const useUserLocation = () => {
  const loading = useBoolean(true);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const getUserLocation = (): Promise<GeolocationPosition> =>
      new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error('Geolocation not supported by this browser.'));
        }
      });

    const fetchLocation = async () => {
      loading.onTrue();
      try {
        const position = await getUserLocation();
        setLocation(position);
        setLocationError(null);
      } catch (error) {
        setLocationError('Unable to retrieve user location.');
        console.error(error);
      } finally {
        loading.onFalse();
      }
    };

    fetchLocation();
  }, []);

  return { location, locationError, locationLoading: loading.value };
};
