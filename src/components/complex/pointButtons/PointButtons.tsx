'use client';

import type { Game } from '@/utils/supabase/database.types';
import { Container, DecreaseButton, IncreaseButton } from './styled';
import { createClient } from '@/utils/supabase/client';
import { Minus, Plus } from 'lucide-react';

interface IProps {
  gameIdentifier: string;
  player: keyof Pick<Game, 'player1_point' | 'player2_point'>;
  liveAmend: (player: keyof Pick<Game, 'player1_point' | 'player2_point'>, point: number) => void;
}

const supabase = createClient();

const PointButtons: React.FC<IProps> = ({ gameIdentifier, player, liveAmend }) => {
  const handleAddPoint = (point: number) => {
    liveAmend(player, point);
    supabase.rpc(player === 'player1_point' ? 'add_point_1' : 'add_point_2', {
      game_identifier: gameIdentifier,
      point: point,
    });
  };

  return (
    <Container>
      <DecreaseButton onClick={() => handleAddPoint(-1)}>
        <Minus />
      </DecreaseButton>
      <IncreaseButton onClick={() => handleAddPoint(1)}>
        <Plus />
      </IncreaseButton>
    </Container>
  );
};

export default PointButtons;
