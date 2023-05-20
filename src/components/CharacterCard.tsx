'use client';

import { type Character } from '@/gql/graphql';
import Image from 'next/image';
import { styled } from 'styled-components';

const cardHeight = 240;

const Card = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--border-radius);
  border: 2px solid #000;
  background-color: var(--color-card-bg);
  height: ${cardHeight}px;
  width: 100%;
  max-width: 560px;
  box-shadow: var(--shadow-elevation-medium);
  display: flex;
  &:hover {
    outline: 1px solid #000;
    box-shadow: var(--shadow-elevation-high);
  }
`;

const Avatar = styled(Image)`
  object-position: center center;
  flex: 0 0 ${cardHeight}px;
  object-fit: cover;
  height: auto;
`;

const InfoContainer = styled.div`
  padding: var(--space-xs) var(--space-sm);
  flex: 1;
  min-width: 0;
`;

function CharacterCard(props: Pick<Character, 'id' | 'image' | 'name'>) {
  return (
    <Card>
      <Avatar
        src={props.image || ''}
        alt={props.name || ''}
        width={cardHeight}
        height={cardHeight}
      />
      <InfoContainer>
        <h3>{props.name}</h3>
      </InfoContainer>
    </Card>
  );
}

export default CharacterCard;
