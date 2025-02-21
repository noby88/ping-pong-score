'use client';

import { createClient } from '@/utils/supabase/client';
import type { Session } from '@/utils/supabase/database.types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container } from './styled';
import SessionItem from './SessionItem';

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const supabase = createClient();
  const { data: auth } = useSession();

  useEffect(() => {
    const getGameSessions = async () => {
      const { data: gameSessions } = await supabase
        .from('sessions')
        .select()
        .eq('owner', auth?.user?.email ?? '');
      setSessions(gameSessions!);
    };

    getGameSessions();
  }, [supabase, auth?.user?.email]);

  return (
    <Container>
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} />
      ))}
    </Container>
  );
};

export default SessionList;
