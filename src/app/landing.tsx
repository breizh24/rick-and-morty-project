'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { styled, keyframes } from 'styled-components';
import { charactersQuery } from '@/utils/queries';
import useGraphQL from '@/utils/useGraphQL';
import parsePageParam from '@/utils/parsePageParam';
import CharacterCard, { cardMaxWidth } from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: calc(${cardMaxWidth}px * 3 + var(--space-md) * 4);
  margin: 0 auto;
  padding: var(--space-md);
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
`;

export default function Landing() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parsePageParam(searchParams.get('page'));

  const { data } = useGraphQL(charactersQuery, { page: page || 1 });

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
        <Pagination
          prev={data?.characters?.info?.prev}
          next={data?.characters?.info?.next}
          page={page}
          lastPage={data?.characters?.info?.pages}
          setPage={page => router.push(`?page=${page}`)}
        />
        {data?.characters?.results && (
          <CharactersContainer>
            {data?.characters?.results?.map(character =>
              character ? (
                <CharacterCard {...character} key={character.id} />
              ) : null
            )}
          </CharactersContainer>
        )}
        <Pagination
          prev={data?.characters?.info?.prev}
          next={data?.characters?.info?.next}
          page={page}
          lastPage={data?.characters?.info?.pages}
          setPage={page => router.push(`?page=${page}`)}
        />
      </Container>
    </main>
  );
}
