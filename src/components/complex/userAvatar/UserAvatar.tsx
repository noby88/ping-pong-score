'use client';

import { useSession } from 'next-auth/react';
import { Avatar } from './styled';
import Image from 'next/image';
import Link from 'next/link';

const UserAvatar = () => {
  const { data: auth } = useSession();
  return (
    <Link href={'/dashboard'}>
      <Avatar>
        <Image
          alt='user profile image'
          src={auth?.user?.image ?? ''}
          referrerPolicy='no-referrer'
          width={46}
          height={1}
        />
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
