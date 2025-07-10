import React, { useContext, useEffect, useRef, useState } from "react";
import { MusicPlayerWrapper } from "./MusicPlayer.styled";
import playList from "../../utils/MusicUtils/playlist";
import { randomizeIndex } from "../../utils/MusicUtils";
import { PlayIcon, PauseIcon, NextIcon } from "./MusicPlayer.styled";
import { SfxContext } from "../../contexts/SfxContext";
import { Text } from "../../styles/General.styled";

function MusicPlayer() {
  const { hoverSfx, clickSfx } = useContext(SfxContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(randomizeIndex(playList));
  const [playPromise, setPlayPromise] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const promise = playerRef.current?.play();
      setPlayPromise(promise);
      if (playerRef.current?.volume) playerRef.current.volume = 0.1;
    } else {
      if (playPromise) {
        playPromise.then(() => {
          playerRef.current?.pause();
        }).catch(() => {});
      } else {
        playerRef.current?.pause();
      }
    }
  }, [isPlaying, currentSong, playPromise]);

  const shuffleHandler = async () => {
    if (playPromise) {
      await playPromise.then(() => {
        playerRef.current?.pause();
        playerRef.current.currentTime = 0;
      }).catch(() => {});
    }
    setIsPlaying(false);
    setCurrentSong(randomizeIndex(playList));
    setIsPlaying(true);
  };

  const displaySong = playList[currentSong].split("/")[6] || playList[currentSong];
  return (
    <MusicPlayerWrapper>
      {isPlaying ? (
        <PauseIcon
          onClick={() => {
            clickSfx[0]();
            clickSfx[1]();
            setIsPlaying(false);
          }}
          onMouseEnter={() => { hoverSfx[0](); hoverSfx[1](); }}
        />
      ) : (
        <PlayIcon
          onClick={() => {
            clickSfx[0]();
            clickSfx[1]();
            setIsPlaying(true);
          }}
          onMouseEnter={() => { hoverSfx[0](); hoverSfx[1](); }}
        />
      )}

      <NextIcon onClick={shuffleHandler} onMouseEnter={() => { hoverSfx[0](); hoverSfx[1](); }} />

      <audio
        ref={playerRef}
        src={playList[currentSong]}
        onEnded={shuffleHandler}
      />
      <Text>{displaySong}</Text>
    </MusicPlayerWrapper>
  );
}

export default MusicPlayer;