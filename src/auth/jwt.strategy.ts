import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(configService: ConfigService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: configService.get<string>('JWT_SECRET', 'defaultSecretKey'),
    });
  }
  
  async validate(payload: any) {    
    return { id: payload.id, email: payload.email };
  }
}
