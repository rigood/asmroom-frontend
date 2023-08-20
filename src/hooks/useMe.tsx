import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../__generated__/graphql";

export const ME_QUERY = gql`
  query me {
    me {
      id
      nickname
      email
      role
      verified
      photo
    }
  }
`;

export const useMe = (shouldSkip: boolean) => {
  return useQuery<MeQuery>(ME_QUERY, { skip: shouldSkip });
};
