import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { JwtStrategy } from 'src/core/authentication/jwt.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: config.get<string>('jwt.expiresIn'),
          issuer: config.get<string>('jwt.issuer'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthsService],
})
export class AuthsModule {}
