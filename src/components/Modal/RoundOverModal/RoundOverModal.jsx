// src/components/Modal/RoundOverModal/RoundOverModal.jsx
import React, { useContext } from 'react';
import { Title, Subtitle } from '../../../styles/General.styled';
import { ModalHeader, ModalBody, ModalFooter } from '../../Modal/Modal.styled';
import Button from '../../Button/Button';
import { GameContext } from '../../../contexts/GameContext';
import { ModalContext } from '../../../contexts/ModalContext';
import { SfxContext } from '../../../contexts/SfxContext';
import { useNavigate } from 'react-router-dom';

function RoundOverModal() {
  const { resetBoard, game, restartGame } = useContext(GameContext);
  const { handleModal } = useContext(ModalContext);
  const { hoverSfx, clickSfx, completedSfx } = useContext(SfxContext);
  const navigate = useNavigate();

  return (
    <>
      <ModalHeader>
        <Title primary>
          {game.roundWinner
            ? `${game.roundWinner.name} Wins Round`
            : 'Round drawn'}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Subtitle primary>Choices will be switched now.</Subtitle>
        <Subtitle primary>{game.player1.name}: {game.player1.score}</Subtitle>
        <Subtitle primary>{game.player2.name}: {game.player2.score}</Subtitle>
      </ModalBody>
      <ModalFooter>
        <Button
          color="#f9c811"
          onClick={() => {
            clickSfx[0]();
            clickSfx[1]();
            handleModal();
            resetBoard();
          }}
          onMouseEnter={() => {
            hoverSfx[0]();
            hoverSfx[1]();
          }}
        >
          Continue
        </Button>
        <Button
          color="#8437f9"
          onClick={() => {
            completedSfx[0]();
            completedSfx[1]();
            restartGame();
            handleModal();
            navigate('/');
          }}
          onMouseEnter={() => {
            hoverSfx[0]();
            hoverSfx[1]();
          }}
        >
          Restart
        </Button>
      </ModalFooter>
    </>
  );
}

export default RoundOverModal;