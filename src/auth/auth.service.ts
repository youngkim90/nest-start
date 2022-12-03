import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: User) {
    const payload = { ...user };

    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }
}
