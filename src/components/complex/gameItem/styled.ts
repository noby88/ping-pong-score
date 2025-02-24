'use client';

import styled from 'styled-components';

export const GameCard = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-areas: 'time time time' 'player1 . player2';
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.5rem;
  border-radius: var(--border-radius-2);
  background-color: var(--background);
  box-shadow: var(--box-shadow-3);
  filter: brightness(1.2);

  @media (prefers-color-scheme: dark) {
    border: solid 1px var(--foreground);
  }
`;

export const Time = styled.span`
  grid-area: time;
`;

const Player = styled.span<{ winning?: boolean }>`
  font-size: 3rem;
  justify-self: center;
  ${({ winning }) => (winning ? 'color: var(--green-600)' : '')}
`;

export const Player1 = styled(Player)`
  grid-area: player1;
`;

export const Player2 = styled(Player)`
  grid-area: player2;
`;
