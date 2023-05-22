import CharacterStatus from './CharacterStatus';
import { styled } from 'styled-components';
import Image from 'next/image';
import { fadeInKeyFrames } from '@/utils/animations';
import { type Character } from '@/gql/graphql';
import ProfileEpisode from './ProfileEpisode';
import pluralize from '@/utils/pluralize';

const CharacterContent = styled.div`
  width: 100%;
  padding: var(--space-md);
  background: var(--color-card-bg-back);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-elevation-medium);
  border: 2px solid var(--color-border);
  margin-top: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const InfoSection = styled.section`
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
`;

const CharacterInfo = styled.div`
  flex: 1 1 270px;
`;

const Status = styled(CharacterStatus)`
  margin-right: var(--space-sm);
`;

const InfoText = styled.span`
  text-transform: capitalize;
  font-size: var(--font-size-lg);
`;

const Avatar = styled(Image)`
  border-radius: var(--border-radius-sm);
  animation: ${fadeInKeyFrames} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  max-width: 300px;
  width: 100%;
  object-fit: cover;
  height: auto;
`;

const H1 = styled.h1`
  margin-top: -0.5rem;
`;

const H3 = styled.h3`
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-sm);
`;

const EpisodeList = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  margin-bottom: var(--space-sm);
`;

interface Props {
  character: Character;
}

function CharacterProfile({ character }: Props) {
  return (
    <CharacterContent>
      <InfoSection>
        <Avatar
          priority
          src={character?.image || '/placeholder-avatar.jpeg'}
          alt={
            character?.image
              ? `${character?.name} avatar`
              : 'Placeholder avatar'
          }
          width={300}
          height={300}
        />
        <CharacterInfo>
          <H1>{character?.name}</H1>
          <section>
            {character.status ? (
              <Status $status={character?.status}>{character?.status}</Status>
            ) : null}
            <InfoText>
              {character?.gender} - {character?.species}
            </InfoText>
          </section>
          {character?.type ? (
            <section>
              <h4>Type</h4>
              <InfoText>{character.type}</InfoText>
            </section>
          ) : null}
          <section>
            <h4>Origin</h4>
            <InfoText>{`${character?.origin?.name}${
              character?.origin?.id
                ? ` - ${character.origin?.residents?.length} ${pluralize(
                    'resident',
                    character.origin?.residents?.length
                  )}`
                : ''
            }`}</InfoText>
          </section>
          <section>
            <h4>Last known location</h4>
            <InfoText>{`${character?.location?.name}${
              character?.location?.id
                ? ` - ${character.location?.residents?.length} ${pluralize(
                    'resident',
                    character.origin?.residents?.length
                  )}`
                : ''
            }`}</InfoText>
          </section>
        </CharacterInfo>
      </InfoSection>
      <section>
        <H3>Episodes featuring this character: {character?.episode?.length}</H3>
        <EpisodeList>
          {character?.episode?.map(episode =>
            episode ? (
              <ListItem key={episode.id}>
                <ProfileEpisode episode={episode} charactedId={character?.id} />
              </ListItem>
            ) : null
          )}
        </EpisodeList>
      </section>
    </CharacterContent>
  );
}

export default CharacterProfile;
