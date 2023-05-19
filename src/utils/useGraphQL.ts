import request from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  console.log((document.definitions[0] as any).name.value);
  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    async ({ queryKey }) =>
      request(
        'https://rickandmortyapi.com/graphql',
        document,
        queryKey[1] ? queryKey[1] : undefined
      )
  );
}

export default useGraphQL;
