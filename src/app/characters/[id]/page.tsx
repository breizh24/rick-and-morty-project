import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { graphQlRequest } from '@/utils/useGraphQL';
import { characterByIdQuery, characterByIdKey } from '@/utils/queries';
import parsePageParam from '@/utils/parsePageParam';
import { redirect } from 'next/navigation';
import { type Query } from '@/gql/graphql';
import Character from './character';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const data = await graphQlRequest(characterByIdQuery, { id });
  const characterName = data.character?.name || 'Character';

  return {
    title: characterName,
    description: `${characterName} profile`,
  };
}

export default async function CharacterPage({ params }: Props) {
  const characterId = parsePageParam(params.id);

  // in case the id param is not valid or not provided, redirect to the first page
  if (!characterId) {
    redirect('/?page=1');
  }

  const stringId = characterId.toString();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(characterByIdKey(stringId), () =>
    graphQlRequest(characterByIdQuery, { id: stringId })
  );
  const data = queryClient.getQueryData<Pick<Query, 'character'>>(
    characterByIdKey(stringId)
  );

  // when there is no data in the response, redirect to home
  if (!data?.character) {
    redirect(`/?page=1`);
  }

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{<Character />}</Hydrate>;
}
