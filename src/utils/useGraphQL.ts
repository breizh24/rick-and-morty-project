import request from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    async ({ queryKey }) => graphQlRequest(document, queryKey[1])
  );
}

export function graphQlRequest<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables
): Promise<TResult> {
  return request(
    'https://rickandmortyapi.com/graphql',
    document,
    variables ? variables : undefined
  );
}

export default useGraphQL;
