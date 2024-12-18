export type Node = {
  name: string;
  nodes?: Node[];
};

export enum TemperatureUnit {
  Celsius = 'C',
  Fahrenheit = 'F',
}

export interface WeatherData {
  data: {
    temp: number;
    weather: {
      description: string;
      icon: string;
    };
    ts: number;
  }[];
}

export interface ForecastData {
  data: {
    datetime: string;
    temp: number;
    weather: {
      description: string;
      icon: string;
    };
  }[];
}
