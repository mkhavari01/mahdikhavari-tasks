'use client';

import Link from 'next/link';
import Lottie from 'lottie-react';

import folderAnimation from 'src/utils/folder.json';
import weatherAnimation from 'src/utils/weather.json';

export default function Page() {
  return (
    <section className="px-3 flex items-center flex-col gap-y-5 h-full">
      <div className="flex-1 flex items-center justify-center">
        <Link href="/weather" className="flex items-center justify-center md:flex-row flex-col">
          <Lottie
            animationData={weatherAnimation}
            loop
            style={{ width: '200px', height: '200px' }}
          />
          <h1 className="md:text-5xl text-center font-semibold text-gray-600 text-2xl hover:underline">
            Weather task
          </h1>
        </Link>
      </div>
      <div className="flex-1 flex items-start justify-start">
        <Link href="/folder" className="flex items-center justify-center md:flex-row flex-col">
          <Lottie
            animationData={folderAnimation}
            loop
            style={{ width: '200px', height: '200px' }}
          />
          <h1 className="md:text-5xl font-semibold text-gray-600 text-2xl hover:underline">
            vs code folder task
          </h1>
        </Link>
      </div>
    </section>
  );
}
