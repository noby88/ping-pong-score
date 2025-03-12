'use client';

import { createClient } from '@/utils/supabase/client';
import { CircleFadingPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '../spinner/Spinner';
import { FloatingButton } from './styled';

interface IProps {
  sessionId: number;
  sibling?: boolean;
}

const supabase = createClient();

const NewGameButton: React.FC<IProps> = ({ sessionId, sibling }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleCreate = async () => {
    setClicked(true);
    const game = await supabase
      .from('games')
      .insert([{ session_id: sessionId }])
      .select();
    if (game.error) {
      alert('Failed to create new game.');
    }

    router.push(`${sibling ? '..' : '.'}/${game.data![0].identifier}`);
  };

  return (
    <FloatingButton disabled={clicked} onClick={handleCreate}>
      {clicked ? <Spinner /> : <CircleFadingPlus />}
    </FloatingButton>
  );
};

export default NewGameButton;
