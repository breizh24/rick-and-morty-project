import React from 'react';
import { Episode } from '@/gql/graphql';
import { styled } from 'styled-components';
import Link from 'next/link';

interface Props {
  episode: Episode;
  charactedId?: string | null;
}

const StyledSummary = styled.summary`
  cursor: pointer;
  font-size: var(--font-size-lg);
`;

const EpisodeInfo = styled.p`
  padding-left: calc(var(--space-md) + 4px);
  margin-bottom: var(--space-sm);
`;

function ProfileEpisode({ episode, charactedId }: Props) {
  return (
    <details>
      <StyledSummary>{episode.name}</StyledSummary>
      <EpisodeInfo>
        This episode went live on {episode.air_date}. Others character featured
        in this episode are:{' '}
        {episode.characters &&
          episode.characters
            ?.filter(character => character?.id !== charactedId)
            .map((character, index) => {
              return (
                <>
                  <Link
                    key={character?.id}
                    href={`/characters/${character?.id}`}
                  >
                    {character?.name}
                  </Link>
                  {episode?.characters?.length === index + 2 ? '.' : ', '}
                </>
              );
            })}
      </EpisodeInfo>
    </details>
  );
}

export default ProfileEpisode;
