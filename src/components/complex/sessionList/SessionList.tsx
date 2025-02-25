'use client';

import { createClient } from '@/utils/supabase/client';
import type { Session } from '@/utils/supabase/database.types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container, SpinnerPositioner } from './styled';
import SessionItem from './SessionItem';
import { Spinner } from '@/components/basic/spinner/Spinner';

const supabase = createClient();

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: auth } = useSession();

  useEffect(() => {
    const getGameSessions = async () => {
      setIsLoading(true);
      const { data: gameSessions } = await supabase
        .from('sessions')
        .select()
        .order('created_at', { ascending: false })
        .eq('owner', auth?.user?.email ?? '');
      setSessions(gameSessions!);
      setIsLoading(false);
    };

    getGameSessions();
  }, [auth?.user?.email]);

  return (
    <Container>
      {isLoading ? (
        <SpinnerPositioner>
          <Spinner size={5} />
        </SpinnerPositioner>
      ) : null}
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} />
      ))}
    </Container>
  );
};

export default SessionList;
