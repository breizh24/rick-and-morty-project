import { graphql } from '@/gql';

export const CHARACTERS_KEY = 'characters' as const;

export const charactersQuery = graphql(/* GraphQL */ `
  query characters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        prev
        next
      }
      results {
        id
        image
        name
        status
        species
        gender
        type
        origin {
          id
          name
          type
          residents {
            id
          }
        }
        location {
          id
          name
        }
        episode {
          name
        }
      }
    }
  }
`);
