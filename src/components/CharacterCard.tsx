'use client';

import React from 'react';
import { type Character } from '@/gql/graphql';
import Image from 'next/image';
import { styled, keyframes } from 'styled-components';

const cardHeight = 240;
export const cardMaxWidth = 560;

const Card = styled.div<{ flipped: boolean }>`
  width: 560px;
  height: ${cardHeight}px;
  min-width: 0;
  max-width: ${cardMaxWidth}px;
  cursor: pointer;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: ${props => (props.flipped ? 'rotateX(180deg)' : 'none')};
`;

const CardFront = styled.div`
  overflow: hidden;
  position: absolute;
  border-radius: var(--border-radius);
  border: 2px solid var(--color-border);
  display: flex;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background: var(--color-card-bg-front);
  box-shadow: var(--shadow-elevation-medium);
  &:hover {
    outline: 1px solid var(--color-border);
    box-shadow: var(--shadow-elevation-high);
  }
`;

const CardBack = styled(CardFront)`
  transform: rotateX(180deg);
  background: var(--color-card-bg-back);
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
  const [flipped, setFlipped] = React.useState(false);

  return (
    <Card
      flipped={flipped}
      role="button"
      onClick={() => setFlipped(prev => !prev)}
    >
      <CardFront>
        <Avatar
          src={image || '/placeholder-avatar.jpeg'}
          alt={image ? `${name} avatar` : 'Placeholder avatar'}
          width={cardHeight}
          height={cardHeight}
        />
        <InfoContainer>
          <h3>{name}</h3>
        </InfoContainer>
      </CardFront>
      <CardBack>
        <InfoContainer>
          <h3>{name}</h3>
        </InfoContainer>
      </CardBack>
    </Card>
  );
}

export default CharacterCard;
