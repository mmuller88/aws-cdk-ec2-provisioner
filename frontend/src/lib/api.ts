import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from "react-query";
import { amplifyFetcher } from "../lib/fetcher";
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: any;
  AWSDateTime: any;
  AWSEmail: any;
  AWSIPAddress: any;
  AWSJSON: any;
  AWSPhone: any;
  AWSTime: any;
  AWSTimestamp: any;
  AWSURL: any;
  BigInt: any;
  Double: any;
};

export type CreateEc2ConfigInput = {
  id?: Maybe<Scalars["ID"]>;
  startDate: Scalars["AWSDateTime"];
  stopDate: Scalars["AWSDateTime"];
  username: Scalars["String"];
};

export type CreateHistoryEntryInput = {
  id?: Maybe<Scalars["ID"]>;
  ec2ConfigId: Scalars["ID"];
  comment: Scalars["String"];
  time: Scalars["AWSDateTime"];
};

export type CreateMessageInput = {
  id?: Maybe<Scalars["ID"]>;
  authorId: Scalars["String"];
  content: Scalars["String"];
  createdAt?: Maybe<Scalars["AWSDateTime"]>;
  updatedAt?: Maybe<Scalars["AWSDateTime"]>;
};

export type CreatePostInput = {
  id?: Maybe<Scalars["ID"]>;
  title: Scalars["String"];
  content: Scalars["String"];
  username: Scalars["String"];
};

export type DeleteEc2ConfigInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type DeleteHistoryEntryInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type DeleteMessageInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type DeletePostInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type Ec2 = {
  __typename?: "Ec2";
  id: Scalars["ID"];
  name: Scalars["String"];
  state: State;
};

export type Ec2Config = {
  __typename?: "Ec2Config";
  id: Scalars["ID"];
  startDate: Scalars["AWSDateTime"];
  stopDate: Scalars["AWSDateTime"];
  username: Scalars["String"];
  history?: Maybe<ModelHistoryEntryConnection>;
  createdAt: Scalars["AWSDateTime"];
  updatedAt: Scalars["AWSDateTime"];
  owner?: Maybe<Scalars["String"]>;
};

