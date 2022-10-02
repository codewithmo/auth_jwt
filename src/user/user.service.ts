import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser, IUserInfo } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { ILogin } from './interface/login.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(user: IUser): Promise<User> {
    const emailExists = await this.findByEmail(user.email);
    if (emailExists) throw new BadRequestException('FORBIDDEN', 'Email exists');
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    return await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async login(login: ILogin): Promise<string> {
    const { email, password } = login;
    const user = await this.findByEmail(email);
    if (!user)
      throw new UnauthorizedException('Unauthorized', 'Invalid Email/Password');
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Unauthorized', 'Invalid Email/Password');
    }
    const payload = { id: user.id, email };

    const jwt = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
    return jwt;
  }

  async verifyJwtAndGetUser(jwt: string): Promise<IUserInfo> {
    try {
      const payload = await this.jwtService.verify(jwt, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.findOne(payload.id);
      if (!user) throw new UnauthorizedException('Invalid user');
      const { password, id, ...userInfo } = user;
      return userInfo;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized', 'Invalid Token');
    }
  }
}
