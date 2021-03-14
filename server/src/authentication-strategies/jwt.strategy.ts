import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPublicKey } from 'src/auth/env/jwt-public';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtPublicKey.public,
      algorithms:['RS256'],
      
    });
  }

  /* this data is added to user property of request object */
  /* req.user.email */
  async validate(payload: any) {
    return { email:payload.email,admin:JSON.parse(payload.is_admin) };
  }
}