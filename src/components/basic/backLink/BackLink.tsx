'use client';

import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { FloatingButton } from './styles';
import { Spinner } from '../spinner/Spinner';

const BackButton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <FloatingButton disabled={clicked} onClick={() => setClicked(true)}>
      {clicked ? <Spinner /> : <ArrowLeft />}
    </FloatingButton>
  );
};

export default BackButton;
