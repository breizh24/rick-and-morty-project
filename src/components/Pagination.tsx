import { styled } from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: var(--space-sm);
`;

const PaginationButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius);
  border: 2px solid var(--color-border);
  font-size: var(--font-size-xl);
  font-weight: bold;
  background-color: var(--color-pagination-bg);
  &:hover:not(:disabled) {
    outline: 1px solid var(--color-border);
    cursor: pointer;
  }
  &:focus {
    outline: 1px solid var(--color-border);
  }
`;

const PaginationButtonContainer = styled.div`
  display: flex;
  gap: var(--space-md);
`;

const PaginationText = styled.span`
  font-size: var(--font-size-lg);
  font-weight: bold;
`;

interface Props {
  prev: null | number | undefined;
  next: null | number | undefined;
  page: number | undefined;
  lastPage: number | null | undefined;
  setPage: (page: number) => void;
}

function Pagination({ prev, next, page, lastPage, setPage }: Props) {
  return (
    <PaginationContainer>
      <PaginationText>
        Page {page} of {lastPage}
      </PaginationText>
      <PaginationButtonContainer>
        <PaginationButton
          type="button"
          aria-label="Go to First Page"
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          {'<<'}
        </PaginationButton>
        <PaginationButton
          type="button"
          aria-label="Go to Previous Page"
          disabled={!prev}
          onClick={() => setPage(prev || 1)}
        >
          {'<'}
        </PaginationButton>
        <PaginationButton
          type="button"
          aria-label="Go to Next Page"
          disabled={!next}
          onClick={() => setPage(next || 1)}
        >
          {'>'}
        </PaginationButton>
        <PaginationButton
          type="button"
          aria-label="Go to Last Page"
          disabled={page === lastPage}
          onClick={() => setPage(lastPage || 1)}
        >
          {'>>'}
        </PaginationButton>
      </PaginationButtonContainer>
    </PaginationContainer>
  );
}

export default Pagination;
