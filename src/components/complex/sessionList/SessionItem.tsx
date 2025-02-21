import type { Session } from '@/utils/supabase/database.types';
import { ItemCard, Name, Player1, Player2, Time, Vs } from './styled';

interface IProps {
  session: Session;
}

const SessionItem: React.FC<IProps> = ({ session }) => {
  return (
    <ItemCard>
      <Name>{session.name}</Name>
      <Time>{new Date(session.created_at).toLocaleString()}</Time>
      <Vs>vs</Vs>
      <Player1>{session.player1}</Player1>
      <Player2>{session.player2}</Player2>
    </ItemCard>
  );
};

export default SessionItem;
