import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google-redirect`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails } = profile;
    if (!name || !emails)
      throw new Error('Google profile does not have name or email');
    const stateObject: {
      source: string;
    } = JSON.parse((req.query?.state as string) || '{}');
    const googleUser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      source: stateObject.source,
    };
    done(null, googleUser);
  }
}
