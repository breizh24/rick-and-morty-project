'use client';

import { styled } from 'styled-components';
import { characterByIdQuery } from '@/utils/queries';
import useGraphQL from '@/utils/useGraphQL';
import { useParams } from 'next/navigation';
import { fadeInKeyFrames } from '@/utils/animations';
import Image from 'next/image';
import Link from 'next/link';

const Container = styled.div`
  margin: 0 auto;
  padding: var(--space-md);
  max-width: 1200px;
  width: 100%;
`;

const CharacterContent = styled.div`
  width: 100%;
  padding: var(--space-md);
  background: var(--color-card-bg-back);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-elevation-medium);
  border: 2px solid var(--color-border);
  margin-top: var(--space-sm);
`;

const InfoSection = styled.section`
  display: flex;
  gap: var(--space-sm);
`;

const Avatar = styled(Image)`
  border-radius: var(--border-radius-sm);
  animation: ${fadeInKeyFrames} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const LinkToHome = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--font-size-lg);
  &:hover {
    text-decoration: underline;
  }
`;

export default function Character() {
  const params = useParams();
  const { data } = useGraphQL(characterByIdQuery, { id: params.id || '1' });
  console.log(data);

  return (
    <main>
      <Container>
        <LinkToHome href="/?page=1">{`Back to Home`}</LinkToHome>
        <CharacterContent>
          <InfoSection>
            <Avatar
              src={data?.character?.image || '/placeholder-avatar.jpeg'}
              alt={
                data?.character?.image
                  ? `${data?.character?.name} avatar`
                  : 'Placeholder avatar'
              }
              width={300}
              height={300}
            />
            <h1>{data?.character?.name}</h1>
          </InfoSection>
        </CharacterContent>
      </Container>
    </main>
  );
}
