'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;

  @media only screen and (min-width: 600px) {
    grid-auto-flow: column;
  }
`;

export const Hr = styled.hr`
  width: 100%;
`;

export const Score = styled.span`
  font-size: min(25vh, 25vw);
`;
