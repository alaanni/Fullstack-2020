import { gql  } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title,
    published,
    author {
      name
    }
    genres,
    id
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name,
    born,
    bookCount,
    id
  }
}
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $name: String!,  $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      name: $name,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query {
    me  {
      username
      favoriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
    }
  }
`