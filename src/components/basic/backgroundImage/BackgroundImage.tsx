'use client';

import styled from 'styled-components';

const BackgroundImage = styled.div`
  background-image: url('/icon/table-tennis.png');
  background-repeat: no-repeat;
  background-position: center 2rem;
  background-blend-mode: difference;
  height: 100dvh;
  width: 100dvw;
  position: fixed;
  z-index: -1;
  opacity: 0.03;
`;

export default BackgroundImage;
