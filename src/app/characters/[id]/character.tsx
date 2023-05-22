'use client';

import { styled } from 'styled-components';
import { characterByIdQuery } from '@/utils/queries';
import useGraphQL from '@/utils/useGraphQL';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CharacterProfile from '@/components/CharacterProfile';
import Head from 'next/head';

const Container = styled.div`
  margin: 0 auto;
  padding: var(--space-md);
  max-width: 800px;
  width: 100%;
`;

const LinkToHome = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-style: italic;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Character() {
  const params = useParams();
  const { data } = useGraphQL(characterByIdQuery, { id: params.id || '1' });

  return (
    <main>
      <Container>
        <LinkToHome href="/?page=1">{`Back to Home`}</LinkToHome>
        {data?.character ? (
          <CharacterProfile character={data.character} />
        ) : null}
      </Container>
    </main>
  );
}
