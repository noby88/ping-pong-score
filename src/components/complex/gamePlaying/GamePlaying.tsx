'use client';

import { createClient } from '@/utils/supabase/client';
import type { Game } from '@/utils/supabase/database.types';
import { useEffect, useState } from 'react';
import { Container, Hr, Score, StartTime } from './styles';
import PointButtons from '../pointButtons/PointButtons';

interface IProps {
  gameIdentifier: string;
}

const supabase = createClient();

const GamePlaying: React.FC<IProps> = ({ gameIdentifier }) => {
  const [game, setGame] = useState<Game>();

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
  }, [gameIdentifier]);

  return (
    <Container>
      <StartTime>{new Date(game!.created_at).toLocaleString('zh')}</StartTime>
      <PointButtons gameIdentifier={gameIdentifier} player='player1_point' />
      <Score>{game?.player1_point}</Score>
      <Hr />
      <Score>{game?.player2_point}</Score>
      <PointButtons gameIdentifier={gameIdentifier} player='player2_point' />
    </Container>
  );
};

export default GamePlaying;
