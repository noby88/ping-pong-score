import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  if (Boolean(session)) {
    return children;
  } else {
    redirect('/api/auth/signin');
  }
};

export default DashboardLayout;
