import React from 'react';
import SectionTitle from "@/components/Common/SectionTitle";

const Tentang = () => {
  return (
    <section className="relative z-10 py-8 md:py-12 lg:py-16 min-h-screen">
      <SectionTitle
        title="Tentang AGV"
        paragraph="Inovasi Digital di Gedung Digital Center"
        center
        mb="20px"
        mt="50px"
      />

      <div className="flex flex-col md:flex-row justify-around items-start">
        
        <div className="bg-white rounded-lg shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark p-6 m-4 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Website Gedung Digital Center</h2>
          <p>Gedung Digital Center adalah portal interaktif berbasis teknologi yang dirancang untuk memudahkan pengguna dalam menjelajahi fasilitas gedung universitas. Website ini menghadirkan pengalaman inovatif melalui:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Pencarian Ruangan menggunakan teknologi pengenalan suara.</li>
            <li>Navigasi Denah Gedung yang mudah dipahami.</li>
            <li>Umpan Balik Digital melalui integrasi dengan Google Form untuk meningkatkan layanan.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark p-6 m-4 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Automated Guided Vehicle (AGV)</h2>
          <p>Robot AGV adalah bagian dari transformasi digital Gedung Digital Center. Robot ini dirancang untuk memberikan pengalaman modern kepada pengguna gedung melalui:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Interaksi Suara, memahami dan menjawab pertanyaan secara langsung.</li>
            <li>Navigasi Otomatis, membantu pengguna menuju ruangan tujuan.</li>
            <li>Layar Interaktif, menampilkan informasi real-time tentang denah gedung dan layanan lainnya.</li>
          </ul>
        </div>

      </div>

      <div className="text-center mt-8">
        <a href="/cari-ruangan" 
          className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80">
          Mulai Mencari Ruangan
        </a>
      </div>
      


      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* Elemen SVG Kiri */}
        <span className="absolute left-0 top-0 opacity-30">
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="150" r="150" fill="url(#gradient1)" />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A6CF7" />
                <stop offset="100%" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>

        {/* Elemen SVG Kanan */}
        <span className="absolute right-0 top-0 opacity-20">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="400" height="400" fill="url(#gradient2)" />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A6CF7" />
                <stop offset="100%" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>

        {/* Elemen Lingkaran Tambahan */}
        <span className="absolute bottom-0 left-0 opacity-10">
          <svg
            width="500"
            height="500"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="250" cy="250" r="200" fill="url(#gradient3)" />
            <defs>
              <linearGradient id="gradient3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4A6CF7" />
                <stop offset="100%" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </section>

    
  );
};

export default Tentang;