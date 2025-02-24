import type { Session } from '@/utils/supabase/database.types';
import { Container, PlayerName, StartTime, Vs } from './styles';

interface IProps {
  session: Session;
  hideDate?: boolean;
}

const SessionTitle: React.FC<IProps> = ({ session, hideDate }) => {
  return (
    <Container>
      <PlayerName>{session.player1}</PlayerName>
      <Vs>vs</Vs>
      <PlayerName>{session.player2}</PlayerName>
      {hideDate ? null : <StartTime>{new Date(session.created_at).toLocaleString('zh')}</StartTime>}
    </Container>
  );
};

export default SessionTitle;
