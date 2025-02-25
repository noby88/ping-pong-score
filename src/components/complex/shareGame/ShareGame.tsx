'use client';

import { Link } from 'lucide-react';
import { ShareButton } from './styled';

const ShareGame = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Share the game',
        text: 'Share the game with the competition to track!',
        url: document.URL,
      });
    } else {
      navigator.clipboard.writeText(document.URL);
    }
  };

  return (
    <ShareButton onClick={handleShare}>
      <Link />
    </ShareButton>
  );
};

export default ShareGame;
