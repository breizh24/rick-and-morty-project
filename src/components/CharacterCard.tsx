'use client';

import React from 'react';
import { type Character } from '@/gql/graphql';
import Image from 'next/image';
import { styled, keyframes } from 'styled-components';
import Link from 'next/link';
import pluralize from '@/utils/pluralize';

const cardHeight = 240;
export const cardMaxWidth = 560;

const Card = styled.div<{ $flipped: boolean }>`
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

const fadeIn = keyframes` 
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  height: 100%;
  width: 240px;
  @media screen and (max-width: 37rem) {
    width: 100%;
    height: 240px;
  }
`;

const Avatar = styled(Image)`
  object-position: center center;
  object-fit: cover;
  animation: ${fadeIn} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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

const Status = styled.span<{ $status: string }>`
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

const InfoContainer = styled.div`
  padding: var(--space-xs) var(--space-sm);
  flex: 1;
  min-width: 0;
`;

const InfoSection = styled.section`
  margin-bottom: var(--space-sm);
`;

const InfoText = styled.span`
  text-transform: capitalize;
`;

const SectionTitle = styled.h4`
  text-transform: uppercase;
  font-family: 'Noto Sans Mono', monospace;
`;

const Paragraph = styled.p`
  margin-bottom: var(--space-sm);
`;

const DiscoverMoreLink = styled(Link)`
  font-style: italic;
  text-decoration: underline;
  color: var(--color-text);
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped(prev => !prev);
    }
  };

  return (
    <Card
      $flipped={flipped}
      role="button"
      tabIndex={0}
      onClick={() => setFlipped(prev => !prev)}
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
            <Status $status={status || 'unknown'}>{status || 'unknown'}</Status>
          </StatusContainer>
        </AvatarContainer>
        <InfoContainer>
          <h3>{name}</h3>
          <InfoSection>
            <InfoText>
              {gender} - {species}
            </InfoText>
          </InfoSection>
          <InfoSection>
            <SectionTitle>Origin</SectionTitle>
            <InfoText>{origin?.name}</InfoText>
          </InfoSection>
          <InfoSection>
            <SectionTitle>Last known location</SectionTitle>
            <InfoText>{location?.name}</InfoText>
          </InfoSection>
        </InfoContainer>
      </CardFront>
      <CardBack>
        <InfoContainer>
          <h3>{name}</h3>
          <InfoSection>
            <SectionTitle>Bio</SectionTitle>
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
          </InfoSection>
          <DiscoverMoreLink href={`/characters/${id}`}>
            Discover more
          </DiscoverMoreLink>
        </InfoContainer>
      </CardBack>
    </Card>
  );
}

export default CharacterCard;
