'use client';

import React, { useState } from 'react';
import SectionTitle from "@/components/Common/SectionTitle";
import Link from 'next/link';
import roomData from '@/data/ruang.json'; // Pastikan path-nya benar

export default function DaftarRuang() {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);

  // Ambil rooms dari floor yang dipilih
  const currentFloorRooms = roomData.floors.find(floor => floor.floorNumber === selectedFloor)?.rooms || [];

  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28 min-h-screen">
      <div className="container">
        <SectionTitle
          title="Daftar Ruangan"
          paragraph="Pilih lantai untuk melihat daftar ruangan yang tersedia."
          center
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

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFloorRooms.map((room) => (
              <div
                key={room.id}
                className="rounded-sm bg-white p-6 shadow-two dark:bg-dark hover:shadow-one"
              >
                <h3 className="text-lg font-semibold text-dark dark:text-white">
                  {room.name}
                </h3>
                <p className="text-sm text-body-color">
                  <strong>Tipe:</strong> {room.type} <br />
                  <strong>Deskripsi:</strong> {room.description}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="rounded-sm bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
                    onClick={() => {
                      alert(`Navigasi menuju ${room.name} di Lantai ${selectedFloor}`);
                    }}
                  >
                    Antar ke Ruangan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}