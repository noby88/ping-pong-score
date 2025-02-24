import type { Session } from '@/utils/supabase/database.types';
import { ItemCard, Name, Player1, Player2, Time, Vs } from './styled';
import Link from 'next/link';

interface IProps {
  session: Session;
}

const SessionItem: React.FC<IProps> = ({ session }) => {
  return (
    <Link href={`/session/${session.identifier}`}>
      <ItemCard>
        <Name>{session.name}</Name>
        <Time>{new Date(session.created_at).toLocaleString('zh')}</Time>
        <Vs>vs</Vs>
        <Player1>{session.player1}</Player1>
        <Player2>{session.player2}</Player2>
      </ItemCard>
    </Link>
  );
};

export default SessionItem;
