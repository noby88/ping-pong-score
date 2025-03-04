'use client';

import styled from 'styled-components';
import Button from '../button/Button';

export const FloatingButton = styled(Button)`
  position: fixed;
  right: 1rem;
  font-weight: bold;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  z-index: 1500;
`;
