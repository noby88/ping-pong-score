'use client';

import Button from '@/components/basic/button/Button';
import Input from '@/components/basic/input/Input';
import Label from '@/components/basic/label/Label';
import { createClient } from '@/utils/supabase/client';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { Container } from './styled';
import { canSubmit } from './util';
import { Spinner } from '@/components/basic/spinner/Spinner';
import { useRouter } from 'next/navigation';

const PLACEHOLDER = new Date().toLocaleString();
const INITIAL_PLAYERS = { player1: '', player2: '' };

const CreateNewSession = () => {
  const [isCreating, startCreating] = useTransition();
  const router = useRouter();
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [name, setName] = useState('');

  const { data: auth } = useSession();

  const supabase = createClient();

  const canStart = canSubmit(players);

  const handleStartSession = () =>
    startCreating(async () => {
      const { error, data } = await supabase
        .from('sessions')
        .insert({ owner: auth?.user?.email, name: name || PLACEHOLDER, ...players })
        .select()
        .single();
      if (error) {
        alert(error.message);
      } else {
        setPlayers(INITIAL_PLAYERS);
        setName('');
        router.push(`/session/${data.identifier}`);
      }
    });

  return (
    <Container>
      <Label htmlFor='name'>Name the session</Label>
      <Input name={'name'} placeholder={PLACEHOLDER} value={name} onChange={(event) => setName(event.target.value)} />
      <Label htmlFor='player1'>Name for player/team 1</Label>
      <Input
        name={'player1'}
        placeholder={'Player A'}
        value={players.player1}
        onChange={(event) => setPlayers((prev) => ({ ...prev, player1: event.target.value }))}
      />
      <Label htmlFor='player2'>Name for player/team 2</Label>
      <Input
        name={'player2'}
        placeholder={'Player B'}
        value={players.player2}
        onChange={(event) => setPlayers((prev) => ({ ...prev, player2: event.target.value }))}
      />
      <Button onClick={handleStartSession} disabled={!canStart || isCreating}>
        {isCreating ? <Spinner /> : 'Start session'}
      </Button>
    </Container>
  );
};

export default CreateNewSession;
