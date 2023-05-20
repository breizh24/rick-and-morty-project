'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { styled, keyframes } from 'styled-components';
import { charactersQuery } from '@/utils/queries';
import useGraphQL from '@/utils/useGraphQL';
import parsePageParam from '@/utils/parsePageParam';
import CharacterCard from '@/components/CharacterCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1750px;
  margin: 0 auto;
  padding: var(--space-md) 0;
`;

const scaleInCenter = keyframes`
 0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Logo = styled(Image)`
  width: 400px;
  height: auto;
  margin: 0 auto;
  animation: ${scaleInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  filter: drop-shadow(var(--shadow-logo));
`;

const CharactersContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(35rem, 100%), 1fr));
  gap: var(--space-md);
  justify-content: center;
  padding: var(--space-lg) var(--space-md);
  justify-items: center;
`;

export default function Characters() {
  const searchParams = useSearchParams();

  const page = parsePageParam(searchParams.get('page'));

  const { data, isLoading } = useGraphQL(charactersQuery, { page: page || 1 });

  return (
    <main>
      <Container>
        <Logo
          src="/rick-and-morty-logo.png"
          width={400}
          height={154}
          alt="Rick and Morty logo"
          priority
        />
        <CharactersContainer>
          {isLoading && <p>Loading...</p>}
          {data?.characters?.results?.map(character =>
            character ? (
              <CharacterCard key={character.id} {...character} />
            ) : null
          )}
        </CharactersContainer>
      </Container>
    </main>
  );
}
