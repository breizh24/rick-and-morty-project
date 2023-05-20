import { Card } from './CharacterCard';
import { styled } from 'styled-components';
import Link from 'next/link';

interface Props {
  text: string;
  href: string;
}

const StyledLink = styled(Link)`
  all: unset;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: bold;
`;

function PaginationCard({ text, href }: Props) {
  return (
    <Card>
      <StyledLink href={href}>
        <TextContainer>{text}</TextContainer>
      </StyledLink>
    </Card>
  );
}

export default PaginationCard;
