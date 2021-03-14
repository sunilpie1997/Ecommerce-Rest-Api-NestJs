import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/authentication-strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from 'src/authentication-strategies/local.strategy';
import { AuthController } from 'src/auth/auth.controller';
import { GoogleStrategy } from 'src/authentication-strategies/google.strategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtPublicKey } from './env/jwt-public';


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          privateKey: JwtPublicKey.private,
          signOptions: { expiresIn: '24h',
          algorithm:'RS256'
          },
        }),
      ],
      providers: [JwtStrategy, AuthService,LocalStrategy,GoogleStrategy,SessionSerializer],
      controllers: [AuthController],
})
export class AuthModule {}
