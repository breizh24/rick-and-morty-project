import { graphql } from '@/gql';

export const charactersPaginatedKey = (page: number) =>
  ['characters', { page }] as const;

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

export const characterByIdKey = (id: string) => ['character', { id }] as const;

export const characterByIdQuery = graphql(/* GraphQL */ `
  query character($id: ID!) {
    character(id: $id) {
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
        residents {
          id
        }
      }
      episode {
        id
        name
        air_date
        characters {
          id
          name
        }
      }
    }
  }
`);
