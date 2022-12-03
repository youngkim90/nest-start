import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    const { name, email, password } = dto;
    this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return this.usersService.login(email, password);
  }

  @Get('/:id')
  getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    const jwtToken = headers.authorization.split('Bearer ')[1];

    this.authService.verify(jwtToken);

    return this.usersService.getUserInfo(userId);
  }
}
