'use client';

import { Spinner } from '@/components/basic/spinner/Spinner';
import { createClient } from '@/utils/supabase/client';
import { Mic, MicOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BUttons, Dialog, MicButton } from './styled';
import useListen from '@/hooks/useListen';
import Button from '@/components/basic/button/Button';
import Input from '@/components/basic/input/Input';

interface IProps {
  gameIdentifier: string;
  liveUpdate: (player: 'player1_point' | 'player2_point', point: number) => void;
}

const supabase = createClient();

const ListenButton: React.FC<IProps> = ({ gameIdentifier, liveUpdate }) => {
  const [listenValues, setListenValues] = useState(['first', 'second']);
  const [listening, setListening] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [listenControls, hearing] = useListen(listenValues);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log('trigger for:', hearing);
    if (hearing && listenValues.includes(hearing)) {
      setUpdating(true);
      supabase
        .rpc(hearing === listenValues[0] ? 'add_point_1' : 'add_point_2', {
          game_identifier: gameIdentifier,
          point: 1,
        })
        .then(() => {
          liveUpdate(hearing === listenValues[0] ? 'player1_point' : 'player2_point', 1);
          setUpdating(false);
        });
    }
  }, [hearing, gameIdentifier, liveUpdate, listenValues]);

  const handleMicChange = () => {
    if (listening) {
      try {
        listenControls.stop();
      } catch (error) {
        console.warn(error);
      } finally {
        setListening(false);
      }
    } else {
      setModalOpen(true);
    }
  };

  const handleStartListen = () => {
    try {
      listenControls.start();
      setModalOpen(false);
    } catch (error) {
      console.warn(error);
    } finally {
      setListening(true);
    }
  };

  return (
    <>
      <MicButton onClick={handleMicChange}>{updating ? <Spinner /> : listening ? <Mic /> : <MicOff />}</MicButton>
      <Dialog open={modalOpen}>
        <h1>Keywords to listen for players</h1>
        <label>
          <span>Player 1: </span>
          <Input
            value={listenValues[0]}
            onChange={(event) => setListenValues((prev) => [event.target.value, prev[1]])}
          />
        </label>
        <label>
          <span>Player 2: </span>
          <Input
            value={listenValues[1]}
            onChange={(event) => setListenValues((prev) => [prev[0], event.target.value])}
          />
        </label>
        <BUttons>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleStartListen}>Start listening</Button>
        </BUttons>
      </Dialog>
    </>
  );
};

export default ListenButton;
