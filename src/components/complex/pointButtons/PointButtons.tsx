'use client';

import type { Game } from '@/utils/supabase/database.types';
import { Container, DecreaseButton, IncreaseButton } from './styled';
import { createClient } from '@/utils/supabase/client';
import { Minus, Plus } from 'lucide-react';

type IPlayerKey = keyof Pick<Game, 'player1_point' | 'player2_point'>;

interface IProps {
  gameIdentifier: string;
  player: IPlayerKey;
  liveAmend: (player: IPlayerKey, point: number) => void;
}

const supabase = createClient();

const PointButtons: React.FC<IProps> = ({ gameIdentifier, player, liveAmend }) => {
  const handleAddPoint = (point: number) => {
    supabase
      .rpc(player === 'player1_point' ? 'add_point_1' : 'add_point_2', {
        game_identifier: gameIdentifier,
        point: point,
      })
      .then(() => liveAmend(player, point));
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
