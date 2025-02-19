import Button from '@/components/basic/button/Button';
import { Container } from './styled';
import Link from 'next/link';

const NewSession = () => {
  return (
    <Container>
      <Link href={'/new-session'}>
        <Button>Start a new session</Button>
      </Link>
    </Container>
  );
};

export default NewSession;
