import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { graphQlRequest } from '@/utils/useGraphQL';
import { charactersQuery, charactersPaginatedKey } from '@/utils/queries';
import Landing from './landing';
import parsePageParam from '@/utils/parsePageParam';
import { redirect } from 'next/navigation';
import { type Query } from '@/gql/graphql';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const page = parsePageParam(searchParams.page);

  // in case the page param is not provided, redirect to the first page
  if (!page) {
    redirect('/?page=1');
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(charactersPaginatedKey(page), () =>
    graphQlRequest(charactersQuery, { page })
  );
  const data = queryClient.getQueryData<Pick<Query, 'characters'>>(
    charactersPaginatedKey(page)
  );

  // when there is no data in the response, redirect to the first page
  // the api returns an empty array when the page param is greater than the total number of pages
  if (data?.characters?.results?.length === 0) {
    redirect(`/?page=1`);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Landing />
    </Hydrate>
  );
}
