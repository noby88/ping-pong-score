'use client';

import Button from '@/components/basic/button/Button';
import Input from '@/components/basic/input/Input';
import Label from '@/components/basic/label/Label';
import { useState } from 'react';
import { Container } from './styled';
import { canSubmit } from './util';

const CreateNewSession = () => {
  const [players, setPlayers] = useState({ player1: '', player2: '' });

  const canStart = canSubmit(players);

  const handleStartSession = () => {
    console.log('start:', players, canStart);
  };

  return (
    <Container>
      <Label htmlFor='player1'>Name for player/team 1</Label>
      <Input
        name={'player1'}
        placeholder={'Player A'}
        onChange={(event) => setPlayers((prev) => ({ ...prev, player1: event.target.value }))}
      />
      <Label htmlFor='player2'>Name for player/team 2</Label>
      <Input
        name={'player2'}
        placeholder={'Player B'}
        onChange={(event) => setPlayers((prev) => ({ ...prev, player2: event.target.value }))}
      />
      <Button onClick={handleStartSession} disabled={!canStart}>
        Start session
      </Button>
    </Container>
  );
};

export default CreateNewSession;
