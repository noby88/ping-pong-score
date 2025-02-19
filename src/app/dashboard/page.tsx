'use client';

import Title from '@/components/basic/title/Title';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const session = useSession();

  return <Title>Welcome {session.data?.user?.name}</Title>;
};

export default DashboardPage;
