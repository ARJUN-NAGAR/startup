import React, { useState, useRef } from "react";
import { Mic } from "lucide-react";

const VoiceQuery = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("hi-IN");

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const userVoice = event.results[0][0].transcript;
      setTranscript(userVoice);

      // Simulate AI Response
      /*setTimeout(() => {
        if (userVoice.includes("आधार") || userVoice.includes("aadhaar")) {
          setResponse("✅ आधार कार्ड से संबंधित सेवाएं यहां शुरू की जा रही हैं।");
        } else {
          setResponse("🤖 आपका अनुरोध प्रोसेस किया जा रहा है...");
        }
      }, 1000);*/
      fetch('/api/voice/interpret', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'), // Adjust if needed
  },
  body: JSON.stringify({ query: userVoice }),
})
  .then(res => res.json())
  .then(data => {
    setResponse(data.message);
    const synth = window.speechSynthesis;
    synth.speak(new SpeechSynthesisUtterance(data.message));
  })
  .catch(err => {
    setResponse('❌ Server error while processing voice query.');
  });

    };

    recognition.onerror = (event) => {
      setTranscript("❌ Error: " + event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="mt-6 p-4 rounded-xl shadow-md border bg-white/90 backdrop-blur">
      {/* Language Selector */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">🌐 Select Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="hi-IN">Hindi (hi-IN)</option>
          <option value="en-IN">English (en-IN)</option>
        </select>
      </div>

      {/* Mic Button */}
      <button
        onClick={startListening}
        className={`flex items-center gap-2 px-4 py-2 rounded font-semibold text-white ${
          isListening ? "bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <Mic className="w-5 h-5" />
        {isListening ? "Listening..." : "Speak Now"}
      </button>

      {/* Chatbot-style Bubbles */}
      <div className="mt-4 space-y-3">
        {transcript && (
          <div className="max-w-md bg-gray-200 text-gray-900 p-3 rounded-xl rounded-bl-none self-end">
            🧑‍💬 <strong>You:</strong> {transcript}
          </div>
        )}
        {response && (
          <div className="max-w-md bg-blue-100 text-blue-900 p-3 rounded-xl rounded-br-none self-start">
            🤖 <strong>NyayaSaathi:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceQuery;
