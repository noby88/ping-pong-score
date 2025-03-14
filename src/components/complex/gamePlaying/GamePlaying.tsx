'use client';

import useListen from '@/hooks/useListen';
import useWakeLock from '@/hooks/useWakeLock';
import { createClient } from '@/utils/supabase/client';
import type { Game } from '@/utils/supabase/database.types';
import { Mic, MicOff } from 'lucide-react';
import { ComponentProps, useCallback, useEffect, useState } from 'react';
import PointButtons from '../pointButtons/PointButtons';
import ShareGame from '../shareGame/ShareGame';
import { Container, MicButton, Middle, Score, StartTime } from './styles';
import { Spinner } from '@/components/basic/spinner/Spinner';

interface IProps {
  gameIdentifier: string;
}

const supabase = createClient();

const LISTEN_LIST = ['primary', 'secondary'];

const GamePlaying: React.FC<IProps> = ({ gameIdentifier }) => {
  const [game, setGame] = useState<Game>();
  const [listening, setListening] = useState(false);
  const [updating, setUpdating] = useState(false);

  useWakeLock();
  const [listenControls, hearing] = useListen(LISTEN_LIST);

  const handleAmend: ComponentProps<typeof PointButtons>['liveAmend'] = useCallback(
    (player, point) => {
      if (game) {
        const newGame = { ...game };
        newGame[player] = (newGame[player] ?? 0) + point;
        setGame(newGame);
      }
    },
    [game, setGame]
  );

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
          handleAmend(hearing === LISTEN_LIST[0] ? 'player1_point' : 'player2_point', 1);
          setUpdating(false);
        });
    }
  }, [hearing, gameIdentifier, handleAmend]);

  useEffect(() => {
    supabase
      .from('games')
      .select()
      .eq('identifier', gameIdentifier)
      .single()
      .then(({ data, error }) => !error && setGame(data));

    const gamesSubscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'games', filter: `identifier=eq.${gameIdentifier}` },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setGame(payload.new as Game);
          }
        }
      )
      .subscribe();

    return () => {
      gamesSubscription.unsubscribe();
    };
  }, [gameIdentifier, setGame]);

  if (!game?.id) {
    return null;
  }

  const handleMiceChange = () => {
    try {
      listenControls[listening ? 'stop' : 'start']();
    } catch (error) {
      console.warn(error);
    }
    setListening(!listening);
  };

  return (
    <Container>
      <StartTime>{new Date(game.created_at).toLocaleString('zh')}</StartTime>
      <PointButtons gameIdentifier={gameIdentifier} player='player1_point' liveAmend={handleAmend} />
      <Score>{game.player1_point}</Score>
      <Middle>
        <ShareGame />
        <MicButton onClick={handleMiceChange}>{updating ? <Spinner /> : listening ? <Mic /> : <MicOff />}</MicButton>
      </Middle>
      <Score>{game.player2_point}</Score>
      <PointButtons gameIdentifier={gameIdentifier} player='player2_point' liveAmend={handleAmend} />
    </Container>
  );
};

export default GamePlaying;
