import Title from '@/components/basic/title/Title';
import NewSession from '@/components/complex/newSession/NewSession';

const DashboardPage = () => {
  return (
    <>
      <section>
        <Title>Match sessions</Title>
      </section>
      <section>
        <NewSession />
      </section>
    </>
  );
};

export default DashboardPage;
