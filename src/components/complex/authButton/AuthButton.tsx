'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '@/components/basic/button/Button';

const AuthButton = () => {
  const { status } = useSession();

  return status === 'authenticated' ? (
    <Button onClick={() => signOut()}>log out</Button>
  ) : (
    <Button onClick={() => signIn()}>log in</Button>
  );
};

export default AuthButton;
