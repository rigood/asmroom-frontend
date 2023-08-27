/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query allEpisodes {\n    allEpisodes {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n    }\n  }\n": types.AllEpisodesDocument,
    "\n  query channel($channelInput: ChannelInput!) {\n    channel(input: $channelInput) {\n      ok\n      error\n      channel {\n        id\n        createdAt\n        name\n        category\n        description\n        photo\n        artistId\n      }\n    }\n  }\n": types.ChannelDocument,
    "\n  query episode($episodeInput: EpisodeInput!) {\n    episode(input: $episodeInput) {\n      ok\n      error\n      episode {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n        channel {\n          id\n          name\n          photo\n        }\n      }\n    }\n  }\n": types.EpisodeDocument,
    "\n  query episodes($episodesInput: EpisodesInput!) {\n    episodes(input: $episodesInput) {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n    }\n  }\n": types.EpisodesDocument,
    "\n  query me {\n    me {\n      id\n      nickname\n      email\n      role\n      verified\n      photo\n      channelId\n    }\n  }\n": types.MeDocument,
    "\n  query searchChannels($searchChannelsInput: SearchChannelsInput!) {\n    searchChannels(input: $searchChannelsInput) {\n      ok\n      error\n      channels {\n        id\n        name\n        description\n        photo\n        category\n      }\n      totalCount\n    }\n  }\n": types.SearchChannelsDocument,
    "\n  query searchEpisodes($searchEpisodesInput: SearchEpisodesInput!) {\n    searchEpisodes(input: $searchEpisodesInput) {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n      totalCount\n    }\n  }\n": types.SearchEpisodesDocument,
    "\n  query searchReviews($searchReviewsInput: SearchReviewsInput!) {\n    searchReviews(input: $searchReviewsInput) {\n      ok\n      error\n      reviews {\n        id\n        createdAt\n        text\n        rating\n        episodeId\n        reviewer {\n          nickname\n        }\n      }\n      totalCount\n    }\n  }\n": types.SearchReviewsDocument,
    "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation createReview($createReviewInput: CreateReviewInput!) {\n    createReview(input: $createReviewInput) {\n      ok\n      error\n    }\n  }\n": types.CreateReviewDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  mutation createEpisode($createEpisodeInput: CreateEpisodeInput!) {\n    createEpisode(input: $createEpisodeInput) {\n      ok\n      error\n    }\n  }\n": types.CreateEpisodeDocument,
    "\n  mutation editChannel($editChannelInput: EditChannelInput!) {\n    editChannel(input: $editChannelInput) {\n      ok\n      error\n    }\n  }\n": types.EditChannelDocument,
    "\n  query myChannel {\n    myChannel {\n      ok\n      error\n      channel {\n        name\n        category\n        description\n        photo\n        artistId\n        episodes {\n          id\n          title\n          description\n          youtubeId\n          createdAt\n        }\n      }\n    }\n  }\n": types.MyChannelDocument,
    "\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
    "\n  mutation changeEmail($changeEmailInput: ChangeEmailInput!) {\n    changeEmail(input: $changeEmailInput) {\n      ok\n      error\n    }\n  }\n": types.ChangeEmailDocument,
    "\n  mutation changePassword($changePasswordInput: ChangePasswordInput!) {\n    changePassword(input: $changePasswordInput) {\n      ok\n      error\n    }\n  }\n": types.ChangePasswordDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query allEpisodes {\n    allEpisodes {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query allEpisodes {\n    allEpisodes {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query channel($channelInput: ChannelInput!) {\n    channel(input: $channelInput) {\n      ok\n      error\n      channel {\n        id\n        createdAt\n        name\n        category\n        description\n        photo\n        artistId\n      }\n    }\n  }\n"): (typeof documents)["\n  query channel($channelInput: ChannelInput!) {\n    channel(input: $channelInput) {\n      ok\n      error\n      channel {\n        id\n        createdAt\n        name\n        category\n        description\n        photo\n        artistId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query episode($episodeInput: EpisodeInput!) {\n    episode(input: $episodeInput) {\n      ok\n      error\n      episode {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n        channel {\n          id\n          name\n          photo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query episode($episodeInput: EpisodeInput!) {\n    episode(input: $episodeInput) {\n      ok\n      error\n      episode {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n        channel {\n          id\n          name\n          photo\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query episodes($episodesInput: EpisodesInput!) {\n    episodes(input: $episodesInput) {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query episodes($episodesInput: EpisodesInput!) {\n    episodes(input: $episodesInput) {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query me {\n    me {\n      id\n      nickname\n      email\n      role\n      verified\n      photo\n      channelId\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      nickname\n      email\n      role\n      verified\n      photo\n      channelId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query searchChannels($searchChannelsInput: SearchChannelsInput!) {\n    searchChannels(input: $searchChannelsInput) {\n      ok\n      error\n      channels {\n        id\n        name\n        description\n        photo\n        category\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query searchChannels($searchChannelsInput: SearchChannelsInput!) {\n    searchChannels(input: $searchChannelsInput) {\n      ok\n      error\n      channels {\n        id\n        name\n        description\n        photo\n        category\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query searchEpisodes($searchEpisodesInput: SearchEpisodesInput!) {\n    searchEpisodes(input: $searchEpisodesInput) {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query searchEpisodes($searchEpisodesInput: SearchEpisodesInput!) {\n    searchEpisodes(input: $searchEpisodesInput) {\n      ok\n      error\n      episodes {\n        id\n        title\n        description\n        youtubeId\n        createdAt\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query searchReviews($searchReviewsInput: SearchReviewsInput!) {\n    searchReviews(input: $searchReviewsInput) {\n      ok\n      error\n      reviews {\n        id\n        createdAt\n        text\n        rating\n        episodeId\n        reviewer {\n          nickname\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query searchReviews($searchReviewsInput: SearchReviewsInput!) {\n    searchReviews(input: $searchReviewsInput) {\n      ok\n      error\n      reviews {\n        id\n        createdAt\n        text\n        rating\n        episodeId\n        reviewer {\n          nickname\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createReview($createReviewInput: CreateReviewInput!) {\n    createReview(input: $createReviewInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createReview($createReviewInput: CreateReviewInput!) {\n    createReview(input: $createReviewInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createEpisode($createEpisodeInput: CreateEpisodeInput!) {\n    createEpisode(input: $createEpisodeInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createEpisode($createEpisodeInput: CreateEpisodeInput!) {\n    createEpisode(input: $createEpisodeInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation editChannel($editChannelInput: EditChannelInput!) {\n    editChannel(input: $editChannelInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editChannel($editChannelInput: EditChannelInput!) {\n    editChannel(input: $editChannelInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query myChannel {\n    myChannel {\n      ok\n      error\n      channel {\n        name\n        category\n        description\n        photo\n        artistId\n        episodes {\n          id\n          title\n          description\n          youtubeId\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query myChannel {\n    myChannel {\n      ok\n      error\n      channel {\n        name\n        category\n        description\n        photo\n        artistId\n        episodes {\n          id\n          title\n          description\n          youtubeId\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation changeEmail($changeEmailInput: ChangeEmailInput!) {\n    changeEmail(input: $changeEmailInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation changeEmail($changeEmailInput: ChangeEmailInput!) {\n    changeEmail(input: $changeEmailInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation changePassword($changePasswordInput: ChangePasswordInput!) {\n    changePassword(input: $changePasswordInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation changePassword($changePasswordInput: ChangePasswordInput!) {\n    changePassword(input: $changePasswordInput) {\n      ok\n      error\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;