'use client';

import React, { useState, useEffect } from 'react';
import SectionTitle from "@/components/Common/SectionTitle";
import VoiceRecognition from '@/components/SpeechToText';
import { searchRoom } from '@/components/RoomSearch';


// Kumpulan variasi kalimat
const INTRO_MESSAGES = [
  "Selamat Datang. Ruangan apa yang Anda cari?",
  "Silakan sebutkan ruangan yang ingin Anda temukan",
  "Selamat Datang. Anda mencari ruangan apa hari ini?",
  "Informasi ruangan apa yang Anda butuhkan?",
];

const SEARCH_AGAIN_MESSAGES = [
  "Silakan sebutkan ruangan lain yang Anda cari",
  "Ada ruangan lain yang ingin Anda temukan?",
  "Ruangan apa lagi yang Anda butuhkan?",
];

// Fungsi untuk membuat speech synthesis dalam bahasa Indonesia
const SpeakInIndonesian = (text: string, rate: number = 1.2, onEnd?: () => void) => {
  if (typeof window !== 'undefined') {
    const speech = new SpeechSynthesisUtterance(text);

    // Cari voice bahasa Indonesia
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(
      voice => voice.lang.startsWith('id') || voice.lang === 'id-ID'
    );

    if (indonesianVoice) {
      speech.voice = indonesianVoice;
    } else {
      // Fallback ke voice default jika tidak ada voice Indonesia
      console.warn('Tidak ada voice bahasa Indonesia, menggunakan voice default');
    }

    // Atur kecepatan bicara (0.1 - 10, default 1)
    speech.rate = rate;

    // Atur volume (0 - 1)
    speech.volume = 1;

    // Tambahkan event listener untuk debug
    speech.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    if (onEnd) {
      speech.onend = () => {
        onEnd();
      }
    }

    // Mulai berbicara
    window.speechSynthesis.speak(speech);
  }
};

// Tambahan hook untuk memastikan voices sudah dimuat
function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    }

    // Beberapa browser membutuhkan event loadedmetadata
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Panggil sekali untuk browser yang tidak mendukung event
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return voices;
}

