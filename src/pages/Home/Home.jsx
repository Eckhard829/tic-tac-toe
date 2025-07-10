import React, { useContext } from "react";
import { Container, Title, Subtitle } from "../../styles/General.styled";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { SfxContext } from "../../contexts/SfxContext";

function Home() {
  const navigate = useNavigate();
  const { hoverSfx, clickSfx } = useContext(SfxContext);
  return (
    <Container columnBased>
      <Title>TicTacToe</Title>
      <Subtitle>Play with your friends, higher score wins!</Subtitle>
      <Button
        onClick={() => {
          clickSfx[0](); // Call the play function
          clickSfx[1](); // Enable playback
          navigate("/game-on");
        }}
        onMouseEnter={() => {
          hoverSfx[0](); // Call the play function
          hoverSfx[1](); // Enable playback
        }}
      >
        Play Now
      </Button>
    </Container>
  );
}

export default Home;