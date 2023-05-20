'use client';

import Image from 'next/image';
import { styled, keyframes } from 'styled-components';
import { charactersQuery, CHARACTERS_KEY } from '@/utils/queries';
import useGraphQL from '@/utils/useGraphQL';

const Main = styled.main`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding: var(--space-md);
`;

const CharactersContainer = styled.div`
  flex: 1;
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
`;

export default function Characters() {
  const { data, isLoading } = useGraphQL(charactersQuery, { page: 1 });

  return (
    <Main>
      <Container>
        <Logo
          src="/rick-and-morty-logo.png"
          width={400}
          height={154}
          alt="Rick and Morty logo"
          priority
        />
        <CharactersContainer></CharactersContainer>
      </Container>
    </Main>
  );
}
