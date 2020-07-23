import { Module } from '@nestjs/common';
import { AuthsModule } from './auths/auths.module';
import { CoreModule } from './core/core.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
    CoreModule,
    BooksModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}
