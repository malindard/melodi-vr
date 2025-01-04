import React, { createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';

interface SpeechContextType {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  setOnResult: Dispatch<SetStateAction<(text: string) => void>>;
}

const SpeechContext = createContext<SpeechContextType>({
  isListening: false,
  startListening: () => { },
  stopListening: () => { },
  setOnResult: () => { }
});

const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [onResult, setOnResult] = useState<(text: string) => void>(() => { })

  useEffect(() => {
    let recognition: any;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
        onResult(text);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <SpeechContext.Provider
      value={{ isListening, startListening, stopListening, setOnResult }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export { SpeechContext, SpeechProvider };