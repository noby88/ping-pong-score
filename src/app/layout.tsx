import AuthButton from '@/components/complex/authButton/AuthButton';
import SessionProvider from '@/components/complex/sessionProvider/SessionProvider';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ping Pong Score',
  description: 'Keep track of the score while playing',
};

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <head>
        {/* <!-- Optional base styles (Reset + Remove common styles to start from scratch) --> */}
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/dashvars/dashvar/dist/base.css' />

        {/* <!-- Add Dashvar CSS Variables --> */}
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/dashvars/dashvar/dist/dashvar.css' />
      </head>
      <body>
        <SessionProvider session={session}>
          <main>
            {children}
            <AuthButton />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
