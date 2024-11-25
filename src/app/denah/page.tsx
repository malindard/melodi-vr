"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "@/components/Common/SectionTitle";
import Link from "next/link";


const DenahLantai1 = () => {

  return (
    <section className="relative z-10 py-8 md:py-12 lg:py-16 min-h-screen">
      <div className="container">
        <SectionTitle
          title="Denah Lantai 1"
          paragraph=""
          center
          mb="20px"
          mt="20px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="mb-10 relative aspect-[77/40] items-center justify-center">
                <Image 
                  src="/images/denah/denah-lantai-1.jpeg" 
                  alt="denah lantai 1" 
                  fill 
                  style={{ objectFit: 'contain' }} // Mengatur gambar agar sesuai dengan kontainer
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/cari-ruangan"
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Cari Ruangan
                  </Link>
                  <Link
                    href="/"
                    className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Kembali
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default DenahLantai1;
