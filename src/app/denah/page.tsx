'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionTitle from "@/components/Common/SectionTitle";
import roomData from '@/data/ruang.json';

export default function Denah() {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);

  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-18 lg:py-20 min-h-screen">
      <div className="container">
        <SectionTitle
          title="Denah Gedung Digital Center"
          paragraph=""
          center
          mb="30px"
          mt="30px"
        />
        
        {/* Selector Lantai */}
        <div className="flex justify-center space-x-4 mb-6">
          {roomData.floors.map(floor => (
            <button
              key={floor.floorNumber}
              onClick={() => setSelectedFloor(floor.floorNumber)}
              className={`px-4 py-2 rounded ${
                selectedFloor === floor.floorNumber 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Lantai {floor.floorNumber}
            </button>
          ))}
        </div>

        {/* Denah Lantai */}
        <div className="flex justify-center mb-6">
          <Image 
            src={`/images/denah/${selectedFloor}.png`} 
            alt="denah lantai 1" 
            width={800} 
            height={600} // Mengatur gambar agar sesuai dengan kontainer
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
}