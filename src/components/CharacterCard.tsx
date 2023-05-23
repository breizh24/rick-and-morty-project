'use client';

import React from 'react';
import { type Character } from '@/gql/graphql';
import Image from 'next/image';
import { styled } from 'styled-components';
import { fadeInKeyFrames } from '@/utils/animations';
import InternalLink from './InternalLink';
import pluralize from '@/utils/pluralize';
import CharacterStatus from './CharacterStatus';
import useRect from '@/utils/useRect';

const cardHeight = 240;
export const cardMaxWidth = 560;

const Card = styled.div<{ $flipped: boolean; $height: number | undefined }>`
  width: 560px;
  height: ${cardHeight}px;
  min-width: 0;
  max-width: ${cardMaxWidth}px;
  cursor: pointer;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: ${props => (props.$flipped ? 'rotateX(180deg)' : 'none')};
  border-radius: var(--border-radius);
  &:focus {
    outline: 1px solid var(--color-border);
  }
  @media screen and (max-width: 37rem) {
    width: 100%;
    min-height: 480px;
    height: ${props => (props.$height ? props.$height + cardHeight : '')}px;
  }
`;

const CardFront = styled.div`
  position: absolute;
  overflow: hidden;
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
  @media screen and (max-width: 37rem) {
    flex-direction: column;
  }
`;

const CardBack = styled(CardFront)`
  transform: rotateX(180deg);
  background: var(--color-card-bg-back);
`;

const AvatarContainer = styled.div`
  position: relative;
  height: 100%;
  width: 240px;
  @media screen and (max-width: 37rem) {
    width: 100%;
    height: ${cardHeight}px;
  }
`;

const Avatar = styled(Image)`
  object-position: center center;
  object-fit: cover;
  animation: ${fadeInKeyFrames} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @media screen and (max-width: 37rem) {
    width: 100%;
    object-position: top center;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: var(--space-sm);
  left: var(--space-sm);
`;

const InfoContainer = styled.div`
  padding: var(--space-xs) var(--space-sm);
  flex: 1;
  min-width: 0;
`;

const InfoText = styled.span`
  text-transform: capitalize;
  font-size: var(--font-size-lg);
`;

const Paragraph = styled.p`
  margin-bottom: var(--space-sm);
  font-size: var(--font-size-lg);
`;

const DiscoverMoreLink = styled(InternalLink)`
  font-style: italic;
  text-decoration: underline;
  color: var(--color-text);
  font-size: var(--font-size-lg);
`;

function CharacterCard({
  id,
  name = 'Unknown name',
  image,
  gender,
  species,
  status,
  origin,
  location,
  episode,
  type,
}: Pick<
  Character,
  | 'id'
  | 'name'
  | 'image'
  | 'gender'
  | 'species'
  | 'status'
  | 'origin'
  | 'location'
  | 'episode'
  | 'type'
>) {
  const [flipped, setFlipped] = React.useState(false);
  const cardInfoRef = React.useRef<HTMLDivElement>(null);

  // Used to calculate the height of the card on mobile based on the info container
  // Needed because the info container is absolutely positioned for the flip animation
  const cardInfoRect = useRect(cardInfoRef);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if ((e.target as HTMLElement).closest('a')) return;
      e.preventDefault();
      setFlipped(prev => !prev);
    }
  };

  const onCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) return;
    setFlipped(prev => !prev);
  };

  return (
    <Card
      $flipped={flipped}
      $height={cardInfoRect?.height}
      role="button"
      tabIndex={0}
      onClick={onCardClick}
      onKeyDown={onKeyDown}
      aria-label="Click to flip card"
    >
      <CardFront>
        <AvatarContainer>
          <Avatar
            src={image || '/placeholder-avatar.jpeg'}
            alt={image ? `${name} avatar` : 'Placeholder avatar'}
            width={cardHeight}
            height={cardHeight}
          />
          <StatusContainer>
            <CharacterStatus $status={status || 'unknown'}>
              {status || 'unknown'}
            </CharacterStatus>
          </StatusContainer>
        </AvatarContainer>
        <InfoContainer ref={cardInfoRef}>
          <h3>{name}</h3>
          <section>
            <InfoText>
              {gender} - {species}
            </InfoText>
          </section>
          <section>
            <h4>Origin</h4>
            <InfoText>{origin?.name}</InfoText>
          </section>
          <section>
            <h4>Last known location</h4>
            <InfoText>{location?.name}</InfoText>
          </section>
        </InfoContainer>
      </CardFront>
      <CardBack>
        <InfoContainer>
          <h3>{name}</h3>
          <section>
            <h4>Bio</h4>
            <Paragraph>
              {type ? `This is a ${type}, ` : ''}
              {`${
                origin?.id
                  ? `${type ? 't' : 'T'}he origin is ${
                      origin.name
                    } in which We can find ${
                      origin?.residents?.length
                    } ${pluralize('resident', origin?.residents?.length)}.`
                  : "We don't have info about the origin."
              }`}
            </Paragraph>
            <Paragraph>
              This character has been in {episode?.length}{' '}
              {pluralize('episode', episode?.length)}.
            </Paragraph>
          </section>
          <DiscoverMoreLink href={`/characters/${id}`}>
            Discover more
          </DiscoverMoreLink>
        </InfoContainer>
      </CardBack>
    </Card>
  );
}

export default CharacterCard;
