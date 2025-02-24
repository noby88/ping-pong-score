'use client';

import styled, { keyframes } from 'styled-components';

const animation = keyframes`to {transform: rotate(360deg)}`;

export const Spinner = styled.div<{ size?: number }>`
  display: inline-block;
  width: ${({ size }) => `${size ?? 1}rem`};
  height: ${({ size }) => `${size ?? 1}rem`};
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: ${animation} 1s ease-in-out infinite;
`;
