'use client';

import { createClient } from '@/utils/supabase/client';
import { FloatingButton } from './styled';
import { useRouter } from 'next/navigation';

interface IProps {
  sessionId: number;
  sibling?: boolean;
}

const supabase = createClient();

const NewGameButton: React.FC<IProps> = ({ sessionId, sibling }) => {
  const router = useRouter();

  const handleCreate = async () => {
    const game = await supabase
      .from('games')
      .insert([{ session_id: sessionId }])
      .select();
    if (game.error) {
      alert('Failed to create new game.');
    }

    router.push(`${sibling ? '..' : '.'}/${game.data![0].identifier}`);
  };

  return <FloatingButton onClick={handleCreate}>+</FloatingButton>;
};

export default NewGameButton;
