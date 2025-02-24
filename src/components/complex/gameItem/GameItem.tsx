import type { Game } from '@/utils/supabase/database.types';
import { GameCard, Player1, Player2, Time } from './styled';

interface IProps {
  game: Game;
}

const GameItem: React.FC<IProps> = ({ game: { created_at, player1_point, player2_point } }) => {
  return (
    <GameCard>
      <Time>{new Date(created_at).toLocaleString('zh')}</Time>
      <Player1 winning={player1_point > player2_point}>{player1_point}</Player1>
      <Player2 winning={player1_point < player2_point}>{player2_point}</Player2>
      <span>-</span>
    </GameCard>
  );
};

export default GameItem;
