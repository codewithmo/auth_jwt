import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
import { IUser, IUserInfo } from './interface/user.interface';
import { UserService } from './user.service';
import { JwtDto } from './dto/jwt.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post('register')
  async createUser(@Body() createUserInput: IUser): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Post('login')
  async login(@Body() loginInput: LoginDto): Promise<string> {
    return await this.userService.login(loginInput);
  }

  @Post('verify-jwt')
  async verifyJwt(@Body() jwtDto: JwtDto): Promise<IUserInfo> {
    return await this.userService.verifyJwtAndGetUser(jwtDto.jwt);
  }

}
