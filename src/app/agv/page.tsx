'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

const AnimasiPengantaran = () => {
  useEffect(() => {
    // Simulasi waktu pengantaran
    const timer = setTimeout(() => {
      window.location.href = '/'; // Kembali ke halaman utama setelah 5 detik
    }, 5000); // Ganti 5000 dengan durasi animasi Anda

    return () => clearTimeout(timer); // Membersihkan timer saat komponen unmount
  }, []);

  return (
    <section className="dark:bg-bg-color-dark bg-gray-50 relative min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-white-800">AGV sedang mengantarkan Anda...</h2>
      {/* Menggunakan komponen Image dari Next.js */}
      <Image 
        src="/images/animation/agv.gif" // Path ke GIF animasi AGV Anda
        alt="AGV Animation" 
        width={300} // Lebar yang lebih kecil
        height={300} // Tinggi yang lebih kecil
        className="rounded-lg shadow-lg" // Menambahkan efek rounded dan shadow
      />
      <p className="mt-4 text-white-600">Mohon tunggu sebentar...</p>

      {/* Tambahkan elemen dekoratif atau informasi tambahan di bawah */}
      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default AnimasiPengantaran;