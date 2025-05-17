import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './interface/auth-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signIn(@Body() body: AuthSignInDto) {
    return this.authService.signIn(body);
  }
}
