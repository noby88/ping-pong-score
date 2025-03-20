'use client';

import Button from '@/components/basic/button/Button';
import styled from 'styled-components';

export const MicButton = styled(Button)`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
`;

export const Dialog = styled.dialog`
  display: ${({ open }) => (open ? 'grid' : 'none')};
  gap: 1rem;
  justify-items: center;
  padding: 2rem;
  border-radius: var(--border-radius-3);
`;

export const BUttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
