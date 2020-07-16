import { Module } from '@nestjs/common';
import { AuthsModule } from './auths/auths.module';
import { CoreModule } from './core/core.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
    CoreModule,
    BooksModule,
    UsersModule,
  ],
})
export class AppModule {}
