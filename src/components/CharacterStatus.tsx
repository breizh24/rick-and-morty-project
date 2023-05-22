import { styled } from 'styled-components';

const CharacterStatus = styled.span<{ $status: string }>`
  padding: var(--space-xs);
  text-transform: capitalize;
  border-radius: var(--border-radius-sm);
  border: 2px solid var(--color-border);
  background: ${props =>
    props.$status === 'Alive'
      ? 'hsl(112deg 77% 64%)'
      : props.$status === 'Dead'
      ? 'hsl(5deg 99% 64%)'
      : 'hsl(0deg 1% 78%)'};
  margin-right: var(--space-xs);
`;

export default CharacterStatus;
