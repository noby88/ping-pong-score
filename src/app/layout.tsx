import SessionProvider from '@/components/complex/sessionProvider/SessionProvider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import Navbar from '@/components/complex/navbar/Navbar';
import './globals.css';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ping Pong Score',
  description: 'Keep track of the score while playing',
};

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  if (Boolean(session)) {
    return (
      <html lang='en'>
        <head>
          {/* <!-- Optional base styles (Reset + Remove common styles to start from scratch) --> */}
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/dashvars/dashvar/dist/base.css' />
          {/* <!-- Add Dashvar CSS Variables --> */}
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/dashvars/dashvar/dist/dashvar.css' />
          <link rel='icon' type='image/png' href='/icon/table-tennis.png' sizes='any' />
        </head>
        <body>
          <SessionProvider session={session}>
            <Navbar />
            <main>
              {children}
              <Analytics />
            </main>
          </SessionProvider>
        </body>
      </html>
    );
  } else {
    redirect('/api/auth/signin');
  }
};

export default RootLayout;
