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
      const roomInfo = JSON.parse(storedRoom);
      setTargetRoom(roomInfo);
    }

    // Simulasi waktu pengantaran
    const timer = setTimeout(() => {
      localStorage.removeItem('targetRoom'); // Bersihkan local storage
      window.location.href = '/'; // Kembali ke halaman utama setelah 10 detik
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Ucapkan hanya jika targetRoom sudah di-set
    if (targetRoom) {
      if (targetRoom.floorName === "Lantai 1") {
        speak(`Sedang mengantarkan Anda ke ${targetRoom.name}.`);
      } else {
        speak(`Sedang mengantarkan Anda ke lift untuk ke ${targetRoom.floorName}.`);
      }
    }
  }, [targetRoom]); // Hanya jalankan efek ini ketika targetRoom berubah
   // Hanya jalankan efek ini ketika targetRoom berubah

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Set bahasa ke Bahasa Indonesia
    utterance.rate = 1.2;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

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

      {targetRoom?.name ? (
        <Image
          src={`/images/ruangan/${targetRoom.name}.jpeg`}
          alt={`Gambar ruangan ${targetRoom.name}`}
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      ) : (
        <Image 
          src="/images/animation/44.gif"
          alt="AGV Animation" 
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
      )}
      
      <p className="mt-4 text-white-600">Mohon tunggu sebentar...</p>

      {/* SVG dekoratif tetap sama */}
    </section>
  );
};

export default AnimasiPengantaran;