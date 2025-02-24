'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 1rem;
  margin-block-end: 5rem;
`;

export const SpinnerPositioner = styled.div`
  justify-self: center;
`;

export const ItemCard = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-areas: 'name . started' 'player1 vs player2';
  grid-template-columns: 1fr auto 1fr;
  padding: 0.5rem;
  border-radius: var(--border-radius-2);
  background-color: var(--background);
  box-shadow: var(--box-shadow-3);
  filter: brightness(1.2);

  @media (prefers-color-scheme: dark) {
    border: solid 1px var(--foreground);
  }
`;

export const Name = styled.div`
  grid-area: name;
  font-weight: bold;
`;

export const Time = styled.div`
  grid-area: started;
  justify-self: flex-end;
`;

export const Player1 = styled.div`
  grid-area: player1;
  justify-self: flex-end;
  font-size: 2rem;
`;

export const Player2 = styled.div`
  grid-area: player2;
  font-size: 2rem;
`;

export const Vs = styled.div`
  grid-area: vs;
  align-self: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--yellow-400);
`;
