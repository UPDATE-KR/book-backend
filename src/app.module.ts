import { Module } from '@nestjs/common';
import { AuthsModule } from './auths/auths.module';
import { CoreModule } from './core/core.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthsModule, CoreModule, BooksModule]
})
export class AppModule {}
