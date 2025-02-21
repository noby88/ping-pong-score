import Title from '@/components/basic/title/Title';
import AuthButton from '../authButton/AuthButton';
import UserAvatar from '../userAvatar/UserAvatar';
import { Container } from './styled';

const Navbar = () => {
  return (
    <Container>
      <UserAvatar />
      <Title>PPS</Title>
      <AuthButton />
    </Container>
  );
};

export default Navbar;
