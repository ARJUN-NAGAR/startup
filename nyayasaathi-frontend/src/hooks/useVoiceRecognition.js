import { useState, useEffect, useRef } from 'react';

// This gets the browser's specific SpeechRecognition object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const useVoiceRecognition = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState('');
    const recognitionRef = useRef(null);

    // Check if the browser supports the Web Speech API
    const hasRecognitionSupport = !!SpeechRecognition;

    useEffect(() => {
        if (!hasRecognitionSupport) {
            setError('Your browser does not support voice recognition.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false; // Stop listening after a pause
        recognition.interimResults = false; // We only want the final result
        recognition.lang = 'en-US'; // Can be changed to 'hi-IN' for Hindi

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            setIsListening(false); // Stop listening after getting a result
        };

        recognition.onerror = (event) => {
            setError(`Voice recognition error: ${event.error}`);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [hasRecognitionSupport]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setText('');
            setError('');
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            setIsListening(false);
            recognitionRef.current.stop();
        }
    };

    return {
        text,
        isListening,
        error,
        startListening,
        stopListening,
        hasRecognitionSupport,
    };
};

export default useVoiceRecognition;