import NewGameButton from '@/components/basic/newGameButton/NewGameButton';
import SessionTitle from '@/components/basic/sessionTitle/SessionTitle';
import Title from '@/components/basic/title/Title';
import GameList from '@/components/complex/gameList/GameList';
import { createClient } from '@/utils/supabase/server';

const SessionPage = async ({ params }: { params: { sessionIdentifier: string } }) => {
  const { sessionIdentifier } = await params;
  const supabase = await createClient();

  const session = await supabase.from('sessions').select().eq('identifier', sessionIdentifier).single();

  if (session.error) {
    return <Title>Failed to load session data</Title>;
  }

  return (
    <>
      <NewGameButton />
      <SessionTitle session={session.data} />
      <GameList sessionId={session.data.id} />
    </>
  );
};

export default SessionPage;
