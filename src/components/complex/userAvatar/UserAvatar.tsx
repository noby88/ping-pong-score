'use client';

import { useSession } from 'next-auth/react';
import { Avatar } from './styled';
import Image from 'next/image';

const UserAvatar = () => {
  const { data: auth } = useSession();
  return (
    <Avatar>
      <Image
        alt='user profile image'
        src={auth?.user?.image ?? ''}
        referrerPolicy='no-referrer'
        width={46}
        height={1}
      />
    </Avatar>
  );
};

export default UserAvatar;
