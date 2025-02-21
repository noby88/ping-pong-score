import Title from '@/components/basic/title/Title';
import NewSession from '@/components/complex/newSession/NewSession';
import SessionList from '@/components/complex/sessionList/SessionList';

const DashboardPage = () => {
  return (
    <>
      <section>
        <Title>Match sessions</Title>
        <SessionList />
      </section>
      <section>
        <NewSession />
      </section>
    </>
  );
};

export default DashboardPage;
