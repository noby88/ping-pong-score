import { useEffect, useState } from 'react';

const useListen = (listenList: string[]) => {
  const [controls, setControls] = useState({
    start: () => console.log('Not initiated'),
    stop: () => console.log('Not initiated'),
  });
  const [hearing, setHearing] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (hearing) {
      setHearing(undefined);
    }
  }, [hearing]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyWindow: any = window;
    const SpeechRecognition = anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition;
    const SpeechGrammarList = anyWindow.SpeechGrammarList || anyWindow.webkitSpeechGrammarList;

    const grammar = `#JSGF V1.0; grammar players; public <players> = ${listenList.join(' | ')};`;

    if (SpeechRecognition && SpeechGrammarList) {
      const recognition = new SpeechRecognition();
      const speechRecognitionList = new SpeechGrammarList();

      speechRecognitionList.addFromString(grammar, 1);

      recognition.grammars = speechRecognitionList;
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript as string;
        console.log(`Confidence for "${transcript}": ${event.results[0][0].confidence}`);
        setHearing(transcript.toLowerCase());
      };
      recognition.onend = () => {
        recognition.start();
      };

      setControls(recognition);

      return () => {
        recognition.stop();
      };
    } else {
      alert("Can't use voice recognition...");
    }
  }, [listenList]);

  return [controls, hearing] as const;
};

export default useListen;
