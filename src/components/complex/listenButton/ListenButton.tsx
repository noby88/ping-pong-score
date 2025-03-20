'use client';

import { Spinner } from '@/components/basic/spinner/Spinner';
import { createClient } from '@/utils/supabase/client';
import { Mic, MicOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MicButton } from './styled';
import useListen from '@/hooks/useListen';

interface IProps {
  gameIdentifier: string;
  liveUpdate: (player: 'player1_point' | 'player2_point', point: number) => void;
}

const LISTEN_LIST = ['first', 'second'];

const supabase = createClient();

const ListenButton: React.FC<IProps> = ({ gameIdentifier, liveUpdate }) => {
  const [listening, setListening] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [listenControls, hearing] = useListen(LISTEN_LIST);

  useEffect(() => {
    console.log('trigger for:', hearing);
    if (hearing && LISTEN_LIST.includes(hearing)) {
      setUpdating(true);
      supabase
        .rpc(hearing === LISTEN_LIST[0] ? 'add_point_1' : 'add_point_2', {
          game_identifier: gameIdentifier,
          point: 1,
        })
        .then(() => {
          liveUpdate(hearing === LISTEN_LIST[0] ? 'player1_point' : 'player2_point', 1);
          setUpdating(false);
        });
    }
  }, [hearing, gameIdentifier, liveUpdate]);

  const handleMicChange = () => {
    try {
      listenControls[listening ? 'stop' : 'start']();
    } catch (error) {
      console.warn(error);
    }
    setListening(!listening);
  };

  return <MicButton onClick={handleMicChange}>{updating ? <Spinner /> : listening ? <Mic /> : <MicOff />}</MicButton>;
};

export default ListenButton;