export type Ec2ConfigHistoryArgs = {
  comment?: Maybe<ModelStringKeyConditionInput>;
  filter?: Maybe<ModelHistoryEntryFilterInput>;
  sortDirection?: Maybe<ModelSortDirection>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type HistoryEntry = {
  __typename?: "HistoryEntry";
  id: Scalars["ID"];
  ec2ConfigId: Scalars["ID"];
  comment: Scalars["String"];
  time: Scalars["AWSDateTime"];
  createdAt: Scalars["AWSDateTime"];
  updatedAt: Scalars["AWSDateTime"];
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  authorId: Scalars["String"];
  content: Scalars["String"];
  createdAt: Scalars["AWSDateTime"];
  updatedAt: Scalars["AWSDateTime"];
  owner?: Maybe<Scalars["String"]>;
};

export type ModelBooleanFilterInput = {
  ne?: Maybe<Scalars["Boolean"]>;
  eq?: Maybe<Scalars["Boolean"]>;
};

export type ModelEc2ConfigConnection = {
  __typename?: "ModelEc2ConfigConnection";
  items?: Maybe<Array<Maybe<Ec2Config>>>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type ModelEc2ConfigFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  startDate?: Maybe<ModelStringFilterInput>;
  stopDate?: Maybe<ModelStringFilterInput>;
  username?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelEc2ConfigFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelEc2ConfigFilterInput>>>;
  not?: Maybe<ModelEc2ConfigFilterInput>;
};

export type ModelFloatFilterInput = {
  ne?: Maybe<Scalars["Float"]>;
  eq?: Maybe<Scalars["Float"]>;
  le?: Maybe<Scalars["Float"]>;
  lt?: Maybe<Scalars["Float"]>;
  ge?: Maybe<Scalars["Float"]>;
  gt?: Maybe<Scalars["Float"]>;
  between?: Maybe<Array<Maybe<Scalars["Float"]>>>;
};

export type ModelHistoryEntryConnection = {
  __typename?: "ModelHistoryEntryConnection";
  items?: Maybe<Array<Maybe<HistoryEntry>>>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type ModelHistoryEntryFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  ec2ConfigId?: Maybe<ModelIdFilterInput>;
  comment?: Maybe<ModelStringFilterInput>;
  time?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelHistoryEntryFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelHistoryEntryFilterInput>>>;
  not?: Maybe<ModelHistoryEntryFilterInput>;
};

export type ModelIdFilterInput = {
  ne?: Maybe<Scalars["ID"]>;
  eq?: Maybe<Scalars["ID"]>;
  le?: Maybe<Scalars["ID"]>;
  lt?: Maybe<Scalars["ID"]>;
  ge?: Maybe<Scalars["ID"]>;
  gt?: Maybe<Scalars["ID"]>;
  contains?: Maybe<Scalars["ID"]>;
  notContains?: Maybe<Scalars["ID"]>;
  between?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  beginsWith?: Maybe<Scalars["ID"]>;
};

export type ModelIntFilterInput = {
  ne?: Maybe<Scalars["Int"]>;
  eq?: Maybe<Scalars["Int"]>;
  le?: Maybe<Scalars["Int"]>;
  lt?: Maybe<Scalars["Int"]>;
  ge?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  between?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type ModelMessageConnection = {
  __typename?: "ModelMessageConnection";
  items?: Maybe<Array<Maybe<Message>>>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type ModelMessageFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  authorId?: Maybe<ModelStringFilterInput>;
  content?: Maybe<ModelStringFilterInput>;
  createdAt?: Maybe<ModelStringFilterInput>;
  updatedAt?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelMessageFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelMessageFilterInput>>>;
  not?: Maybe<ModelMessageFilterInput>;
};

export type ModelPostConnection = {
  __typename?: "ModelPostConnection";
  items?: Maybe<Array<Maybe<Post>>>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type ModelPostFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  title?: Maybe<ModelStringFilterInput>;
  content?: Maybe<ModelStringFilterInput>;
  username?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelPostFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelPostFilterInput>>>;
  not?: Maybe<ModelPostFilterInput>;
};

export enum ModelSortDirection {
  Asc = "ASC",
  Desc = "DESC"
}

export type ModelStringFilterInput = {
  ne?: Maybe<Scalars["String"]>;
  eq?: Maybe<Scalars["String"]>;
  le?: Maybe<Scalars["String"]>;
  lt?: Maybe<Scalars["String"]>;
  ge?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  notContains?: Maybe<Scalars["String"]>;
  between?: Maybe<Array<Maybe<Scalars["String"]>>>;
  beginsWith?: Maybe<Scalars["String"]>;
};

export type ModelStringKeyConditionInput = {
  eq?: Maybe<Scalars["String"]>;
  le?: Maybe<Scalars["String"]>;
  lt?: Maybe<Scalars["String"]>;
  ge?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  between?: Maybe<Array<Maybe<Scalars["String"]>>>;
  beginsWith?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createHistoryEntry?: Maybe<HistoryEntry>;
  updateHistoryEntry?: Maybe<HistoryEntry>;
  deleteHistoryEntry?: Maybe<HistoryEntry>;
  createEc2Config?: Maybe<Ec2Config>;
  updateEc2Config?: Maybe<Ec2Config>;
  deleteEc2Config?: Maybe<Ec2Config>;
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  createMessage?: Maybe<Message>;
  updateMessage?: Maybe<Message>;
  deleteMessage?: Maybe<Message>;
};

export type MutationCreateHistoryEntryArgs = {
  input: CreateHistoryEntryInput;
};

export type MutationUpdateHistoryEntryArgs = {
  input: UpdateHistoryEntryInput;
};

export type MutationDeleteHistoryEntryArgs = {
  input: DeleteHistoryEntryInput;
};

export type MutationCreateEc2ConfigArgs = {
  input: CreateEc2ConfigInput;
};

export type MutationUpdateEc2ConfigArgs = {
  input: UpdateEc2ConfigInput;
};

export type MutationDeleteEc2ConfigArgs = {
  input: DeleteEc2ConfigInput;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type MutationDeletePostArgs = {
  input: DeletePostInput;
};

export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};

export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};

export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  title: Scalars["String"];
  content: Scalars["String"];
  username: Scalars["String"];
  createdAt: Scalars["AWSDateTime"];
  updatedAt: Scalars["AWSDateTime"];
  owner?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  listTodos?: Maybe<Array<Maybe<Todo>>>;
  listEc2?: Maybe<Array<Maybe<Ec2>>>;
  getHistoryEntry?: Maybe<HistoryEntry>;
  listHistoryEntrys?: Maybe<ModelHistoryEntryConnection>;
  getEc2Config?: Maybe<Ec2Config>;
  listEc2Configs?: Maybe<ModelEc2ConfigConnection>;
  getPost?: Maybe<Post>;
  listPosts?: Maybe<ModelPostConnection>;
  getMessage?: Maybe<Message>;
  listMessages?: Maybe<ModelMessageConnection>;
  getTodo?: Maybe<Todo>;
};

