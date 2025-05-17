import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthSignInDto } from './interface/auth-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn({ email, password }: AuthSignInDto) {
    const user = await this.userService.findOne(email);
    const isValid = user && (await compare(password, user.passwordHash));
    if (!isValid) {
      // Message générique pour ne pas révéler si l'utilisateur existe
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.email, role: user.role };
    const accesToken = await this.jwtService.signAsync(payload);
    return {
      acces_token: accesToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
