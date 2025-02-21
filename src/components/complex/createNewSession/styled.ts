import styled from 'styled-components';

export const FullRow = styled.div`
  & > button {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: grid;
  gap: 1rem;

  @media only screen and (min-width: 600px) {
    min-width: 600px;
    grid-template-columns: auto 1fr;
    grid-row-gap: 2rem;

    & > ${FullRow} {
      grid-column: 1 / span 2;
    }
  }
`;
