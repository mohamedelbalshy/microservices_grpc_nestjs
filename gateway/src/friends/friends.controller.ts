import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  AcceptRequestDto,
  SendRequestDto,
  UnfriendDto,
} from './dto/friends.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { JWTPayload } from 'src/users/interfaces/users.interface';

@ApiTags('Friends')
@Controller('friends')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('send-request')
  sendRequest(
    @Body() sendRequestDto: SendRequestDto,
    @User() { userId }: JWTPayload,
  ) {
    return this.friendsService.sendRequest(sendRequestDto, userId);
  }

  @Post('accept-request')
  acceptRequest(
    @Body() acceptRequestDto: AcceptRequestDto,
    @User() { userId }: JWTPayload,
  ) {
    return this.friendsService.acceptRequest(acceptRequestDto, userId);
  }

  @Post('unfriend')
  unfriend(@Body() unfriendDto: UnfriendDto, @User() { userId }: JWTPayload) {
    return this.friendsService.unfriend(unfriendDto, userId);
  }

  @Get()
  findManyFriends(@User() { userId }: JWTPayload) {
    return this.friendsService.findManyFriends(userId);
  }
}
