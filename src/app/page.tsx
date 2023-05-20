import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { graphQlRequest } from '@/utils/useGraphQL';
import { charactersQuery, CHARACTERS_KEY } from '@/utils/queries';
import Characters from './characters';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([CHARACTERS_KEY, { page: 1 }], () =>
    graphQlRequest(charactersQuery, { page: 1 })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Characters />
    </Hydrate>
  );
}