export type QueryGetHistoryEntryArgs = {
  id: Scalars["ID"];
};

export type QueryListHistoryEntrysArgs = {
  filter?: Maybe<ModelHistoryEntryFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type QueryGetEc2ConfigArgs = {
  id: Scalars["ID"];
};

export type QueryListEc2ConfigsArgs = {
  filter?: Maybe<ModelEc2ConfigFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type QueryGetPostArgs = {
  id: Scalars["ID"];
};

export type QueryListPostsArgs = {
  filter?: Maybe<ModelPostFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type QueryGetMessageArgs = {
  id: Scalars["ID"];
};

export type QueryListMessagesArgs = {
  filter?: Maybe<ModelMessageFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type QueryGetTodoArgs = {
  params: QueryGetTodoParamsInput;
};

export type QueryGetTodoParamsInput = {
  id: Scalars["String"];
};

export enum State {
  Pending = "PENDING",
  Running = "RUNNING",
  Terminated = "TERMINATED",
  Stopping = "STOPPING",
  Stopped = "STOPPED",
  Unkown = "UNKOWN"
}

export type Subscription = {
  __typename?: "Subscription";
  onCreateHistoryEntry?: Maybe<HistoryEntry>;
  onUpdateHistoryEntry?: Maybe<HistoryEntry>;
  onDeleteHistoryEntry?: Maybe<HistoryEntry>;
  onCreateEc2Config?: Maybe<Ec2Config>;
  onUpdateEc2Config?: Maybe<Ec2Config>;
  onDeleteEc2Config?: Maybe<Ec2Config>;
  onCreatePost?: Maybe<Post>;
  onUpdatePost?: Maybe<Post>;
  onDeletePost?: Maybe<Post>;
  onCreateMessage?: Maybe<Message>;
  onUpdateMessage?: Maybe<Message>;
  onDeleteMessage?: Maybe<Message>;
};

export type SubscriptionOnCreateEc2ConfigArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnUpdateEc2ConfigArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnDeleteEc2ConfigArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnCreatePostArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnUpdatePostArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnDeletePostArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  title: Scalars["String"];
  completed: Scalars["Boolean"];
};

export type UpdateEc2ConfigInput = {
  id: Scalars["ID"];
  startDate?: Maybe<Scalars["AWSDateTime"]>;
  stopDate?: Maybe<Scalars["AWSDateTime"]>;
  username?: Maybe<Scalars["String"]>;
};

export type UpdateHistoryEntryInput = {
  id: Scalars["ID"];
  ec2ConfigId?: Maybe<Scalars["ID"]>;
  comment?: Maybe<Scalars["String"]>;
  time?: Maybe<Scalars["AWSDateTime"]>;
};

export type UpdateMessageInput = {
  id: Scalars["ID"];
  authorId?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["AWSDateTime"]>;
  updatedAt?: Maybe<Scalars["AWSDateTime"]>;
};

export type UpdatePostInput = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type CreateHistoryEntryMutationVariables = Exact<{
  input: CreateHistoryEntryInput;
}>;

export type CreateHistoryEntryMutation = { __typename?: "Mutation" } & {
  createHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type UpdateHistoryEntryMutationVariables = Exact<{
  input: UpdateHistoryEntryInput;
}>;

export type UpdateHistoryEntryMutation = { __typename?: "Mutation" } & {
  updateHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type DeleteHistoryEntryMutationVariables = Exact<{
  input: DeleteHistoryEntryInput;
}>;

export type DeleteHistoryEntryMutation = { __typename?: "Mutation" } & {
  deleteHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type CreateEc2ConfigMutationVariables = Exact<{
  input: CreateEc2ConfigInput;
}>;

export type CreateEc2ConfigMutation = { __typename?: "Mutation" } & {
  createEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type UpdateEc2ConfigMutationVariables = Exact<{
  input: UpdateEc2ConfigInput;
}>;

export type UpdateEc2ConfigMutation = { __typename?: "Mutation" } & {
  updateEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type DeleteEc2ConfigMutationVariables = Exact<{
  input: DeleteEc2ConfigInput;
}>;

export type DeleteEc2ConfigMutation = { __typename?: "Mutation" } & {
  deleteEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;

export type UpdatePostMutation = { __typename?: "Mutation" } & {
  updatePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;

export type DeletePostMutation = { __typename?: "Mutation" } & {
  deletePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;

export type CreateMessageMutation = { __typename?: "Mutation" } & {
  createMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export type UpdateMessageMutationVariables = Exact<{
  input: UpdateMessageInput;
}>;

export type UpdateMessageMutation = { __typename?: "Mutation" } & {
  updateMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export type DeleteMessageMutationVariables = Exact<{
  input: DeleteMessageInput;
}>;

export type DeleteMessageMutation = { __typename?: "Mutation" } & {
  deleteMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export type ListTodosQueryVariables = Exact<{ [key: string]: never }>;

export type ListTodosQuery = { __typename?: "Query" } & {
  listTodos?: Maybe<
    Array<
      Maybe<
        { __typename?: "Todo" } & Pick<
          Todo,
          "id" | "userId" | "title" | "completed"
        >
      >
    >
  >;
};

export type ListEc2QueryVariables = Exact<{ [key: string]: never }>;

export type ListEc2Query = { __typename?: "Query" } & {
  listEc2?: Maybe<
    Array<Maybe<{ __typename?: "Ec2" } & Pick<Ec2, "id" | "name" | "state">>>
  >;
};

export type GetHistoryEntryQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetHistoryEntryQuery = { __typename?: "Query" } & {
  getHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type ListHistoryEntrysQueryVariables = Exact<{
  filter?: Maybe<ModelHistoryEntryFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
}>;

export type ListHistoryEntrysQuery = { __typename?: "Query" } & {
  listHistoryEntrys?: Maybe<
    { __typename?: "ModelHistoryEntryConnection" } & Pick<
      ModelHistoryEntryConnection,
      "nextToken"
    > & {
        items?: Maybe<
          Array<
            Maybe<
              { __typename?: "HistoryEntry" } & Pick<
                HistoryEntry,
                | "id"
                | "ec2ConfigId"
                | "comment"
                | "time"
                | "createdAt"
                | "updatedAt"
              >
            >
          >
        >;
      }
  >;
};

export type GetEc2ConfigQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetEc2ConfigQuery = { __typename?: "Query" } & {
  getEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type ListEc2ConfigsQueryVariables = Exact<{
  filter?: Maybe<ModelEc2ConfigFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
}>;

export type ListEc2ConfigsQuery = { __typename?: "Query" } & {
  listEc2Configs?: Maybe<
    { __typename?: "ModelEc2ConfigConnection" } & Pick<
      ModelEc2ConfigConnection,
      "nextToken"
    > & {
        items?: Maybe<
          Array<
            Maybe<
              { __typename?: "Ec2Config" } & Pick<
                Ec2Config,
                | "id"
                | "startDate"
                | "stopDate"
                | "username"
                | "createdAt"
                | "updatedAt"
                | "owner"
              > & {
                  history?: Maybe<
                    { __typename?: "ModelHistoryEntryConnection" } & Pick<
                      ModelHistoryEntryConnection,
                      "nextToken"
                    > & {
                        items?: Maybe<
                          Array<
                            Maybe<
                              { __typename?: "HistoryEntry" } & Pick<
                                HistoryEntry,
                                | "id"
                                | "ec2ConfigId"
                                | "comment"
                                | "time"
                                | "createdAt"
                                | "updatedAt"
                              >
                            >
                          >
                        >;
                      }
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetPostQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetPostQuery = { __typename?: "Query" } & {
  getPost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type ListPostsQueryVariables = Exact<{
  filter?: Maybe<ModelPostFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
}>;

export type ListPostsQuery = { __typename?: "Query" } & {
  listPosts?: Maybe<
    { __typename?: "ModelPostConnection" } & Pick<
      ModelPostConnection,
      "nextToken"
    > & {
        items?: Maybe<
          Array<
            Maybe<
              { __typename?: "Post" } & Pick<
                Post,
                | "id"
                | "title"
                | "content"
                | "username"
                | "createdAt"
                | "updatedAt"
                | "owner"
              >
            >
          >
        >;
      }
  >;
};

export type GetMessageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetMessageQuery = { __typename?: "Query" } & {
  getMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export type ListMessagesQueryVariables = Exact<{
  filter?: Maybe<ModelMessageFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
}>;

export type ListMessagesQuery = { __typename?: "Query" } & {
  listMessages?: Maybe<
    { __typename?: "ModelMessageConnection" } & Pick<
      ModelMessageConnection,
      "nextToken"
    > & {
        items?: Maybe<
          Array<
            Maybe<
              { __typename?: "Message" } & Pick<
                Message,
                | "id"
                | "authorId"
                | "content"
                | "createdAt"
                | "updatedAt"
                | "owner"
              >
            >
          >
        >;
      }
  >;
};

export type GetTodoQueryVariables = Exact<{
  params: QueryGetTodoParamsInput;
}>;

export type GetTodoQuery = { __typename?: "Query" } & {
  getTodo?: Maybe<
    { __typename?: "Todo" } & Pick<
      Todo,
      "id" | "userId" | "title" | "completed"
    >
  >;
};

export type OnCreateHistoryEntrySubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnCreateHistoryEntrySubscription = {
  __typename?: "Subscription";
} & {
  onCreateHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type OnUpdateHistoryEntrySubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnUpdateHistoryEntrySubscription = {
  __typename?: "Subscription";
} & {
  onUpdateHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type OnDeleteHistoryEntrySubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnDeleteHistoryEntrySubscription = {
  __typename?: "Subscription";
} & {
  onDeleteHistoryEntry?: Maybe<
    { __typename?: "HistoryEntry" } & Pick<
      HistoryEntry,
      "id" | "ec2ConfigId" | "comment" | "time" | "createdAt" | "updatedAt"
    >
  >;
};

export type OnCreateEc2ConfigSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnCreateEc2ConfigSubscription = { __typename?: "Subscription" } & {
  onCreateEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type OnUpdateEc2ConfigSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnUpdateEc2ConfigSubscription = { __typename?: "Subscription" } & {
  onUpdateEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type OnDeleteEc2ConfigSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnDeleteEc2ConfigSubscription = { __typename?: "Subscription" } & {
  onDeleteEc2Config?: Maybe<
    { __typename?: "Ec2Config" } & Pick<
      Ec2Config,
      | "id"
      | "startDate"
      | "stopDate"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    > & {
        history?: Maybe<
          { __typename?: "ModelHistoryEntryConnection" } & Pick<
            ModelHistoryEntryConnection,
            "nextToken"
          > & {
              items?: Maybe<
                Array<
                  Maybe<
                    { __typename?: "HistoryEntry" } & Pick<
                      HistoryEntry,
                      | "id"
                      | "ec2ConfigId"
                      | "comment"
                      | "time"
                      | "createdAt"
                      | "updatedAt"
                    >
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type OnCreatePostSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnCreatePostSubscription = { __typename?: "Subscription" } & {
  onCreatePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type OnUpdatePostSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnUpdatePostSubscription = { __typename?: "Subscription" } & {
  onUpdatePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type OnDeletePostSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnDeletePostSubscription = { __typename?: "Subscription" } & {
  onDeletePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type OnCreateMessageSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnCreateMessageSubscription = { __typename?: "Subscription" } & {
  onCreateMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export type OnUpdateMessageSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnUpdateMessageSubscription = { __typename?: "Subscription" } & {
  onUpdateMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export type OnDeleteMessageSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnDeleteMessageSubscription = { __typename?: "Subscription" } & {
  onDeleteMessage?: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "authorId" | "content" | "createdAt" | "updatedAt" | "owner"
    >
  >;
};

export const CreateHistoryEntryDocument = `
    mutation CreateHistoryEntry($input: CreateHistoryEntryInput!) {
  createHistoryEntry(input: $input) {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const useCreateHistoryEntryMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CreateHistoryEntryMutation,
    TError,
    CreateHistoryEntryMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateHistoryEntryMutation,
    TError,
    CreateHistoryEntryMutationVariables,
    TContext
  >(
    (variables?: CreateHistoryEntryMutationVariables) =>
      amplifyFetcher<
        CreateHistoryEntryMutation,
        CreateHistoryEntryMutationVariables
      >(CreateHistoryEntryDocument, variables)(),
    options
  );
export const UpdateHistoryEntryDocument = `
    mutation UpdateHistoryEntry($input: UpdateHistoryEntryInput!) {
  updateHistoryEntry(input: $input) {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const useUpdateHistoryEntryMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    UpdateHistoryEntryMutation,
    TError,
    UpdateHistoryEntryMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateHistoryEntryMutation,
    TError,
    UpdateHistoryEntryMutationVariables,
    TContext
  >(
    (variables?: UpdateHistoryEntryMutationVariables) =>
      amplifyFetcher<
        UpdateHistoryEntryMutation,
        UpdateHistoryEntryMutationVariables
      >(UpdateHistoryEntryDocument, variables)(),
    options
  );
export const DeleteHistoryEntryDocument = `
    mutation DeleteHistoryEntry($input: DeleteHistoryEntryInput!) {
  deleteHistoryEntry(input: $input) {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const useDeleteHistoryEntryMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    DeleteHistoryEntryMutation,
    TError,
    DeleteHistoryEntryMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteHistoryEntryMutation,
    TError,
    DeleteHistoryEntryMutationVariables,
    TContext
  >(
    (variables?: DeleteHistoryEntryMutationVariables) =>
      amplifyFetcher<
        DeleteHistoryEntryMutation,
        DeleteHistoryEntryMutationVariables
      >(DeleteHistoryEntryDocument, variables)(),
    options
  );
export const CreateEc2ConfigDocument = `
    mutation CreateEc2Config($input: CreateEc2ConfigInput!) {
  createEc2Config(input: $input) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useCreateEc2ConfigMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CreateEc2ConfigMutation,
    TError,
    CreateEc2ConfigMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateEc2ConfigMutation,
    TError,
    CreateEc2ConfigMutationVariables,
    TContext
  >(
    (variables?: CreateEc2ConfigMutationVariables) =>
      amplifyFetcher<CreateEc2ConfigMutation, CreateEc2ConfigMutationVariables>(
        CreateEc2ConfigDocument,
        variables
      )(),
    options
  );
export const UpdateEc2ConfigDocument = `
    mutation UpdateEc2Config($input: UpdateEc2ConfigInput!) {
  updateEc2Config(input: $input) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useUpdateEc2ConfigMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    UpdateEc2ConfigMutation,
    TError,
    UpdateEc2ConfigMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateEc2ConfigMutation,
    TError,
    UpdateEc2ConfigMutationVariables,
    TContext
  >(
    (variables?: UpdateEc2ConfigMutationVariables) =>
      amplifyFetcher<UpdateEc2ConfigMutation, UpdateEc2ConfigMutationVariables>(
        UpdateEc2ConfigDocument,
        variables
      )(),
    options
  );
export const DeleteEc2ConfigDocument = `
    mutation DeleteEc2Config($input: DeleteEc2ConfigInput!) {
  deleteEc2Config(input: $input) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useDeleteEc2ConfigMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    DeleteEc2ConfigMutation,
    TError,
    DeleteEc2ConfigMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteEc2ConfigMutation,
    TError,
    DeleteEc2ConfigMutationVariables,
    TContext
  >(
    (variables?: DeleteEc2ConfigMutationVariables) =>
      amplifyFetcher<DeleteEc2ConfigMutation, DeleteEc2ConfigMutationVariables>(
        DeleteEc2ConfigDocument,
        variables
      )(),
    options
  );
export const CreatePostDocument = `
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useCreatePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >(
    (variables?: CreatePostMutationVariables) =>
      amplifyFetcher<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        variables
      )(),
    options
  );
export const UpdatePostDocument = `
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useUpdatePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdatePostMutation,
    TError,
    UpdatePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdatePostMutation,
    TError,
    UpdatePostMutationVariables,
    TContext
  >(
    (variables?: UpdatePostMutationVariables) =>
      amplifyFetcher<UpdatePostMutation, UpdatePostMutationVariables>(
        UpdatePostDocument,
        variables
      )(),
    options
  );
export const DeletePostDocument = `
    mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useDeletePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >(
    (variables?: DeletePostMutationVariables) =>
      amplifyFetcher<DeletePostMutation, DeletePostMutationVariables>(
        DeletePostDocument,
        variables
      )(),
    options
  );
export const CreateMessageDocument = `
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useCreateMessageMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateMessageMutation,
    TError,
    CreateMessageMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateMessageMutation,
    TError,
    CreateMessageMutationVariables,
    TContext
  >(
    (variables?: CreateMessageMutationVariables) =>
      amplifyFetcher<CreateMessageMutation, CreateMessageMutationVariables>(
        CreateMessageDocument,
        variables
      )(),
    options
  );
export const UpdateMessageDocument = `
    mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useUpdateMessageMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateMessageMutation,
    TError,
    UpdateMessageMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateMessageMutation,
    TError,
    UpdateMessageMutationVariables,
    TContext
  >(
    (variables?: UpdateMessageMutationVariables) =>
      amplifyFetcher<UpdateMessageMutation, UpdateMessageMutationVariables>(
        UpdateMessageDocument,
        variables
      )(),
    options
  );
export const DeleteMessageDocument = `
    mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useDeleteMessageMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteMessageMutation,
    TError,
    DeleteMessageMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteMessageMutation,
    TError,
    DeleteMessageMutationVariables,
    TContext
  >(
    (variables?: DeleteMessageMutationVariables) =>
      amplifyFetcher<DeleteMessageMutation, DeleteMessageMutationVariables>(
        DeleteMessageDocument,
        variables
      )(),
    options
  );
export const ListTodosDocument = `
    query ListTodos {
  listTodos {
    id
    userId
    title
    completed
  }
}
    `;
export const useListTodosQuery = <TData = ListTodosQuery, TError = unknown>(
  variables?: ListTodosQueryVariables,
  options?: UseQueryOptions<ListTodosQuery, TError, TData>
) =>
  useQuery<ListTodosQuery, TError, TData>(
    ["ListTodos", variables],
    amplifyFetcher<ListTodosQuery, ListTodosQueryVariables>(
      ListTodosDocument,
      variables
    ),
    options
  );
export const ListEc2Document = `
    query ListEc2 {
  listEc2 {
    id
    name
    state
  }
}
    `;
export const useListEc2Query = <TData = ListEc2Query, TError = unknown>(
  variables?: ListEc2QueryVariables,
  options?: UseQueryOptions<ListEc2Query, TError, TData>
) =>
  useQuery<ListEc2Query, TError, TData>(
    ["ListEc2", variables],
    amplifyFetcher<ListEc2Query, ListEc2QueryVariables>(
      ListEc2Document,
      variables
    ),
    options
  );
export const GetHistoryEntryDocument = `
    query GetHistoryEntry($id: ID!) {
  getHistoryEntry(id: $id) {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const useGetHistoryEntryQuery = <
  TData = GetHistoryEntryQuery,
  TError = unknown
>(
  variables: GetHistoryEntryQueryVariables,
  options?: UseQueryOptions<GetHistoryEntryQuery, TError, TData>
) =>
  useQuery<GetHistoryEntryQuery, TError, TData>(
    ["GetHistoryEntry", variables],
    amplifyFetcher<GetHistoryEntryQuery, GetHistoryEntryQueryVariables>(
      GetHistoryEntryDocument,
      variables
    ),
    options
  );
export const ListHistoryEntrysDocument = `
    query ListHistoryEntrys($filter: ModelHistoryEntryFilterInput, $limit: Int, $nextToken: String) {
  listHistoryEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
    nextToken
  }
}
    `;
export const useListHistoryEntrysQuery = <
  TData = ListHistoryEntrysQuery,
  TError = unknown
>(
  variables?: ListHistoryEntrysQueryVariables,
  options?: UseQueryOptions<ListHistoryEntrysQuery, TError, TData>
) =>
  useQuery<ListHistoryEntrysQuery, TError, TData>(
    ["ListHistoryEntrys", variables],
    amplifyFetcher<ListHistoryEntrysQuery, ListHistoryEntrysQueryVariables>(
      ListHistoryEntrysDocument,
      variables
    ),
    options
  );
export const GetEc2ConfigDocument = `
    query GetEc2Config($id: ID!) {
  getEc2Config(id: $id) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useGetEc2ConfigQuery = <
  TData = GetEc2ConfigQuery,
  TError = unknown
>(
  variables: GetEc2ConfigQueryVariables,
  options?: UseQueryOptions<GetEc2ConfigQuery, TError, TData>
) =>
  useQuery<GetEc2ConfigQuery, TError, TData>(
    ["GetEc2Config", variables],
    amplifyFetcher<GetEc2ConfigQuery, GetEc2ConfigQueryVariables>(
      GetEc2ConfigDocument,
      variables
    ),
    options
  );
export const ListEc2ConfigsDocument = `
    query ListEc2Configs($filter: ModelEc2ConfigFilterInput, $limit: Int, $nextToken: String) {
  listEc2Configs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      startDate
      stopDate
      username
      history {
        items {
          id
          ec2ConfigId
          comment
          time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
    nextToken
  }
}
    `;
export const useListEc2ConfigsQuery = <
  TData = ListEc2ConfigsQuery,
  TError = unknown
>(
  variables?: ListEc2ConfigsQueryVariables,
  options?: UseQueryOptions<ListEc2ConfigsQuery, TError, TData>
) =>
  useQuery<ListEc2ConfigsQuery, TError, TData>(
    ["ListEc2Configs", variables],
    amplifyFetcher<ListEc2ConfigsQuery, ListEc2ConfigsQueryVariables>(
      ListEc2ConfigsDocument,
      variables
    ),
    options
  );
export const GetPostDocument = `
    query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useGetPostQuery = <TData = GetPostQuery, TError = unknown>(
  variables: GetPostQueryVariables,
  options?: UseQueryOptions<GetPostQuery, TError, TData>
) =>
  useQuery<GetPostQuery, TError, TData>(
    ["GetPost", variables],
    amplifyFetcher<GetPostQuery, GetPostQueryVariables>(
      GetPostDocument,
      variables
    ),
    options
  );
export const ListPostsDocument = `
    query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      content
      username
      createdAt
      updatedAt
      owner
    }
    nextToken
  }
}
    `;
export const useListPostsQuery = <TData = ListPostsQuery, TError = unknown>(
  variables?: ListPostsQueryVariables,
  options?: UseQueryOptions<ListPostsQuery, TError, TData>
) =>
  useQuery<ListPostsQuery, TError, TData>(
    ["ListPosts", variables],
    amplifyFetcher<ListPostsQuery, ListPostsQueryVariables>(
      ListPostsDocument,
      variables
    ),
    options
  );
export const GetMessageDocument = `
    query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
export const useGetMessageQuery = <TData = GetMessageQuery, TError = unknown>(
  variables: GetMessageQueryVariables,
  options?: UseQueryOptions<GetMessageQuery, TError, TData>
) =>
  useQuery<GetMessageQuery, TError, TData>(
    ["GetMessage", variables],
    amplifyFetcher<GetMessageQuery, GetMessageQueryVariables>(
      GetMessageDocument,
      variables
    ),
    options
  );
export const ListMessagesDocument = `
    query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
    nextToken
  }
}
    `;
export const useListMessagesQuery = <
  TData = ListMessagesQuery,
  TError = unknown
>(
  variables?: ListMessagesQueryVariables,
  options?: UseQueryOptions<ListMessagesQuery, TError, TData>
) =>
  useQuery<ListMessagesQuery, TError, TData>(
    ["ListMessages", variables],
    amplifyFetcher<ListMessagesQuery, ListMessagesQueryVariables>(
      ListMessagesDocument,
      variables
    ),
    options
  );
export const GetTodoDocument = `
    query GetTodo($params: QueryGetTodoParamsInput!) {
  getTodo(params: $params) {
    id
    userId
    title
    completed
  }
}
    `;
export const useGetTodoQuery = <TData = GetTodoQuery, TError = unknown>(
  variables: GetTodoQueryVariables,
  options?: UseQueryOptions<GetTodoQuery, TError, TData>
) =>
  useQuery<GetTodoQuery, TError, TData>(
    ["GetTodo", variables],
    amplifyFetcher<GetTodoQuery, GetTodoQueryVariables>(
      GetTodoDocument,
      variables
    ),
    options
  );
export const OnCreateHistoryEntryDocument = `
    subscription OnCreateHistoryEntry {
  onCreateHistoryEntry {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const OnUpdateHistoryEntryDocument = `
    subscription OnUpdateHistoryEntry {
  onUpdateHistoryEntry {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const OnDeleteHistoryEntryDocument = `
    subscription OnDeleteHistoryEntry {
  onDeleteHistoryEntry {
    id
    ec2ConfigId
    comment
    time
    createdAt
    updatedAt
  }
}
    `;
export const OnCreateEc2ConfigDocument = `
    subscription OnCreateEc2Config($owner: String) {
  onCreateEc2Config(owner: $owner) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnUpdateEc2ConfigDocument = `
    subscription OnUpdateEc2Config($owner: String) {
  onUpdateEc2Config(owner: $owner) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnDeleteEc2ConfigDocument = `
    subscription OnDeleteEc2Config($owner: String) {
  onDeleteEc2Config(owner: $owner) {
    id
    startDate
    stopDate
    username
    history {
      items {
        id
        ec2ConfigId
        comment
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnCreatePostDocument = `
    subscription OnCreatePost($owner: String) {
  onCreatePost(owner: $owner) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnUpdatePostDocument = `
    subscription OnUpdatePost($owner: String) {
  onUpdatePost(owner: $owner) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnDeletePostDocument = `
    subscription OnDeletePost($owner: String) {
  onDeletePost(owner: $owner) {
    id
    title
    content
    username
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnCreateMessageDocument = `
    subscription OnCreateMessage {
  onCreateMessage {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnUpdateMessageDocument = `
    subscription OnUpdateMessage {
  onUpdateMessage {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
export const OnDeleteMessageDocument = `
    subscription OnDeleteMessage {
  onDeleteMessage {
    id
    authorId
    content
    createdAt
    updatedAt
    owner
  }
}
    `;
