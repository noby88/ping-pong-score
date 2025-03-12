'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  height: calc((100vh - 40rem) / 2);
  width: 100%;
  box-sizing: content-box;
  border-radius: var(--border-radius-2);
  font-size: 2.5rem;
  display: grid;
  place-content: center;

  &:disabled {
    background-color: var(--gray-500);
  }
`;

export const DecreaseButton = styled(Button)`
  background-color: var(--red-500);
`;

export const IncreaseButton = styled(Button)`
  background-color: var(--green-500);
`;
