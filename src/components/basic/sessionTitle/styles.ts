'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-items: center;
  column-gap: 1rem;
`;

export const PlayerName = styled.span`
  font-size: 2rem;

  &:nth-child(1) {
    justify-self: flex-end;
  }
  &:nth-child(3) {
    justify-self: flex-start;
  }
`;

export const Vs = styled.span`
  font-style: italic;
  font-weight: bold;
  color: var(--yellow-400);
`;

export const StartTime = styled.span`
  grid-column: 1 / span 3;
`;
