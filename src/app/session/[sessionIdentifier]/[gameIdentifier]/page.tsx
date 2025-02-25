import BackButton from '@/components/basic/backLink/BackLink';
import NewGameButton from '@/components/basic/newGameButton/NewGameButton';
import SessionTitle from '@/components/basic/sessionTitle/SessionTitle';
import Title from '@/components/basic/title/Title';
import GamePlaying from '@/components/complex/gamePlaying/GamePlaying';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

const GamePage = async ({ params }: { params: Promise<{ sessionIdentifier: string; gameIdentifier: string }> }) => {
  const { sessionIdentifier, gameIdentifier } = await params;

  const supabase = await createClient();

  const session = await supabase.from('sessions').select().eq('identifier', sessionIdentifier).single();

  if (session.error) {
    return <Title>Failed to load session data</Title>;
  }
  return (
    <>
      <NewGameButton sessionId={session.data.id} sibling={true} />
      <Link href={'..'}>
        <BackButton />
      </Link>
      <SessionTitle session={session.data} hideDate={true} />
      <GamePlaying gameIdentifier={gameIdentifier} />
    </>
  );
};

export default GamePage;
