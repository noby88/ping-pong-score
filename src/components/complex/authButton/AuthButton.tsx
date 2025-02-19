'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '@/components/basic/button/Button';

const AuthButton = () => {
  const { status } = useSession();

  return status === 'authenticated' ? (
    <Button onClick={() => signOut()}>LOG OUT</Button>
  ) : (
    <Button onClick={() => signIn()}>LOG IN</Button>
  );
};

export default AuthButton;
