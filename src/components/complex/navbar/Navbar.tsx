'use client';

import Title from '@/components/basic/title/Title';
import { useSession } from 'next-auth/react';
import { Container } from './styled';
import AuthButton from '../authButton/AuthButton';

const Navbar = () => {
  const session = useSession();

  return (
    <Container>
      <Title>Welcome {session.data?.user?.name}</Title>
      <AuthButton />
    </Container>
  );
};

export default Navbar;
