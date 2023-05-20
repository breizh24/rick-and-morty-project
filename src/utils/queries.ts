import { graphql } from '@/gql';

export const CHARACTERS_KEY = 'characters' as const;

export const charactersQuery = graphql(/* GraphQL */ `
  query characters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`);
