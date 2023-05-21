'use client';

import { type Character } from '@/gql/graphql';
import Image from 'next/image';
import { styled, keyframes } from 'styled-components';

const cardHeight = 240;
export const cardMaxWidth = 560;

export const Card = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--border-radius);
  border: 2px solid var(--color-border);
  background-color: var(--color-card-bg);
  height: ${cardHeight}px;
  width: 100%;
  max-width: ${cardMaxWidth}px;
  box-shadow: var(--shadow-elevation-medium);
  display: flex;
  &:hover {
    outline: 1px solid var(--color-border);
    box-shadow: var(--shadow-elevation-high);
  }
`;

const fadeIn = keyframes` 
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Avatar = styled(Image)`
  object-position: center center;
  flex: 0 0 ${cardHeight}px;
  object-fit: cover;
  height: auto;
  animation: ${fadeIn} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const InfoContainer = styled.div`
  padding: var(--space-xs) var(--space-sm);
  flex: 1;
  min-width: 0;
`;

function CharacterCard({
  name = 'Unknown name',
  image,
}: Pick<Character, 'id' | 'image' | 'name'>) {
  return (
    <Card>
      <Avatar
        src={image || '/placeholder-avatar.jpeg'}
        alt={image ? `${name} avatar` : 'Placeholder avatar'}
        width={cardHeight}
        height={cardHeight}
      />
      <InfoContainer>
        <h3>{name}</h3>
      </InfoContainer>
    </Card>
  );
}

export default CharacterCard;
