import SessionTitle from '@/components/basic/sessionTitle/SessionTitle';
import Title from '@/components/basic/title/Title';
import GamePlaying from '@/components/complex/gamePlaying/GamePlaying';
import { createClient } from '@/utils/supabase/server';

const GamePage = async ({ params }: { params: { sessionIdentifier: string; gameIdentifier: string } }) => {
  const { sessionIdentifier, gameIdentifier } = await params;

  const supabase = await createClient();

  const session = await supabase.from('sessions').select().eq('identifier', sessionIdentifier).single();

  if (session.error) {
    return <Title>Failed to load session data</Title>;
  }
  return (
    <>
      <SessionTitle session={session.data} hideDate={true} />
      <GamePlaying gameIdentifier={gameIdentifier} />
    </>
  );
};

export default GamePage;
