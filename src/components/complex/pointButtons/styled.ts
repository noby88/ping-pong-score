'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  height: 7rem;
  width: 100%;
  border-radius: var(--border-radius-2);
  font-size: 2.5rem;
`;

export const DecreaseButton = styled(Button)`
  background-color: var(--red-500);
`;

export const IncreaseButton = styled(Button)`
  background-color: var(--green-500);
`;
