import Title from '@/components/basic/title/Title';
import { Container } from './styled';
import AuthButton from '../authButton/AuthButton';

const Navbar = () => {
  return (
    <Container>
      <Title>PPS</Title>
      <AuthButton />
    </Container>
  );
};

export default Navbar;