export default function CariRuangan() {
  // Hook untuk voices
  const voices = useVoices();

  const [stage, setStage] = useState<'listening' | 'result-room' | 'listening-confirmation' | 'result' | 'confirming'>('listening');
  const [searchResult, setSearchResult] = useState<{ name: string; floorName: string; description: string } | null>(null);
  const [spokenRoom, setSpokenRoom] = useState<string>('');

  // Efek untuk memulai voice recognition dan bertanya saat komponen dimuat
  useEffect(() => {
    // Pastikan voices sudah dimuat
    if (voices.length > 0) {
      // Pilih kalimat intro secara acak
      const randomIntro = INTRO_MESSAGES[Math.floor(Math.random() * INTRO_MESSAGES.length)];

      // Menggunakan fungsi custom untuk berbicara dalam bahasa Indonesia
      SpeakInIndonesian(randomIntro, 1.2, () => {
        setStage('listening'); // Pindah ke stage listening setelah berbicara selesai
      });
    }
  }, [voices]);

  const handleVoiceResult = (text: string) => {
    const lowerText = text.toLowerCase();
    const result = searchRoom(lowerText);

    setSpokenRoom(lowerText);
    setSearchResult(result); // result sekarang adalah objek atau null
    setStage('result');

    // Konfirmasi pencarian dengan bahasa Indonesia
    if (result) {
      SpeakInIndonesian(`Ruangan yang Anda cari: ${result.name} berada di ${result.floorName} dan ${result.description}. Apakah Anda ingin diantarkan ke ruangan tersebut?`, 1.2, () => {
        setStage('listening-confirmation');
      });
    } else {
      SpeakInIndonesian('Maaf, ruangan yang Anda cari tidak ditemukan', 1.2, () => {
        setStage('listening'); // Kembali ke stage listening setelah berbicara selesai
      });
    }
  };

  const handleConfirmationResponse = (response: string) => {
    const lowerResponse = response.toLowerCase();
    if (lowerResponse.includes("ya")) {
      SpeakInIndonesian("Baik, saya akan mengantarkan Anda ke ruangan tersebut.", 1.2, () => {
        handleNavigateToRoom();
      });
    } else if (lowerResponse.includes("tidak")) {
      SpeakInIndonesian("Baik, kembali ke halaman utama.", 1.2, () => {
        window.location.href = '/';
      });
    } else {
      SpeakInIndonesian("Maaf, saya tidak mengerti jawaban Anda. Silakan ulangi.", 1.2);
    }
  };

  const handleSearchAgain = () => {
    setStage('listening');
    setSearchResult(null);
    setSpokenRoom('');

    // Pilih kalimat mencari ulang secara acak
    const randomSearchAgain = SEARCH_AGAIN_MESSAGES[Math.floor(Math.random() * SEARCH_AGAIN_MESSAGES.length)];
    SpeakInIndonesian(randomSearchAgain, 1.2, () => {
      setStage('listening'); // Kembali ke stage listening setelah berbicara selesai
    });
  };

  const handleNavigateToRoom = () => {
    // Simpan informasi ruangan ke local storage
    if (searchResult) {
      localStorage.setItem('targetRoom', JSON.stringify(searchResult));
      // SpeakInIndonesian("Sedang mengarahkan ke ruangan");
      window.location.href = 'agv';
    }
  };

  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28 min-h-screen">
      <div className="container">
        <SectionTitle
          title="Pencarian Ruangan"
          paragraph="Temukan ruangan dengan mudah menggunakan suara"
          center
        />

        <div className="flex justify-center items-center mt-4">
          <div className="rounded-sm bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
            {/* Indikator status */}
            <div className="flex items-center justify-end">
              <div className={`w-4 h-4 rounded-full 
                ${stage === 'listening' ? 'bg-yellow-500' : 'bg-green-500'}`}
              >
              </div>
            </div>

            {/* Jawaban Hasil Pencarian */}
            <div className="flex items-center">
              <div className="w-full">
                {stage === 'listening' && (
                  <>
                    <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                      Ruangan apa yang Anda cari?
                    </h3>
                    <VoiceRecognition
                      onResult={handleVoiceResult}
                      isListening={true}
                    />
                  </>
                )}

                {(stage === 'result' || stage === 'listening-confirmation') && searchResult && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
                      Anda mencari: {spokenRoom}
                    </h3>
                    <p className="mb-4 text-body-color">
                      <strong>Nama Ruangan:</strong> {searchResult.name} <br />
                      <strong>Lantai:</strong> {searchResult.floorName} <br />
                      <strong>Letak:</strong> {searchResult.description}
                    </p>

                    {/* Menambahkan kalimat konfirmasi */}
                    <p className="mb-4 text-body-color">
                      Apakah Anda ingin diantarkan ke ruangan tersebut?
                    </p>
                    <div className="flex space-x-4 justify-center items-center">
                      {/* Tombol untuk "Ya" */}
                      <button
                        onClick={handleNavigateToRoom}
                        className="w-32 bg-black px-4 py-2 rounded-sm text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                      >
                        Ya
                      </button>
                      {/* Tombol untuk "Tidak" */}
                      <button
                        onClick={() => window.location.href = '/'} // Mengarahkan ke halaman utama
                        className="w-32 bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90"
                      >
                        Tidak
                      </button>
                      {stage === 'listening-confirmation' &&
                        <VoiceRecognition
                          onResult={handleConfirmationResponse}
                          isListening={true}
                        />}
                    </div>
                  </div>
                )}

                {stage === 'result' && !searchResult && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
                      Anda mencari: {spokenRoom}
                    </h3>
                    <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
                      Maaf, ruangan yang Anda cari tidak ditemukan.
                    </h3>
                    <p className="mb-4 text-body-color">
                      Silakan coba lagi dengan nama ruangan yang berbeda.
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={handleSearchAgain}
                        className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90"
                      >
                        Cari Ruangan Lagi
                      </button>
                    </div>
                  </div>
                )}

                {stage === 'confirming' && (
                  <div>
                    <VoiceRecognition
                      onResult={handleConfirmationResponse}
                      isListening={true}
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="absolute right-0 top-5 z-[-1]">
        {/* SVG kanan */}
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#paint1_linear_72:302)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#paint2_linear_72:302)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#paint3_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_72:302"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_72:302"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_72:302"
              x1="256.267"
              y1="64.6717"
              x2="-40.8688"
              y2="19.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_72:302"
              x1="256.267"
              y1="76.6717"
              x2="-40.8688"
              y2="31.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        {/* SVG kiri */}
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
}