export enum RequestStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
}

export type SendRequestInput = {
  userId: string;
  me: string;
};

export type AcceptRequestInput = SendRequestInput;
export type UnfriendInput = SendRequestInput;

export type FindManyFriendsInput = {
  me: string;
};

export type FriendRequest = {
  sender: string;
  receiver: string;
  status: RequestStatus;
};

export type FriendRequestResponse = {
  friendRequest: FriendRequest;
  errors: string[];
  success: boolean;
};

export type FindManyFriendsResponse = {
  friendsIds: string[];
  errors: string[];
  success: boolean;
};

export interface FriendsServiceI {
  sendRequest(sendRequestInput: SendRequestInput): FriendRequestResponse;
  acceptRequest(acceptRequestInput: AcceptRequestInput): FriendRequestResponse;
  unfriend(unfriendInput: UnfriendInput): FriendRequestResponse;
  findManyFriends(
    findManyFriendsInput: FindManyFriendsInput,
  ): FindManyFriendsResponse;
}
