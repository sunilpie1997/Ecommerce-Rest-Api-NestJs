import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

// load configuration
config();

@Injectable()

/**
 * https://dev.to/imichaelowolabi/how-to-implement-login-with-google-in-nest-js-2aoa
 */
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      picture: photos[0].value,
      
      /*
      for safety:
      accessToken
      */


    }
    done(null, user);
  }
}