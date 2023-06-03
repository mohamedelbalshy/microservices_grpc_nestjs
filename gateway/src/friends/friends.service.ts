import { Inject, Injectable } from '@nestjs/common';
import {
  AcceptRequestDto,
  SendRequestDto,
  UnfriendDto,
} from './dto/friends.dto';
import { FriendsServiceI } from './friendsService.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FriendsService {
  constructor(@Inject('FRIENDS_PACKAGE') private readonly client: ClientGrpc) {}
  sendRequest(sendRequestDto: SendRequestDto, userId: string) {
    return this.client
      .getService<FriendsServiceI>('FriendsService')
      .sendRequest({ ...sendRequestDto, me: userId });
  }

  acceptRequest(acceptRequestDto: AcceptRequestDto, userId: string) {
    return this.client
      .getService<FriendsServiceI>('FriendsService')
      .acceptRequest({ ...acceptRequestDto, me: userId });
  }
  unfriend(unfriendDto: UnfriendDto, userId: string) {
    return this.client
      .getService<FriendsServiceI>('FriendsService')
      .unfriend({ ...unfriendDto, me: userId });
  }

  findManyFriends(userId: string) {
    return this.client
      .getService<FriendsServiceI>('FriendsService')
      .findManyFriends({ me: userId });
  }
}
