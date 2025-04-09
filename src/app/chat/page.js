"use client";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

export default function ChatAndGetStory() {
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const audioContextRef = useRef(null);
  const mediaStreamSourceRef = useRef(null);

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedTheme = theme.trim();
    if (!trimmedTheme) {
      setError("Theme cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ theme: trimmedTheme }),
      });

      const data = await response.json();
      if (data.success) {
        setStory(data.story);
        setSelectedVoice(null);
      } else {
        setError("Failed to create story");
      }
    } catch {
      setError("An error occurred while creating the story");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (!story || !selectedVoice) {
      console.error("Please select a voice and ensure the story is available.");
      setError("Please select a voice and ensure the story is available.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `${story.title}. ${story.description}. ${story.content}`
    );
    utterance.voice = selectedVoice;

    // Request access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create a MediaStreamDestination
    const destination = audioContext.createMediaStreamDestination();

    // Create a MediaRecorder instance with the mixed audio stream
    const recorder = new MediaRecorder(destination.stream);
    setMediaRecorder(recorder); // Store the recorder reference

    // To handle the recorded audio data
    recorder.ondataavailable = (event) => {
      setAudioChunks((prev) => [...prev, event.data]);
    };

    // Start recording
    recorder.start();

    // Connect the audio context to the destination
    const microphoneSource = audioContext.createMediaStreamSource(stream);
    microphoneSource.connect(destination);

    // Create an audio buffer for the utterance
    const utteranceAudio = new Audio();
    utteranceAudio.srcObject = destination.stream; // This needs to be supported in your environment

    // Speak the utterance
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      // Stop recording when speech ends
      recorder.stop();

      // Combine audio chunks into a single Blob
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);

      // Create a download link
      const a = document.createElement("a");
      a.href = url;
      a.download = "story.wav"; // Save as a .wav file
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Free memory

      // Clear chunks for next recording
      setAudioChunks([]);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event);
      setError("An error occurred during speech synthesis.");
    };
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create a Short Story
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Enter a theme:</span>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          {loading ? "Creating..." : "Create Story"}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}{" "}
      {/* Display error message */}
      {story && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold">{story.title}</h2>
          <p className="text-gray-700">{story.description}</p>
          <p className="mt-2">{story.content}</p>

          {voices.length > 0 && (
            <label className="block mt-4">
              <span className="text-gray-700">Select a voice:</span>
              <select
                onChange={(e) =>
                  setSelectedVoice(
                    voices.find((voice) => voice.name === e.target.value)
                  )
                }
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">-- Select a Voice --</option>
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-md ${
                !story || !selectedVoice ? "bg-gray-500" : "bg-green-500"
              } text-white hover:bg-green-600 transition duration-200`}
              disabled={!story || !selectedVoice} // Disable if no story or voice selected
            >
              Read Aloud
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
