import { useEffect, useState } from "react";

const useSound = (url, options) => {
  const [sound, setSound] = useState(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const audio = new Audio(url);
    audio.load();
    audio.volume = options.volume;
    setSound(audio);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [url, options.volume]);

  // Function to enable playback after user interaction
  const enablePlayback = () => {
    setCanPlay(true);
  };

  return [
    () => {
      if (sound && canPlay) {
        sound.play().catch((e) => console.error("Playback failed:", e));
        setTimeout(() => {
          sound.pause();
          sound.currentTime = 0;
        }, options.timeout);
      }
    },
    enablePlayback,
  ];
};

export default useSound;