'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
  height: calc(100dvh - 10rem);

  @media only screen and (min-width: 600px) {
    grid-auto-flow: column;
  }
`;

export const StartTime = styled.span``;

export const Score = styled.span`
  font-size: 7rem;
  line-height: 7rem;
`;

export const Middle = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;
