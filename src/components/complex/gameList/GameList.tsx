'use client';

import Title from '@/components/basic/title/Title';
import { Container } from './styled';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import type { Game } from '@/utils/supabase/database.types';
import GameItem from '../gameItem/GameItem';
import Link from 'next/link';

interface IProps {
  sessionId: number;
}

const GameList: React.FC<IProps> = ({ sessionId }) => {
  const [games, setGames] = useState<Game[]>([]);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from('games')
      .select()
      .order('created_at', { ascending: false })
      .eq('session_id', sessionId)
      .then(({ data, error }) => !error && setGames(data ?? []));

    const gamesSubscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'games', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setGames((prev) => [payload.new as Game, ...prev]);
          }
          if (payload.eventType === 'UPDATE') {
            setGames((prev) =>
              prev.map((game) => (game.id === (payload.new as Game).id ? (payload.new as Game) : game))
            );
          }
        }
      )
      .subscribe();

    return () => {
      gamesSubscription.unsubscribe();
    };
  }, [supabase, sessionId]);

  return (
    <Container>
      <Title>Games:</Title>
      {games.length === 0 ? 'There are no games yet in this session' : null}
      {games.map((game) => (
        <Link key={game.id} href={`${game.identifier}`}>
          <GameItem game={game} />
        </Link>
      ))}
    </Container>
  );
};

export default GameList;
