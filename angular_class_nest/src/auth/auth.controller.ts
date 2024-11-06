import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'; // Import UnauthorizedException
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException(); // Handle unauthorized access
    }
    return this.authService.login(user);
  }
}
