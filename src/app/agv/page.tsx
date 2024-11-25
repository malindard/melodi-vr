'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface RoomInfo {
  name: string;
  floorName: string;
  description: string;
}

const AnimasiPengantaran = () => {
  const [targetRoom, setTargetRoom] = useState<RoomInfo | null>(null);

  useEffect(() => {
    // Ambil informasi ruangan dari local storage
    const storedRoom = localStorage.getItem('targetRoom');
    if (storedRoom) {
      setTargetRoom(JSON.parse(storedRoom));
    }

    // Simulasi waktu pengantaran
    const timer = setTimeout(() => {
      localStorage.removeItem('targetRoom'); // Bersihkan local storage
      window.location.href = '/'; // Kembali ke halaman utama setelah 5 detik
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="dark:bg-bg-color-dark bg-gray-50 relative min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-white-800">
        AGV sedang mengantarkan Anda...
      </h2>
      
      {targetRoom && (
        <div className="text-center mb-4">
          <p className="text-xl font-medium">Menuju: {targetRoom.name}</p>
          <p className="text-lg">Lantai: {targetRoom.floorName}</p>
          <p className="text-md text-gray-600">{targetRoom.description}</p>
        </div>
      )}

      <Image 
        src="/images/animation/agv.gif"
        alt="AGV Animation" 
        width={300}
        height={300}
        className="rounded-lg shadow-lg"
      />
      
      <p className="mt-4 text-white-600">Mohon tunggu sebentar...</p>

      {/* SVG dekoratif tetap sama */}
    </section>
  );
};

export default AnimasiPengantaran;