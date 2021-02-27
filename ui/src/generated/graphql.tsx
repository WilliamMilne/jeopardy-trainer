export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  clues: Array<Clue>;
  episode: Episode;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Clue = {
  __typename?: 'Clue';
  category: Category;
  clue: Scalars['String'];
  correctResponse: Scalars['String'];
  episode: Episode;
  id: Scalars['Int'];
  point_value: Scalars['Int'];
};

export type Episode = {
  __typename?: 'Episode';
  categories: Array<Category>;
  clues: Array<Clue>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClue: Clue;
  addUser: User;
  submitResponse: Response;
};


export type MutationAddClueArgs = {
  clueInput: NewClueInput;
};


export type MutationAddUserArgs = {
  name: Scalars['String'];
};


export type MutationSubmitResponseArgs = {
  responseInput: NewResponseInput;
};

export type NewCategoryInput = {
  name: Scalars['String'];
};

export type NewClueInput = {
  category: NewCategoryInput;
  clue: Scalars['String'];
  correctResponse: Scalars['String'];
  episode: NewEpisodeInput;
  point_value: Scalars['Int'];
};

export type NewEpisodeInput = {
  jArchiveId: Scalars['String'];
  name: Scalars['String'];
};

export type NewResponseInput = {
  clueId: Scalars['ID'];
  userId: Scalars['ID'];
  user_response: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  clue: Clue;
  episode: Episode;
  response: Response;
  user: User;
};


export type QueryClueArgs = {
  id: Scalars['Float'];
};


export type QueryEpisodeArgs = {
  id: Scalars['Float'];
};


export type QueryResponseArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};

export type Response = {
  __typename?: 'Response';
  clue: Clue;
  id: Scalars['Int'];
  response_correct: Scalars['Boolean'];
  user: User;
  user_response: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  responses: Array<Response>;
};
