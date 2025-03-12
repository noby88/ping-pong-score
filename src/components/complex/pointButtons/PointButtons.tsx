'use client';

import { createClient } from '@/utils/supabase/client';
import type { Game } from '@/utils/supabase/database.types';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Container, DecreaseButton, IncreaseButton } from './styled';

type IPlayerKey = keyof Pick<Game, 'player1_point' | 'player2_point'>;

interface IProps {
  gameIdentifier: string;
  player: IPlayerKey;
  liveAmend: (player: IPlayerKey, point: number) => void;
}

const supabase = createClient();

const PointButtons: React.FC<IProps> = ({ gameIdentifier, player, liveAmend }) => {
  const [updating, setUpdating] = useState(false);

  const handleAddPoint = (point: number) => {
    setUpdating(true);
    navigator.vibrate?.(100);
    supabase
      .rpc(player === 'player1_point' ? 'add_point_1' : 'add_point_2', {
        game_identifier: gameIdentifier,
        point: point,
      })
      .then(() => {
        liveAmend(player, point);
        setUpdating(false);
      });
  };

  return (
    <Container>
      <DecreaseButton disabled={updating} onClick={() => handleAddPoint(-1)}>
        <Minus />
      </DecreaseButton>
      <IncreaseButton disabled={updating} onClick={() => handleAddPoint(1)}>
        <Plus />
      </IncreaseButton>
    </Container>
  );
};

export default PointButtons;
