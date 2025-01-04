'use client'

import React, { useState, useEffect } from 'react';

interface VoiceRecognitionProps {
  onResult: (text: string) => void;
  isListening: boolean;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onResult, isListening }) => {
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
  }, [isListening, onResult]);  

  return null;
};

export default VoiceRecognition;