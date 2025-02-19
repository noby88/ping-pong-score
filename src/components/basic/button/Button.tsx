'use client';

import styled from 'styled-components';

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: var(--text-primary);
  border-radius: var(--border-radius-3);
  box-shadow: var(--box-shadow-1);

  &:hover {
    box-shadow: var(--box-shadow-3);
    filter: brightness(99%);
  }
`;

export default Button;
